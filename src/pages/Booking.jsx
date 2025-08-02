import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import Card from '../components/Card';

// Add a 'slug' to each nest object for unique URLs
const nests = [
  {
    slug: 'lakeside-leaf-villas',
    image: '/images/nest-1.jpg',
    title: 'Lakeside Leaf Villas',
    description: 'A serene, waterproof villa with a stunning lakeside view. Perfect for aquatic birds.',
  },
  {
    slug: 'penthouse-tree-nests',
    image: '/images/nest-2.jpg',
    title: 'Penthouse Tree Nests',
    description: 'High-rise luxury living with panoramic views of the park. Exclusive access for high-flyers.',
  },
  {
    slug: 'cozy-branch-bungalows',
    image: '/images/nest-3.jpg',
    title: 'Cozy Branch Bungalows',
    description: 'A rustic, charming bungalow nestled in a sturdy oak. Ideal for small families.',
  },
];

function Booking() {
  return (
    <div>
      <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>
        Book a Premium Nest
      </h2>

      <div className="card-container">
        {nests.map((nest) => (
          <Card
            key={nest.slug}
            image={nest.image}
            title={nest.title}
            description={nest.description}
          >
            {/* Wrap the button in a Link to the specific booking page */}
            <Link to={`/booking/${nest.slug}`}>
              <button className="btn btn-book">Book Now</button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Booking;