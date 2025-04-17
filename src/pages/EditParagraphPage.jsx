import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { BookContext } from "../contexts/BookContext";

const EditParagraphPage = () => {
  const { paragraphId } = useParams();
  const [text, setText] = useState("");
  const [bookId, setBookId] = useState(null); // State to store the book ID
  const { currentUser } = useContext(AuthContext);
  const { borrowedBooks } = useContext(BookContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/paragraph/one-paragraph/${paragraphId}`
      )
      .then((res) => {
        setText(res.data.text);
        setBookId(res.data.book._id); // Save book ID from the paragraph
      })
      .catch((err) => console.log("Error fetching paragraph:", err));
  }, [paragraphId]);

  const isEditable =
    bookId && !borrowedBooks.some((book) => book._id === bookId); // Is NOT (book) => book._id === res.data.book._id, theres no "res" OUTSIDE axios!! Editable only if the book is NOT in borrowedBooks

  const handleUpdate = (event) => {
    event.preventDefault();

    if (!isEditable) {
      return alert("This paragraph isn't yours!");
    }

    axios
      .patch(
        `${
          import.meta.env.VITE_API_URL
        }/paragraph/edit-paragraph/${paragraphId}`,
        {
          text,
          userId: currentUser._id,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then(() => {
        navigate(-1); // Go back one page
      })
      .catch((err) => console.log("Error updating paragraph:", err));
  };

  return (
    <div>
      <h3>Edit Paragraph</h3>
      <form onSubmit={handleUpdate}>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditParagraphPage;
