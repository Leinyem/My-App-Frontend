import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { BookContext } from "../contexts/BookContext"; // Import BookContext
import { Link } from "react-router-dom";
import axios from "axios";

export const ProfilePage = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const {
    createdBooks,
    handleDeleteBook,
    handleMakeBookAvailable,
    handleBorrowBook,
    availableBooks,
    borrowedBooks,
  } = useContext(BookContext); // Use createdBooks and handleDeleteBook from BookContext

  console.log(availableBooks);

  // States for books
  const [profileUser, setProfileUser] = useState({ createdBooks: [] });

  // States to control how many books to show
  const [visibleCreatedBooks, setVisibleCreatedBooks] = useState(3);
  const [visibleBorrowedBooks, setVisibleBorrowedBooks] = useState(3);
  const [visibleAvailableBooks, setVisibleAvailableBooks] = useState(3);

  useEffect(() => {
    console.log("here is the current user", currentUser);

    // Fetch user profile data
    axios
      .get(`${import.meta.env.VITE_API_URL}/auth/profile/${currentUser._id}`)
      .then((res) => {
        console.log("profileUser", res.data);
        setProfileUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    /* Fetch created books
    axios
      .get(`${import.meta.env.VITE_API_URL}/book/user-books/${currentUser._id}`)
      .then((res) => {
        console.log("Created books:", res.data.userBooks);
        setCreatedBooks(res.data.userBooks);
      })
      .catch((err) => {
        console.log(err);
      });*/

    // Fetch borrowed books

    /* axios
      .get(`${import.meta.env.VITE_API_URL}/book/borrowed-books/${currentUser._id}`)
      .then((res) => {
        console.log("Borrowed books:", res.data.borrowedBooks);
        setBorrowedBooks(res.data.borrowedBooks);
      })
      .catch((err) => {
        console.log(err);
      });*/

    // Fetch available books

    /*axios
      .get(`${import.meta.env.VITE_API_URL}/book/available-books`)
      .then((res) => {
        console.log("Available books:", res.data.availableBooks);
        //setAvailableBooks(res.data.availableBooks); // Fallback to empty array
      })
      .catch((err) => {
        console.log(err);
        setAvailableBooks([]); // If not, it must be an EMPTY ARRAY
      });*/
  }, []);

  // Make sure i get the USER before rendering the page..!

  if (!profileUser) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="profile-page">
      <h2>{profileUser?.username}'s Profile</h2>

      <section>
        <Link to="/create-a-book">
          <button>Create a Book</button>
        </Link>
      </section>

      <img
        src={profileUser.profileImage || "default-profile-image.png"}
        alt="profile picture"
        className="profile-img"
      />

      {/* CARD 1 created books */}
      <div>
        <h3>Created Books</h3>

        {createdBooks.length === 0 ? (
          <p>You haven't created any books yet.</p>
        ) : (
          <div>
            {createdBooks.slice(0, visibleCreatedBooks).map((book) => (
              <div key={book._id}>
                <Link to={`/book/${book._id}`}>{book.title}</Link>

                <button onClick={() => handleDeleteBook(book._id)}>
                  Delete
                </button>
                {book.available ? null : (
                  <button onClick={() => handleMakeBookAvailable(book._id)}>
                    Make Available
                  </button>
                )}
              </div>
            ))}
            {createdBooks.length > visibleCreatedBooks && (
              <button
                onClick={() => setVisibleCreatedBooks((prev) => prev + 3)}
              >
                Show More
              </button>
            )}
          </div>
        )}
      </div>

      {/* CARD 2 borrowed books */}
      <div>
        <h3>Borrowed Books</h3>
        {borrowedBooks.length === 0 ? (
          <p>You don't have any borrowed books.</p>
        ) : (
          <div>
            {borrowedBooks.slice(0, visibleBorrowedBooks).map((book) => (
              <div key={book._id}>
                <Link to={`/book/${book._id}`}>{book.title}</Link>
              </div>
            ))}
            {borrowedBooks.length > visibleBorrowedBooks && (
              <button
                onClick={() => setVisibleBorrowedBooks((prev) => prev + 3)}
              >
                Show More
              </button>
            )}
          </div>
        )}
      </div>

      {/* CARD 3 available books */}
      <div>
        <h3>Available Books</h3>
        {availableBooks.length === 0 ? (
          <p>No available books at the moment.</p>
        ) : (
          <div>
            {availableBooks.slice(0, visibleAvailableBooks).map((book) => (
              <div key={book._id}>
                <Link to={`/book/${book._id}`}>{book.title}</Link>
                <button onClick={() => handleBorrowBook(book._id)}>
                  Borrow
                </button>
              </div>
            ))}
            {availableBooks.length > visibleAvailableBooks && (
              <button
                onClick={() => setVisibleAvailableBooks((prev) => prev + 3)}
              >
                Show More
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
