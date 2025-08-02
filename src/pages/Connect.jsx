import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// We need the data here too to find the right bird.
// In a larger app, this data would come from a shared file or API.
const roommates = [
  { slug: 'percy-the-pigeon', image: '/images/bird-profile-1.png', title: 'Percy the Pigeon' },
  { slug: 'olivia-the-owl', image: '/images/bird-profile-2.png', title: 'Olivia the Owl' },
  { slug: 'finny-the-finch', image: '/images/bird-profile-3.png', title: 'Finny the Finch' },
];

function Connect() {
  // Get the 'birdSlug' from the URL (e.g., 'percy-the-pigeon')
  const { birdSlug } = useParams();
  const bird = roommates.find((r) => r.slug === birdSlug);

  // State for our form fields
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    contactChirp: '', // A fun name for an email/contact field
    message: '',
  });

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the browser from reloading the page
    
    // This is where you would send the data to your backend!
    console.log('--- Form Submitted ---');
    console.log('Connecting with:', bird.title);
    console.log('Submitted Data:', formData);

    alert(`Your connection request to ${bird.title} has been sent! (Check the console for data)`);
    // Here you might redirect the user or clear the form
  };

  // If for some reason the bird isn't found
  if (!bird) {
    return <div>Bird not found! <Link to="/co-living">Go back</Link></div>;
  }

  return (
    <div className="connect-page-container">
      <Link to="/co-living" className="back-link">← Back to Co-Living</Link>
      
      <div className="connect-layout">
        {/* Left Side: Profile of the bird you're connecting with */}
        <div className="connect-profile">
          <img src={bird.image} alt={bird.title} className="connect-profile-img" />
          <h3>Connect With</h3>
          <h2>{bird.title}</h2>
        </div>

        {/* Right Side: The form */}
        <div className="connect-form">
          <form onSubmit={handleSubmit}>
            <h3>Introduce Yourself</h3>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="species">Your Species</label>
              <input type="text" id="species" name="species" value={formData.species} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="contactChirp">Contact Chirp (Email)</label>
              <input type="email" id="contactChirp" name="contactChirp" value={formData.contactChirp} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">A Little Chirp for {bird.title}</label>
              <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Chirp</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Connect;