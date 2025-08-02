// src/pages/CoLiving.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

function CoLiving({ roommates }) {
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
