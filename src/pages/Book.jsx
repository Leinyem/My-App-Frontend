import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Book = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [likedParagraphs, setLikedParagraphs] = useState({});
  const { currentUser } = useContext(AuthContext);

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
    if (likedParagraphs[paragraphId]) return;

    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/paragraph/like-paragraph/${paragraphId}/${currentUser._id}`
      )
      .then((res) => {
        console.log("You liked this paragraph:", res.data);

        setLikedParagraphs((prevState) => ({
          ...prevState,
          [paragraphId]: true,
        }));

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
      .delete(
        `${
          import.meta.env.VITE_API_URL
        }/paragraph/delete-paragraph/${bookId}/${paragraphId}`
      )
      .then(() => {
        console.log("Paragraph deleted");
        setBook((prevBook) => ({
          ...prevBook,
          paragraph: prevBook.paragraph.filter(
            (para) => para._id !== paragraphId
          ),
        }));
      })
      .catch((err) => {
        console.log("Error deleting paragraph:", err);
      });
  }

  function handleEditParagraph(paragraphId) {
    navigate(`/edit-paragraph/${paragraphId}`);
  }

  if (!book) {
    return <p className="loading-text">Loading book details...</p>;
  }

  return (
    <div className="book-page">
      {book.paragraph.map((para) => (
        <div key={para._id} className="paragraph-item">
          <p>{para.text}</p>
          <button
            onClick={() => handleLikeParagraph(para._id)}
            disabled={likedParagraphs[para._id]}
          >
            {likedParagraphs[para._id] ? "Liked" : "Like"}
          </button>

          {para.user === currentUser?._id && (
            <button onClick={() => handleEditParagraph(para._id)}>Edit</button>
          )}

          {para.author?._id === currentUser?._id && (
            <button onClick={() => handleDeleteParagraph(para._id)}>
              Delete
            </button>
          )}
        </div>
      ))}
      <Link to={`/update-book/${bookId}`}>
        <button>Add</button>
      </Link>
      <Link to={`/read-book/${bookId}`}>
        <button>Read</button>
      </Link>
    </div>
  );
};

export default Book;
