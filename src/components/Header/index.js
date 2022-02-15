import React from 'react';
import styles from './style.module.scss';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

export default React.memo(() => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <RiMoneyDollarCircleLine />
      </div>
      <h1>Paytron Calculator</h1>
      <h3>Forex converter</h3>
    </div>
  );
});
