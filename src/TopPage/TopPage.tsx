import React, { useState } from 'react';
import Auth from './Auth';
import { Modal, Icon } from 'semantic-ui-react';
import classes from './TopPage.module.css';

const TopPage = () => {
  const [modal, setModal] = useState(false);
  return (
    <div className={classes.TopPage}>
      <h1 className={classes.Header}><Icon name="code"/>Pro-share</h1>
      <div className={classes.Container}>
        <div>
          <h1 className={classes.Top}>プログラミング特化型情報共有サイト</h1>
          <h1 className={classes.Title}>Pro-share.</h1>
          <h1 className={classes.List}>
            プログラミングの勉強方法を共有しよう！
          </h1>
          <h1 className={classes.List}>
            勉強を記録して、全国のライバルと競い合おう！
          </h1>
        </div>
        <Modal open={modal} onClose={() => setModal(false)}>
          <Auth />
        </Modal>
        <button
          className={classes.Button}
          onClick={() => setModal(true)}
        >
          <h1>さっそく使ってみる</h1>
        </button>
      </div>
    </div>
  );
};

export default TopPage;
