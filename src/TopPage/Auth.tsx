import React, { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';
import { Button } from 'semantic-ui-react';

const Auth = () => {
  const [activeItem, setActiveItem] = useState(false);
  return (
    <>
      {activeItem ? <Signup /> : <Signin />}
      <Button onClick={() => setActiveItem((prev) => !prev)}>
        {activeItem ? 'Signin' : 'Signup'}
      </Button>
    </>
  );
};

export default Auth;
