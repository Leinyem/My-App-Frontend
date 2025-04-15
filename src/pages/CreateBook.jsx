
import { useContext, useState } from "react";
import { BookContext } from "../contexts/BookContext";
import { AuthContext } from "../contexts/AuthContext"; 

export const CreateBookPage = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState(""); 
  const [image, setImage] = useState(null); 
  const { handleCreateBook } = useContext(BookContext);
  const { currentUser } = useContext(AuthContext); 

  return (
    <div>
      <h2> Here goes the SKing's quote</h2>
      <form
        onSubmit={(event) => {
         
          const newBook = {
            title,
            author: currentUser._id, 
            text,
          };
          handleCreateBook(event, newBook, image); 
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
        <label>
          Book Image (optional):
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])} // Get the selected file only
          />
        </label>
        <button>Create</button>
      </form>
    </div>
  );
};

export default CreateBookPage;