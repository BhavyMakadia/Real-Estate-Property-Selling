import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import ContactUs from './pages/ContactUs'
import Search from './pages/Search';

import Profile from './pages/Profile';
import Footer from './components/footer';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import Showlisting from './pages/Showlisting';

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/search' element={<Search />} />
        <Route element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/createlisting' element={<CreateListing />} />
        <Route path='/showlisting' element={<Showlisting />} />
        
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}