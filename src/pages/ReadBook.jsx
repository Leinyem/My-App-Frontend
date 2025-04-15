import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ReadBook = () => {
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

  if (!book) {
    return <p>Loading book...</p>;
  }

  return (
    <div className="read-book-page">
      <h3>{book.title}</h3>
      <div>
        {book.paragraph.map((para) => (
          <p key={para._id}>{para.text}</p>
        ))}
      </div>
    </div>
  );
};

export default ReadBook;