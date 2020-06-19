import React, { useState } from 'react';
import firebase from '../config/firebase';
import { Icon, Button, Modal, Dropdown } from 'semantic-ui-react';
import classes from '../TopPage/TopPage.module.css';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';

type Props = {
  activeItem: string;
};

const Header = ({ activeItem }: Props) => {
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
          <Link to='/mypage' style={{ color: 'white' }}>
            Pro-Share.
          </Link>
        </h1>
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

        <MediaQuery query='(min-width: 671px)'>
          <Link to='/mypage'>
            <p
              className={
                activeItem === 'mypage' ? classes.active : classes.inActive
              }
            >
              マイページ
            </p>
          </Link>
          <Link to='/ranking'>
            <p
              className={
                activeItem === 'ranking' ? classes.active : classes.inActive
              }
            >
              ランキング
            </p>
          </Link>
          <Dropdown
            item
            text='記事'
            className={
              activeItem === 'article' ? classes.active : classes.inActive
            }
          >
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to='/write' style={{ color: 'black' }}>
                  書く
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to='/read' style={{ color: 'black' }}>
                  見る
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to='/favorites' style={{ color: 'black' }}>
                  お気に入り
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Link to='/settings'>
            <p
              className={
                activeItem === 'settings' ? classes.active : classes.inActive
              }
            >
              設定
            </p>
          </Link>
        </MediaQuery>
        <Button color='red' onClick={() => setModal(true)}>
          ログアウト
        </Button>
      </div>
    </div>
  );
};

export default Header;
