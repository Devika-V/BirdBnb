import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Booking from './pages/Booking';
import CoLiving from './pages/CoLiving';
import BuildNest from './pages/BuildNest';
import Connect from './pages/Connect';
import BookingProcess from './pages/BookingProcess'; // Import the new booking page

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route element={<Layout />}>
        <Route path="/booking" element={<Booking />} />
        {/* Add the new dynamic route for the booking process */}
        <Route path="/booking/:nestSlug" element={<BookingProcess />} />
        
        <Route path="/co-living" element={<CoLiving />} />
        <Route path="/build" element={<BuildNest />} />
        <Route path="/connect/:birdSlug" element={<Connect />} />
      </Route>
    </Routes>
  );
}

export default App;