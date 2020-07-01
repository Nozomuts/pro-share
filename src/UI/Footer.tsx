import React from 'react';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../re-ducks/store';

type Props = {
  activeItem: string;
};

const Footer = ({ activeItem }: Props) => {
  const color = useSelector((state: RootState) => state.color);
  return (
    <Menu
      size='small'
      icon='labeled'
      style={{
        width: '100vw',
        display: 'flex',
        position: 'fixed',
        bottom: 0,
        justifyContent: 'space-between',
        zIndex: 100,
        backgroundColor: color.color,
      }}
      inverted
    >
      <Link to='/mypage' style={{ fontSize: '3vw' }}>
        <Menu.Item
          style={{ width: '25vw' }}
          name='user'
          active={activeItem === 'mypage'}
        >
          <Icon name='user' />
          マイページ
        </Menu.Item>
      </Link>

      <Link to='/ranking' style={{ fontSize: '3vw' }}>
        <Menu.Item
          style={{ width: '25vw' }}
          name='chess king'
          active={activeItem === 'ranking'}
        >
          <Icon name='chess king' />
          ランキング
        </Menu.Item>
      </Link>

      <Menu.Item
        style={{ width: '25vw' }}
        name='article'
        active={activeItem === 'article'}
      >
        <Icon name='sticky note' />
        <Dropdown icon='caret up' text='記事' style={{ fontSize: '3vw' }}>
          <Dropdown.Menu>
            <Dropdown.Header />
            <Dropdown.Item>
              <Link to='/write' style={{ fontSize: '3vw', color: 'black' }}>
              <Icon name='edit' />
                書く
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to='/read' style={{ fontSize: '3vw', color: 'black' }}>
              <Icon name='book' />
                読む
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to='/favorites' style={{ fontSize: '3vw', color: 'black' }}>
              <Icon name='star' />
                お気に入り
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>

      <Link to='/settings' style={{ fontSize: '3vw' }}>
        <Menu.Item
          style={{ width: '25vw' }}
          name='settings'
          active={activeItem === 'settings'}
        >
          <Icon name='settings' />
          設定
        </Menu.Item>
      </Link>
    </Menu>
  );
};

export default Footer;
