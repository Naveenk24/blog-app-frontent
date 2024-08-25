import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import BlogItemDetails from './components/BlogItemDetails';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import NotFound from './components/NotFound';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogItemDetails />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
