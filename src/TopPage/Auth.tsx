import React, { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Auth = () => {
  const [activeItem, setActiveItem] = useState(false);
  return (
    <div style={{display: 'flex',flexDirection: 'column',paddingTop: 20,paddingBottom: 30}}>
      <h1 style={{fontSize: 30,textAlign: 'center'}}>{activeItem? '新規登録':'ログイン'}</h1>
      <div style={{display: 'flex',marginBottom: 15,justifyContent: 'space-evenly'}}>
          <Button active={!activeItem} style={{width: '30vw',margin: 0}} onClick={() => setActiveItem(false)}>ログイン</Button>
          <Button active={activeItem} style={{width: '30vw',margin: 0}} onClick={() => setActiveItem(true)}>新規登録</Button>
      </div>
        {activeItem ? <Signup /> : <Signin />}
        <p style={{marginTop: 15,textAlign: 'center'}}>パスワードを忘れた方は<Link to="/forget">こちら</Link></p>
    </div>
  );
};

export default Auth;
