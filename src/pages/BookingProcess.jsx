import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// In a real app, this data would come from a shared source or API call
const nests = [
  { slug: 'lakeside-leaf-villas', image: '/images/nest-1.jpg', title: 'Lakeside Leaf Villas' },
  { slug: 'penthouse-tree-nests', image: '/images/nest-2.jpg', title: 'Penthouse Tree Nests' },
  { slug: 'cozy-branch-bungalows', image: '/images/nest-3.jpg', title: 'Cozy Branch Bungalows' },
];

function BookingProcess() {
  // Get the 'nestSlug' from the URL
  const { nestSlug } = useParams();
  const nest = nests.find((n) => n.slug === nestSlug);

  // State to manage the booking form inputs
  const [bookingDetails, setBookingDetails] = useState({
    birdName: '',
    hatchlings: 1,
    checkInDate: '',
    specialRequests: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle the final submission of the form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('--- Booking Submitted ---');
    console.log('Booking for Nest:', nest.title);
    console.log('Submitted Data:', bookingDetails);

    alert(`Your booking request for ${nest.title} has been sent! We'll send a confirmation chirp soon.`);
  };

  if (!nest) {
    return <div>Nest not found! <Link to="/booking">Return to all nests</Link>.</div>;
  }

  return (
    <div className="booking-process-container">
      <Link to="/booking" className="back-link">← Back to All Nests</Link>
      
      <div className="booking-layout">
        {/* Left Side: Information about the nest being booked */}
        <div className="booking-info">
          <h3>Your Reservation</h3>
          <h2>{nest.title}</h2>
          <img src={nest.image} alt={nest.title} className="booking-info-img" />
          <p>Get ready for an unforgettable stay! Please fill in your details to finalize your booking.</p>
        </div>

        {/* Right Side: The booking form */}
        <div className="booking-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="birdName">Bird Name</label>
              <input type="text" id="birdName" name="birdName" value={bookingDetails.birdName} onChange={handleChange} placeholder="e.g., Captain Bluejay" required />
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
              <textarea id="specialRequests" name="specialRequests" rows="4" value={bookingDetails.specialRequests} onChange={handleChange} placeholder="e.g., Extra twigs for the little ones, morning sun spot..."></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Confirm Booking</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingProcess;