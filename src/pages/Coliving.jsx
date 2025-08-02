import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import Card from '../components/Card';

// Add a 'slug' to each object. This is a unique ID for the URL.
const roommates = [
  {
    slug: 'percy-the-pigeon',
    image: '/images/bird-profile-1.png',
    title: 'Percy the Pigeon',
    description: 'Friendly and sociable. Looking for a nest-mate who enjoys city life and doesn’t mind sharing breadcrumbs.',
  },
  {
    slug: 'olivia-the-owl',
    image: '/images/bird-profile-2.png',
    title: 'Olivia the Owl',
    description: 'Quiet and nocturnal. Seeking a roommate who respects late-night hooting and intellectual conversations.',
  },
  {
    slug: 'finny-the-finch',
    image: '/images/bird-profile-3.png',
    title: 'Finny the Finch',
    description: 'Chirpy and cheerful. Loves to sing in the morning. Looking for a small, tidy nest to share.',
  },
];

function CoLiving() {
  return (
    <div>
      <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>
        Find Your New Flock
      </h2>

      <div className="card-container">
        {roommates.map((bird) => (
          <Card
            key={bird.slug}
            image={bird.image}
            title={bird.title}
            description={bird.description}
          >
            {/* The button is now wrapped in a Link that goes to the dynamic route */}
            <Link to={`/connect/${bird.slug}`}>
              <button className="btn btn-connect">Connect</button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CoLiving;
