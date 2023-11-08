import { useState, useEffect } from 'react';
import {
    Container,
    Col,
    Form,
    Button,
    Card,
    Row
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { saveHouseSupplies } from '../utils/API';
import { saveHouseSupplieIds, getHouseSupplieIds } from '../utils/localStorage';

import { HOUSESUPPLIES } from '../utils/queries';


const HouseSupplies = () => {


    const { loading, data } = useQuery(HOUSESUPPLIES);
    const housesupplies = data?.housesupplies || [];

    return (
        <main>
            <div className="flex-row justify-center">
                <div className="col-12 col-md-10 my-3">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <HouseSuppliesList
                            housesupplies={housesupplies}
                            title="Here's the current roster of HouseSupplies..."
                        />
                    )}
                </div>
            </div>
        </main>
    );
};

const [HouseSupplieIds, setHouseSupplieIds] = useState(getHouseSupplieIds());

useEffect(() => {
    return () => saveHouseSupplieIds(HouseSupplieIds);
});

try {
    if (!response.ok) {
        throw new Error('something went wrong!');
    }

    const { items } = await response.json();

    const housesupplieData = items.map((housesupplie) => ({
        housesupplieId: housesupplie.id,
        authors: housesupplie.volumeInfo.authors || ['No author to display'],
        title: housesupplie.volumeInfo.title,
        description: housesupplie.volumeInfo.description,
        image: housesupplie.volumeInfo.imageLinks?.thumbnail || '',
    }));

    setSearchedHouseSupplies(housesupplieData);
} catch (err) {
    console.error(err);
};

const handleHouseSupplie = async (housesupplieId) => {

    const housesupplieToSave = searchedHouseSupplies.find((housesupplie) => housesupplie.housesupplieId === housesupplieId);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
        return false;
    }

    try {
        const response = await saveHouseSupplies(housesupplieToSave, token);

        if (!response.ok) {
            throw new Error('something went wrong!');
        }

        setHouseSupplieIds([...HouseSupplieIds, housesupplieToSave.housesupplieId]);
    } catch (err) {
        console.error(err);
    }
};

return (
    <>
        <div className="text-light bg-dark p-5">
            <Container>
                <h1>Search for HouseSupplies!</h1>
                <Form onSubmit={handleFormSubmit}>
                    <Row>
                        <Col xs={12} md={8}>
                            <Form.Control
                                name='searchInput'
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                type='text'
                                size='lg'
                                placeholder='Search for a housesupplie'
                            />
                        </Col>
                        <Col xs={12} md={4}>
                            <Button type='submit' variant='success' size='lg'>
                                Submit Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>

        <Container>
            <h2 className='pt-5'>
                {searchedHouseSupplies.length
                    ? `Viewing ${searchedHouseSupplies.length} results:`
                    : 'Search for a housesupplie to begin'}
            </h2>
            <Row>
                {searchedHouseSupplies.map((housesupplie) => {
                    return (
                        <Col md="4" key={housesupplie.housesupplieId}>
                            <Card border='dark'>
                                {housesupplie.image ? (
                                    <Card.Img src={housesupplie.image} alt={`The cover for ${housesupplie.title}`} variant='top' />
                                ) : null}
                                <Card.Body>
                                    <Card.Title>{housesupplie.title}</Card.Title>
                                    <p className='small'>Authors: {housesupplie.authors}</p>
                                    <Card.Text>{housesupplie.description}</Card.Text>
                                    {Auth.loggedIn() && (
                                        <Button
                                            disabled={HouseSupplieIds?.some((HouseSupplieId) => HouseSupplieId === housesupplie.housesupplieId)}
                                            className='btn-block btn-info'
                                            onClick={() => handleSaveHouseSupplie(housesupplie.housesupplieId)}>
                                            {HouseSupplieIds?.some((HouseSupplieId) => HouseSupplieId === housesupplie.housesupplieId)
                                                ? 'This housesupplie has already been found!'
                                                : 'Save this HouseSupplie!'}
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    </>
);

export default HouseSupplies;