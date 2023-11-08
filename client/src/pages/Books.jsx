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
import { saveBook } from '../utils/API';
import { saveBookIds, getBookIds } from '../utils/localStorage';

import { BOOKS } from '../utils/queries';


const Books = () => {


    const { loading, data } = useQuery(BOOKS);
    const books = data?.books || [];

    return (
        <main>
            <div className="flex-row justify-center">
                <div className="col-12 col-md-10 my-3">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <BooksList
                            books={books}
                            title="Here's the current roster of Books..."
                        />
                    )}
                </div>
            </div>
        </main>
    );
};

const [BookIds, setBookIds] = useState(getBookIds());

useEffect(() => {
    return () => saveBookIds(BookIds);
});

try {
    if (!response.ok) {
        throw new Error('something went wrong!');
    }

    const { items } = await response.json();

    const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
    }));

    setSearchedBooks(bookData);
} catch (err) {
    console.error(err);
};

const handleBook = async (bookId) => {

    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
        return false;
    }

    try {
        const response = await saveBook(bookToSave, token);

        if (!response.ok) {
            throw new Error('something went wrong!');
        }

        setBookIds([...BookIds, bookToSave.bookId]);
    } catch (err) {
        console.error(err);
    }
};

return (
    <>
        <div className="text-light bg-dark p-5">
            <Container>
                <h1>Search for Books!</h1>
                <Form onSubmit={handleFormSubmit}>
                    <Row>
                        <Col xs={12} md={8}>
                            <Form.Control
                                name='searchInput'
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                type='text'
                                size='lg'
                                placeholder='Search for a book'
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
                {searchedBooks.length
                    ? `Viewing ${searchedBooks.length} results:`
                    : 'Search for a book to begin'}
            </h2>
            <Row>
                {searchedBooks.map((book) => {
                    return (
                        <Col md="4" key={book.bookId}>
                            <Card border='dark'>
                                {book.image ? (
                                    <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                                ) : null}
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <p className='small'>Authors: {book.authors}</p>
                                    <Card.Text>{book.description}</Card.Text>
                                    {Auth.loggedIn() && (
                                        <Button
                                            disabled={BookIds?.some((BookId) => BookId === book.bookId)}
                                            className='btn-block btn-info'
                                            onClick={() => handleSaveBook(book.bookId)}>
                                            {BookIds?.some((BookId) => BookId === book.bookId)
                                                ? 'This book has already been found!'
                                                : 'Save this Book!'}
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

export default Books;