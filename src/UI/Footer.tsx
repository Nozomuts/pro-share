import React from 'react';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


type Props = {
  activeItem: string;
};

const Footer = ({ activeItem }: Props) => {
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
        zIndex: 100
      }}
      inverted
    >
      <Menu.Item
        style={{ width: '25vw' }}
        name='user'
        active={activeItem === 'mypage'}
      >
        <Icon name='user' />
        <Link to='/mypage' style={{ fontSize: '3vw' }}>
          マイページ
        </Link>
      </Menu.Item>

      <Menu.Item
        style={{ width: '25vw' }}
        name='chess king'
        active={activeItem === 'ranking'}
      >
        <Icon name='chess king' />
        <Link to='/ranking' style={{ fontSize: '3vw' }}>
          ランキング
        </Link>
      </Menu.Item>

      <Menu.Item
        style={{ width: '25vw' }}
        name='article'
        active={activeItem === 'article'}
      >
        <Icon name='sticky note' />
        <Dropdown  icon="caret up" text='記事' style={{ fontSize: '3vw' }}>
          <Dropdown.Menu>
            <Dropdown.Header />
            <Dropdown.Item>
              <Icon name='edit' />
              <Link to='/write' style={{ fontSize: '3vw',color: 'black' }}>
                書く
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Icon name='book' />
              <Link to='/read' style={{ fontSize: '3vw',color: 'black' }}>
                読む
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Icon name='star' />
              <Link
                to='/favorites'
                style={{ fontSize: '3vw',color: 'black' }}
              >
                お気に入り
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>

      <Menu.Item
        style={{ width: '25vw' }}
        name='settings'
        active={activeItem === 'settings'}
      >
        <Icon name='settings' />
        <Link to='/settings' style={{ fontSize: '3vw' }}>
          設定
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default Footer;
