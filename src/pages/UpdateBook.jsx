import React, { useContext, useState } from "react";
import { BookContext } from "../contexts/BookContext";
import { useParams } from "react-router-dom";

const UpdateBook = () => {
  const [text, setText] = useState("");
  const { bookId } = useParams();
  const { updateOneBook } = useContext(BookContext);
  return (
    <div>
      <h2>Add a paragraph</h2>
      <form
        onSubmit={(event) => {
          updateOneBook(event, bookId, text);
        }}
      >
        <label>
          Add Paragraph:
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

export default UpdateBook;
