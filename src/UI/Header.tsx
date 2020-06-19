import React, { useState } from 'react';
import firebase from '../config/firebase';
import { Icon, Button, Modal } from 'semantic-ui-react';
import classes from '../TopPage/TopPage.module.css';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';

const Header = () => {
  const [modal, setModal] = useState(false);
  const handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log('signed out'));
  };
  return (
    <div>
      <div className={classes.Header}>
        <h1 className={classes.HeaderTitle}>
          <Icon name='code' />
          <Link to="/mypage" style={{color: 'white'}}>Pro-Share.</Link>
        </h1>
        <Button color='red' onClick={() => setModal(true)}>
          ログアウト
        </Button>
        <Modal open={modal} onClose={() => setModal(false)}>
          <Modal.Content>
            <p>本当にログアウトしますか？</p>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={() => setModal(false)}>
              <Icon name='remove' /> No
            </Button>
            <Button color='green' onClick={handleSignout}>
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
        <MediaQuery query='(min-width: 601px)'>
          <Link to='/mypage' style={{color: 'white'}}>マイページ</Link>
          <Link to='/ranking' style={{color: 'white'}}>ランキング</Link>
          <Link to='/write' style={{color: 'white'}}>書く</Link>
          <Link to='/read' style={{color: 'white'}}>見る</Link>
          <Link to='/favorites' style={{color: 'white'}}>お気に入り</Link>
          <Link to='/settings' style={{color: 'white'}}>設定</Link>
        </MediaQuery>
      </div>
    </div>
  );
};

export default Header;
