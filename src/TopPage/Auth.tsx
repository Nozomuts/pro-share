import React, { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';
import { Button, Grid } from 'semantic-ui-react';

const Auth = () => {
  const [activeItem, setActiveItem] = useState(false);
  return (
    <>
      <Grid.Row style={{margin: '0 auto',width: 450}}>
          <Button style={{width: 220}} onClick={() => setActiveItem(false)}>Signin</Button>
          <Button style={{width: 220}} onClick={() => setActiveItem(true)}>Signup</Button>
      </Grid.Row>
        {activeItem ? <Signup /> : <Signin />}
    </>
  );
};

export default Auth;
