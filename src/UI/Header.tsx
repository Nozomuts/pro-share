import React from 'react';
import firebase from '../config/firebase';
import { Icon, Dropdown } from 'semantic-ui-react';
import classes from '../TopPage/TopPage.module.css';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ModalComponent from './ModalComponent';
import { RootState } from '../re-ducks/store';

type Props = {
  activeItem: string;
};

const Header = ({ activeItem }: Props) => {
  const color = useSelector((state: RootState) => state.color);
  const handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log('signed out'));
  };

  return (
    <div>
      <div className={classes.Header} style={{ backgroundColor: color.color }}>
        <h1 className={classes.HeaderTitle}>
          <Icon name='code' />
          <Link to='/mypage' style={{ color: 'white' }}>
            Pro-Share.
          </Link>
        </h1>
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
            <Dropdown.Menu style={{padding: 0}}>
              <Dropdown.Item >
                <Link to='/write'>
                  <p style={{ color: 'black', width: 102, height: 36,textAlign: 'center',lineHeight: '36px' }}>書く</p>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to='/read'>
                  <p style={{ color: 'black', width: 102, height: 36,textAlign: 'center',lineHeight: '36px' }}>見る</p>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to='/favorites'>
                  <p style={{ color: 'black', width: 102, height: 36,textAlign: 'center',lineHeight: '36px' }}>
                    お気に入り
                  </p>
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
        <ModalComponent text='ログアウト' clickEvent={handleSignout} />
      </div>
    </div>
  );
};

export default Header;
