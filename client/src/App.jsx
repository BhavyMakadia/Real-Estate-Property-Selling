import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Search from './pages/Search';

import Profile from './pages/Profile';
//import Footer from './components/Footer';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import Showlisting from './pages/Showlisting';
import EditList from './pages/EditList';
import Listing from './pages/Listing';
import AdminCreateListing from './components/AdminCreateListing';

import React, { useState, useEffect } from 'react';
import AdminLayout from './components/AdminLayout';
import AdminHome from './components/AdminHome';
import AdminUser from './components/AdminUsers';
import AdminEditlist from './components/AdminEditlist';
import AdminShowlisting from './components/AdminShowlisting';

import Adminupdatelist from './components/Adminupdatelist';
import AdminReview from './components/AdminReview';

import AdminProfile from './components/AdminProfile';

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const [isAdminRoute, setIsAdminRoute] = useState(location.pathname.startsWith('/admin'));

  useEffect(() => {
    setIsAdminRoute(location.pathname.startsWith('/admin'));
  }, [location.pathname]);

  return (
    <>
      {!isAdminRoute && <Header />}
      {isAdminRoute && <AdminLayout />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/search' element={<Search />} />
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/createlisting' element={<CreateListing />} />
          <Route path='/showlisting' element={<Showlisting />} />
          <Route path='/editlisting/:listingId' element={<EditList />} />
        </Route>
        <Route path='/admin' element={<AdminHome />} />
        <Route element={<PrivateRoute />}>
          <Route path='/adminuser' element={<AdminUser />} />
          <Route path='/adminreview' element={<AdminReview />} />
          <Route path='/admincreatelisting' element={<AdminCreateListing />} />
          <Route path='/adminshowlisting' element={<AdminShowlisting />} />
          <Route path='/adminedit' element={<AdminEditlist />} />
          <Route path='/adminprofile' element={<AdminProfile />} />
          <Route path='/adminupdatelist/:listingId' element={<Adminupdatelist />} />
          <Route path='/adminlisting/:listingId' element={<Listing />} />
        </Route>
      </Routes>
    
    </>
  );
}
