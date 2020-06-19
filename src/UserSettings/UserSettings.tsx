import React from 'react';
import Header from '../UI/Header';
import MediaQuery from 'react-responsive';
import Footer from '../UI/Footer';

const UserSettings = () => {
  return (
    <React.Fragment>
      <Header />
      <h1 style={{marginTop: 200}}>user settings</h1>
      <MediaQuery query='(max-width: 600px)'>
        <Footer activeItem='settings' />
      </MediaQuery>
    </React.Fragment>
  );
};

export default UserSettings;
