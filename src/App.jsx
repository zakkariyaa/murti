import AuthProvider from './context/AuthProvider';
import PoetProvider from './context/PoetProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Poet from './pages/Poet';
import Poem from './pages/Poem';
import Signup from './pages/Signup';
import Login from './pages/Login';
import User from './pages/User';
import './index.css';

const App = () => {
  return (
    <AuthProvider>
      <PoetProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/poet/:id" element={<Poet />} />
            <Route path="/poet/:id/:title" element={<Poem />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users/:id" element={<User />} />
          </Routes>
        </BrowserRouter>
      </PoetProvider>
    </AuthProvider>
  );
};

export default App;
