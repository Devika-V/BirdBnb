import React from 'react';
import Card from '../components/Card';

const materials = [
  {
    image: '/images/twigs.jpg',
    title: 'Premium Twigs',
    description: 'Locally sourced, sturdy twigs for a robust nest foundation.',
  },
  {
    image: '/images/feathers.jpg',
    title: 'Soft Feathers',
    description: 'The finest, fluffiest feathers for a cozy and warm interior.',
  },
];

function BuildNest() {
  return (
    <div>
      <h2>Build Your Dream Nest</h2>
      <p>Explore materials, designs, and locations to create your perfect home.</p>
      <div className="card-container">
        {materials.map((material, index) => (
          <Card key={index} title={material.title} description={material.description} image={material.image} />
        ))}
      </div>
    </div>
  );
}

export default BuildNest;