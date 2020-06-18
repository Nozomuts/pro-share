import React, { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';
import { Button } from 'semantic-ui-react';

const Auth = () => {
  const [activeItem, setActiveItem] = useState(false);
  return (
    <>
      <div style={{display: 'flex',marginBottom: 15,justifyContent: 'space-between'}}>
          <Button active={!activeItem} style={{width: '30vw',margin: 0}} onClick={() => setActiveItem(false)}>Signin</Button>
          <Button active={activeItem} style={{width: '30vw',margin: 0}} onClick={() => setActiveItem(true)}>Signup</Button>
      </div>
        {activeItem ? <Signup /> : <Signin />}
    </>
  );
};

export default Auth;
