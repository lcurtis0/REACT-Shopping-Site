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
import { saveElectronic } from '../utils/API';
import { saveElectronicIds, getElectronicIds } from '../utils/localStorage';

import { ELECTRONICS } from '../utils/queries';


const Electronics = () => {


    const { loading, data } = useQuery(ELECTRONICS);
    const electronic = data?.electronics || [];

    return (
        <main>
            <div className="flex-row justify-center">
                <div className="col-12 col-md-10 my-3">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <ElectronicsList
                            electronics={electronics}
                            title="Here's the current roster of Electronics..."
                        />
                    )}
                </div>
            </div>
        </main>
    );
};

const [ElectronicIds, setElectronicIds] = useState(getElectronicIds());

useEffect(() => {
    return () => saveElectronicIds(ElectronicIds);
});

try {
    if (!response.ok) {
        throw new Error('something went wrong!');
    }

    const { items } = await response.json();

    const electronicData = items.map((electronic) => ({
        electronicId: electronic.id,
        authors: electronic.volumeInfo.authors || ['No author to display'],
        title: electronic.volumeInfo.title,
        description: electronic.volumeInfo.description,
        image: electronic.volumeInfo.imageLinks?.thumbnail || '',
    }));

    setSearchedElectronics(electronicData);
} catch (err) {
    console.error(err);
};

const handleElectronic = async (electronicId) => {

    const electronicToSave = searchedElectronics.find((electronic) => electronic.electronicId === electronicId);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
        return false;
    }

    try {
        const response = await saveElectronic(electronicToSave, token);

        if (!response.ok) {
            throw new Error('something went wrong!');
        }

        setElectronicIds([...ElectronicIds, electronicToSave.electronicId]);
    } catch (err) {
        console.error(err);
    }
};

return (
    <>
        <div className="text-light bg-dark p-5">
            <Container>
                <h1>Search for Electronics!</h1>
                <Form onSubmit={handleFormSubmit}>
                    <Row>
                        <Col xs={12} md={8}>
                            <Form.Control
                                name='searchInput'
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                type='text'
                                size='lg'
                                placeholder='Search for a electronic'
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
                {searchedElectronics.length
                    ? `Viewing ${searchedElectronics.length} results:`
                    : 'Search for a electronic to begin'}
            </h2>
            <Row>
                {searchedElectronics.map((electronic) => {
                    return (
                        <Col md="4" key={electronic.electronicId}>
                            <Card border='dark'>
                                {electronic.image ? (
                                    <Card.Img src={electronic.image} alt={`The cover for ${electronic.title}`} variant='top' />
                                ) : null}
                                <Card.Body>
                                    <Card.Title>{electronic.title}</Card.Title>
                                    <p className='small'>Authors: {electronic.authors}</p>
                                    <Card.Text>{electronic.description}</Card.Text>
                                    {Auth.loggedIn() && (
                                        <Button
                                            disabled={ElectronicIds?.some((ElectronicId) => ElectronicId === electronic.electronicId)}
                                            className='btn-block btn-info'
                                            onClick={() => handleSaveElectronic(electronic.electronicId)}>
                                            {ElectronicIds?.some((ElectronicId) => ElectronicId === electronic.electronicId)
                                                ? 'This electronic has already been found!'
                                                : 'Save this Electronic!'}
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

export default Electronics;