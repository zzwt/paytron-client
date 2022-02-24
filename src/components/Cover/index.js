import React from 'react';
import styles from './style.module.scss';
import { Row } from 'antd';
import Spinner from '../../assets/images/spinner.gif';

const Cover = React.memo(() => {
  return (
    <Row className={styles.cover} data-testid="cover">
      <img src={Spinner} alt="spiner" className={styles.spinner} />
    </Row>
  );
});

export default Cover;
