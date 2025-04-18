import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import CreateBook from "./pages/CreateBook";
import UpdateBook from "./pages/UpdateBook";
import Book from "./pages/Book";
import ReadBook from "./pages/ReadBook";
import { ProtectedRoute } from "./components/ProtectedRoute";
import EditParagraphPage from "./pages/EditParagraphPage";
import { LoggedInProtectedRoute } from "./components/LoggedInProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <LoggedInProtectedRoute>
              <SignUpPage />
            </LoggedInProtectedRoute>
          }
        />
        <Route
          path="/logIn"
          element={
            <LoggedInProtectedRoute>
              <LogInPage />
            </LoggedInProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route path="/create-a-book" element={<CreateBook />} />
        <Route path="/update-book/:bookId" element={<UpdateBook />} />
        <Route path="/book/:bookId" element={<Book />} />
        <Route path="/read-book/:bookId" element={<ReadBook />} />
        <Route
          path="/edit-paragraph/:paragraphId"
          element={<EditParagraphPage />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
