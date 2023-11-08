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
import { saveToys } from '../utils/API';
import { saveToysIds, getToysIds } from '../utils/localStorage';

import { FOODS } from '../utils/queries';


const Toyss = () => {


    const { loading, data } = useQuery(FOODS);
    const toys = data?.toys || [];

    return (
        <main>
            <div className="flex-row justify-center">
                <div className="col-12 col-md-10 my-3">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <ToyssList
                            toys={toys}
                            title="Here's the current roster of Toyss..."
                        />
                    )}
                </div>
            </div>
        </main>
    );
};

const [ToysIds, setToysIds] = useState(getToysIds());

useEffect(() => {
    return () => saveToysIds(ToysIds);
});

try {
    if (!response.ok) {
        throw new Error('something went wrong!');
    }

    const { items } = await response.json();

    const toyData = items.map((toy) => ({
        toyId: toy.id,
        authors: toy.volumeInfo.authors || ['No author to display'],
        title: toy.volumeInfo.title,
        description: toy.volumeInfo.description,
        image: toy.volumeInfo.imageLinks?.thumbnail || '',
    }));

    setSearchedToyss(toyData);
} catch (err) {
    console.error(err);
};

const handleToys = async (toyId) => {

    const toyToSave = searchedToyss.find((toy) => toy.toyId === toyId);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
        return false;
    }

    try {
        const response = await saveToys(toyToSave, token);

        if (!response.ok) {
            throw new Error('something went wrong!');
        }

        setToysIds([...ToysIds, toyToSave.toyId]);
    } catch (err) {
        console.error(err);
    }
};

return (
    <>
        <div className="text-light bg-dark p-5">
            <Container>
                <h1>Search for Toyss!</h1>
                <Form onSubmit={handleFormSubmit}>
                    <Row>
                        <Col xs={12} md={8}>
                            <Form.Control
                                name='searchInput'
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                type='text'
                                size='lg'
                                placeholder='Search for a toy'
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
                {searchedToyss.length
                    ? `Viewing ${searchedToyss.length} results:`
                    : 'Search for a toy to begin'}
            </h2>
            <Row>
                {searchedToyss.map((toy) => {
                    return (
                        <Col md="4" key={toy.toyId}>
                            <Card border='dark'>
                                {toy.image ? (
                                    <Card.Img src={toy.image} alt={`The cover for ${toy.title}`} variant='top' />
                                ) : null}
                                <Card.Body>
                                    <Card.Title>{toy.title}</Card.Title>
                                    <p className='small'>Authors: {toy.authors}</p>
                                    <Card.Text>{toy.description}</Card.Text>
                                    {Auth.loggedIn() && (
                                        <Button
                                            disabled={ToysIds?.some((ToysId) => ToysId === toy.toyId)}
                                            className='btn-block btn-info'
                                            onClick={() => handleSaveToys(toy.toyId)}>
                                            {ToysIds?.some((ToysId) => ToysId === toy.toyId)
                                                ? 'This toy has already been found!'
                                                : 'Save this Toys!'}
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

export default Toyss;