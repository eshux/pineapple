import React, { FC } from 'react';
import Hero from '../components/Hero/Hero';
import Subsscription from '../components/Subscription/Subscription';

const Home: FC = () => {
  return (
    <section className="main-bg">
      <Subsscription />
      <Hero />
    </section>
  );
};

export default Home;
