import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar';
import ProfilePage from './pages/ProfilePage';
import CreateBook from './pages/CreateBook';
import UpdateBook from './pages/UpdateBook'; 
import Book from './pages/Book';
import ReadBook from './pages/ReadBook';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/logIn" element={<LogInPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={
          
          <ProtectedRoute>
          <ProfilePage />
          </ProtectedRoute>} />

          
        <Route path="/create-a-book" element={<CreateBook />} />
        <Route path="/update-book/:bookId" element={<UpdateBook />} />
        <Route path="/book/:bookId" element={<Book />} />
        <Route path="/read-book/:bookId" element={<ReadBook />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;