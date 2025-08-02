import React,{useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Booking from './pages/Booking';
import CoLiving from './pages/coliving';
import BuildNest from './pages/BuildNest';
import Connect from './pages/Connect';
import BookingProcess from './pages/BookingProcess'; // Import the new booking page

function App() {
   const [roommates, setRoommates] = useState([
    {
      slug: 'percy-the-pigeon',
      image: '/images/bird-profile-1.png',
      title: 'Percy the Pigeon',
      description:
        'Friendly and sociable. Looking for a nest-mate who enjoys city life and doesn’t mind sharing breadcrumbs.',
    },
    {
      slug: 'olivia-the-owl',
      image: '/images/bird-profile-2.png',
      title: 'Olivia the Owl',
      description:
        'Quiet and nocturnal. Seeking a roommate who respects late-night hooting and intellectual conversations.',
    },
    {
      slug: 'finny-the-finch',
      image: '/images/bird-profile-3.png',
      title: 'Finny the Finch',
      description:
        'Chirpy and cheerful. Loves to sing in the morning. Looking for a small, tidy nest to share.',
    },
  ]);

  const addRoommate = (newRoommate) => {
    setRoommates((prev) => [...prev, newRoommate]);
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route element={<Layout />}>
        <Route path="/booking" element={<Booking />} />
        {/* Add the new dynamic route for the booking process */}
        <Route path="/booking/:nestSlug" element={<BookingProcess />} />
        
        <Route path="/co-living" element={<CoLiving />} />
      </Route>
    </Routes>
  );
}

export default App;
<Route path="/build" element={<BuildNest />} />