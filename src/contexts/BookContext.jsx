import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const BookContext = createContext();

const BookContextWrapper = ({ children }) => {
  const [createdBooks, setCreatedBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [availableBooks, setAvailableBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  // Changed from allAvailableBooks to availableBooks
  const nav = useNavigate();

  // VERIFY THE TOKEN AGAIN WHEN RELOAD!!
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      getAllBooks();

      setBorrowedBooks(currentUser.borrowedBooks);
      setCreatedBooks(currentUser.createdBooks);
    }
  }, [currentUser]);

  // GET all books from the API

  const getAllBooks = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/book/books`)
      .then((res) => {
        console.log("Books achieved!:", res.data.books);

        setAllBooks(res.data.books);
        setAvailableBooks(res.data.books.filter((book) => book.available));
      })
      .catch((err) => {
        console.error("Books lost somewhere uncertain:", err);
      });
  };

  const updateOneBook = (event, bookId, text) => {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}/paragraph/add-paragraph`, {
        text,
        bookId,
        user: currentUser._id,
      })
      .then((res) => {
        console.log("Books achieved!:", res.data);
        setCurrentUser(res.data.updatedUser);
        const updatedBooks = allBooks.map((book) => {
          if (book._id === bookId) {
            return res.data.book;
          } else {
            return book;
          }
        });
        setAllBooks(updatedBooks);
        nav(`/book/${bookId}`); // Redirect
      })
      .catch((err) => {
        console.error("Books lost somewhere uncertain:", err);
      });
  };

  // CREATE a new book

  const handleCreateBook = async (event, newBook) => {
    event.preventDefault();
    console.log("current user is:", currentUser); // we get the data of the books in the response. Las 3 listas.

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/book/create-a-book`,
        newBook
      );
      console.log("Book created:", data);
      console.log([data.book, ...createdBooks]);

      setCreatedBooks([data.book, ...createdBooks]); // Add JUST the data
      nav("/profile");
    } catch (error) {
      console.error("Error creating the book:", error);
    }
  };

  // MAKE a book available (move it from "created" to "available")

  const handleMakeBookAvailable = async (bookId) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/book/release/${bookId}`
      );
      console.log("Book is now available:", data);

      setAvailableBooks([data, ...availableBooks]); // Add to available here
      setCreatedBooks((prevBooks) =>
        prevBooks.map((book) => {
          if (book._id === bookId) {
            return data;
          } else {
            return book;
          }
        })
      ); // Remove from created
    } catch (error) {
      console.error("Error making the book available:", error);
    }
  };

  // BORROW a book (move it from "available" to "borrowed")

  const handleBorrowBook = async (bookId) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/book/borrow/${bookId}`,
        { userId: currentUser._id }
      );
      console.log("Book borrowed:", data);
      setBorrowedBooks([data, ...borrowedBooks]); // Add the book to the borrowed list
      setAvailableBooks((prevBooks) =>
        prevBooks.filter((book) => book._id !== bookId)
      ); // Remove the book from the available list
    } catch (error) {
      console.error("Error borrowing the book:", error);
    }
  };

  // RELEASE a book (from "borrowed" to "available")
  const handleReleaseBook = async (bookId) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/book/release/${bookId}`
      );
      console.log("Book released:", data);
      setAvailableBooks([data, ...availableBooks]); // Add the book to the available list
      setBorrowedBooks((prevBooks) =>
        prevBooks.filter((book) => book.id !== bookId)
      ); // Remove the book from the borrowed list
    } catch (error) {
      console.error("Error releasing the book:", error);
    }
  };

  // Function to delete a book created by the user
  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/book/delete-book/${bookId}`
      );
      console.log("Book deleted");
      setCreatedBooks((prevBooks) =>
        prevBooks.filter((book) => book._id !== bookId)
      ); // Remove the book from the created list
    } catch (error) {
      console.error("Error deleting the book:", error);
    }
  };

  // Provide the state and functions to child components
  return (
    <BookContext.Provider
      value={{
        createdBooks,
        borrowedBooks,
        availableBooks, // Changed from allAvailableBooks to availableBooks
        handleCreateBook,
        handleBorrowBook,
        handleReleaseBook,
        handleDeleteBook,
        handleMakeBookAvailable,
        updateOneBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export { BookContextWrapper };
