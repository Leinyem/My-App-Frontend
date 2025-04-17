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
  } = useContext(BookContext);

  const [profileUser, setProfileUser] = useState({ createdBooks: [] });

  const [visibleCreatedBooks, setVisibleCreatedBooks] = useState(3);
  const [visibleBorrowedBooks, setVisibleBorrowedBooks] = useState(3);
  const [visibleAvailableBooks, setVisibleAvailableBooks] = useState(3);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/auth/profile/${currentUser._id}`)
      .then((res) => {
        setProfileUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!profileUser) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="profile-page">
      <h2>{profileUser?.username}'s Profile</h2>
      <div>
        <img
          src={profileUser.profileImage}
          alt="profile picture"
          className="profile-img"
        />
        <section>
          <Link to="/create-a-book">
            <button>Create a Book</button>
          </Link>
        </section>
      </div>

      <div className="book-list">
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
                  className="show-more"
                  onClick={() => setVisibleCreatedBooks((prev) => prev + 3)}
                >
                  Show More
                </button>
              )}
            </div>
          )}
        </div>

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
                  className="show-more"
                  onClick={() => setVisibleBorrowedBooks((prev) => prev + 3)}
                >
                  Show More
                </button>
              )}
            </div>
          )}
        </div>

        <div>
          <h3>The Archive</h3>
          {availableBooks.length === 0 ? (
            <p>No available books at the moment.</p>
          ) : (
            <>
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
                  className="show-more"
                  onClick={() => setVisibleAvailableBooks((prev) => prev + 3)}
                >
                  Show More
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
