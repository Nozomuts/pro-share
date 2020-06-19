import React from 'react';
import Header from '../UI/Header';
import MediaQuery from 'react-responsive';
import Footer from '../UI/Footer';

const Ranking = () => {
  return (
    <React.Fragment>
      <Header activeItem='ranking'/>
      <h1 style={{marginTop: 200}}>ranking</h1>
      <MediaQuery query='(max-width: 670px)'>
        <Footer activeItem='ranking' />
      </MediaQuery>
    </React.Fragment>
  );
};

export default Ranking;
