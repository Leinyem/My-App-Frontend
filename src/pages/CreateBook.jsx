import { useContext, useState } from "react";
import { BookContext } from "../contexts/BookContext";
import { AuthContext } from "../contexts/AuthContext";

export const CreateBookPage = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { handleCreateBook } = useContext(BookContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <h2 className="quote-text">
        "Your intuition knows what to write, so get out of the way." - Ray
        Bradbury
      </h2>{" "}
      <form
        onSubmit={(event) => {
          const newBook = {
            title,
            author: currentUser._id,
            text,
          };
          handleCreateBook(event, newBook);
        }}
      >
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Initial Paragraph:
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </label>
        <button>Create</button>
      </form>
    </div>
  );
};

export default CreateBookPage;
