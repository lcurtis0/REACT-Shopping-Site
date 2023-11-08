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
import { saveFood } from '../utils/API';
import { saveFoodIds, getFoodIds } from '../utils/localStorage';

import { FOODS } from '../utils/queries';


const Foods = () => {


    const { loading, data } = useQuery(FOODS);
    const foods = data?.foods || [];

    return (
        <main>
            <div className="flex-row justify-center">
                <div className="col-12 col-md-10 my-3">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <FoodsList
                            foods={foods}
                            title="Here's the current roster of Foods..."
                        />
                    )}
                </div>
            </div>
        </main>
    );
};

const [FoodIds, setFoodIds] = useState(getFoodIds());

useEffect(() => {
    return () => saveFoodIds(FoodIds);
});

try {
    if (!response.ok) {
        throw new Error('something went wrong!');
    }

    const { items } = await response.json();

    const foodData = items.map((food) => ({
        foodId: food.id,
        authors: food.volumeInfo.authors || ['No author to display'],
        title: food.volumeInfo.title,
        description: food.volumeInfo.description,
        image: food.volumeInfo.imageLinks?.thumbnail || '',
    }));

    setSearchedFoods(foodData);
} catch (err) {
    console.error(err);
};

const handleFood = async (foodId) => {

    const foodToSave = searchedFoods.find((food) => food.foodId === foodId);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
        return false;
    }

    try {
        const response = await saveFood(foodToSave, token);

        if (!response.ok) {
            throw new Error('something went wrong!');
        }

        setFoodIds([...FoodIds, foodToSave.foodId]);
    } catch (err) {
        console.error(err);
    }
};

return (
    <>
        <div className="text-light bg-dark p-5">
            <Container>
                <h1>Search for Foods!</h1>
                <Form onSubmit={handleFormSubmit}>
                    <Row>
                        <Col xs={12} md={8}>
                            <Form.Control
                                name='searchInput'
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                type='text'
                                size='lg'
                                placeholder='Search for a food'
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
                {searchedFoods.length
                    ? `Viewing ${searchedFoods.length} results:`
                    : 'Search for a food to begin'}
            </h2>
            <Row>
                {searchedFoods.map((food) => {
                    return (
                        <Col md="4" key={food.foodId}>
                            <Card border='dark'>
                                {food.image ? (
                                    <Card.Img src={food.image} alt={`The cover for ${food.title}`} variant='top' />
                                ) : null}
                                <Card.Body>
                                    <Card.Title>{food.title}</Card.Title>
                                    <p className='small'>Authors: {food.authors}</p>
                                    <Card.Text>{food.description}</Card.Text>
                                    {Auth.loggedIn() && (
                                        <Button
                                            disabled={FoodIds?.some((FoodId) => FoodId === food.foodId)}
                                            className='btn-block btn-info'
                                            onClick={() => handleSaveFood(food.foodId)}>
                                            {FoodIds?.some((FoodId) => FoodId === food.foodId)
                                                ? 'This food has already been found!'
                                                : 'Save this Food!'}
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

export default Foods;