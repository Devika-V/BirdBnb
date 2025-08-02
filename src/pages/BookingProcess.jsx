// src/pages/BookingProcess.tsx
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const nests = [
  { slug: 'lakeside-leaf-villas', image: '/images/nest-1.jpg', title: 'Lakeside Leaf Villas' },
  { slug: 'penthouse-tree-nests', image: '/images/nest-2.jpg', title: 'Penthouse Tree Nests' },
  { slug: 'cozy-branch-bungalows', image: '/images/nest-3.jpg', title: 'Cozy Branch Bungalows' },
];

function BookingProcess({ addRoommate }) {
  const { nestSlug } = useParams();
  const nest = nests.find((n) => n.slug === nestSlug);
  const navigate = useNavigate();

  const [bookingDetails, setBookingDetails] = useState({
    birdName: '',
    hatchlings: 1,
    checkInDate: '',
    specialRequests: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Booking for:', nest.title);
    console.log('Submitted data:', bookingDetails);

    // Create new roommate entry
    const newRoommate = {
      slug: bookingDetails.birdName.toLowerCase().replace(/\s+/g, '-'),
      image: '/images/default-bird.png', // Or generate a fun avatar later
      title: bookingDetails.birdName,
      description: `Booked ${nest.title}. ${bookingDetails.hatchlings} hatchling(s). Check-in on ${bookingDetails.checkInDate}. ${bookingDetails.specialRequests}`,
    };

    addRoommate(newRoommate);

    alert(`Your booking request for ${nest.title} has been sent!`);

    navigate('/coliving'); // Redirect to CoLiving after booking
  };

  if (!nest) {
    return (
      <div>
        Nest not found! <Link to="/booking">Return to all nests</Link>.
      </div>
    );
  }

  return (
    <div className="booking-process-container">
      <Link to="/booking" className="back-link">← Back to All Nests</Link>
      <div className="booking-layout">
        <div className="booking-info">
          <h3>Your Reservation</h3>
          <h2>{nest.title}</h2>
          <img src={nest.image} alt={nest.title} className="booking-info-img" />
          <p>Get ready for an unforgettable stay! Please fill in your details to finalize your booking.</p>
        </div>

        <div className="booking-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="birdName">Bird Name</label>
              <input type="text" id="birdName" name="birdName" value={bookingDetails.birdName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="hatchlings">Number of Hatchlings</label>
              <input type="number" id="hatchlings" name="hatchlings" min="1" max="10" value={bookingDetails.hatchlings} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="checkInDate">Preferred Check-in Date</label>
              <input type="date" id="checkInDate" name="checkInDate" value={bookingDetails.checkInDate} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="specialRequests">Special Requests</label>
              <textarea id="specialRequests" name="specialRequests" rows="4" value={bookingDetails.specialRequests} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Confirm Booking</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingProcess;
