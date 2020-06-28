import React from 'react';
import Header from '../UI/Header';
import MediaQuery from 'react-responsive';
import Footer from '../UI/Footer';
import ChangeAvatar from './ChangeAvatar';
import ColorPanel from './ColorPanel';
import { Link } from 'react-router-dom';

const UserSettings = () => {
  return (
    <React.Fragment>
      <Header activeItem='settings' />
        <h1 style={{ marginTop: '13vh', marginLeft: '7vw' }}>設定</h1>
        <hr />
        <ChangeAvatar />
        <ColorPanel />
        <Link to="/forget">パスワード再設定</Link>
      <MediaQuery query='(max-width: 670px)'>
        <Footer activeItem='settings' />
      </MediaQuery>
    </React.Fragment>
  );
};

export default UserSettings;
