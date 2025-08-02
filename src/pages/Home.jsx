
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const features = [
  {
    path: '/booking',
    image: 'src/assets/feature-booking.jpg',
    title: 'Book a Premium Nest',
    description: 'Browse and book premium nests, from Lakeside Leaf Villas to Penthouse Tree Nests.',
  },
  {
    path: '/co-living',
    image: 'src/assets/feature-coliving.jpg',
    title: 'Find a Nest-Mate',
    description: 'Looking for a roommate? Search for compatible birds to share a nest and cut down on chirps.',
  },
  {
    path: '/build',
    image: 'src/assets/feature-build.jpg',
    title: 'Build Your Dream Nest',
    description: 'A DIY workshop with tools to find materials, designs, and locations for your perfect home.',
  },
];

function Home() {
  return (
    <div className="home-page">
      <header className="home-header">
        <img src="src/assets/bird-logo-cute.jpg" alt="BirdBnB Cute Logo" className="hero-logo" />
        <h1 className="title">BirdBnB</h1>
        <p className="tagline">The end of the flight. The start of home.</p>
      </header>

      <main className="home-features">
        <div className="card-container">
          {features.map((feature) => (
            <Link to={feature.path} key={feature.path} className="feature-link">
              <Card
                title={feature.title}
                description={feature.description}
                image={feature.image}
              />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;