import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Book = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/book/one-book/${bookId}`)
      .then((res) => {
        console.log("Book details fetched:", res.data);
        setBook(res.data);
      }) 
      .catch((err) => {
        console.log("Error fetching book details:", err);
      });
  }, [bookId]);

  function handleLikeParagraph(paragraphId) {
    axios
      .get(`${import.meta.env.VITE_API_URL}/paragraph/like-paragraph/${paragraphId}/${book.author._id}`)
      .then((res) => {
        console.log("You liked this paragraph:", res.data);
        setBook((prevBook) => ({
          ...prevBook,

          paragraph: prevBook.paragraph.map((para) =>
            
            para._id === paragraphId ? res.data.paragraph : para
          ),
        }));
      })
      .catch((err) => {
        console.log("Error liking this paragraph:", err);
      });
  }

  function handleDeleteParagraph(paragraphId) {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/paragraph/delete-paragraph/${bookId}/${paragraphId}`)
      .then(() => {
        console.log("Paragraph deleted");
        setBook((prevBook) => ({
          ...prevBook,
          paragraph: prevBook.paragraph.filter((para) => para._id !== paragraphId),
        }));
      })
      .catch((err) => {
        console.log("Error deleting paragraph:", err);
      });
  }

  if (!book) {
    return <p>Loading book details...</p>;
  }

  return (
    <div className="book-page">
      <h3>{book.title}</h3>
      <p>
        <strong>Author:</strong> {book.author.username}
      </p>
      <p>
        <strong>Created on:</strong> {new Date(book.createdAt).toLocaleDateString()}
      </p>
      <Link to={`/read-book/${bookId}`}>
        <button>Read</button>
      </Link>
      <h4>Paragraphs</h4>
      <div>
        {book.paragraph.map((para) => (
          <div key={para._id}>
            <p>{para.text}</p>
            <button onClick={() => handleLikeParagraph(para._id)}>Like ({para.likes.length})</button>
            <button onClick={() => handleDeleteParagraph(para._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Book;