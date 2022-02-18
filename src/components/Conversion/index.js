import React, { useState, useMemo, useEffect } from 'react';
import styles from './style.module.scss';
import { Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';

const Conversion = React.memo(({ amount, rate }) => {
  // if (isNaN(amount) || rate === null) {
  //   return <React.Fragment></React.Fragment>;
  // }
  return (
    <Row className={styles.container}>
      {/* <span>{amount}</span>
      <span>{rate.currencyPair}</span>
      <span>{rate.midMarketRate}</span> */}
      {/* offset={8} */}
      <Col sm={16} md={13} lg={10} xl={8} xxl={6}>
        <Row className={styles.from}>
          <Col span={12} className={styles.left}>
            Converting
          </Col>
          <Col span={12} className={styles.right}>
            $100 USD
          </Col>
        </Row>
        <Row className={styles.to}>
          <Col span={12} className={styles.left}>
            You'll receive
          </Col>
          <Col span={12} className={styles.right}>
            $13227 AUD
          </Col>
        </Row>
        <Row className={styles.rate_container}>
          <Row className={`${styles.rate_row} ${styles.rate_label} `}>
            Rate & Fee
          </Row>
          <Row className={styles.rate_row}>
            <Col span={12} className={`${styles.left}`}>
              Base Rate
            </Col>
            <Col span={12} className={`${styles.right} ${styles.base_rate}`}>
              $1 USD = $1.4323 AUD
            </Col>
          </Row>

          <Row className={styles.rate_row}>
            <Col span={12} className={`${styles.left} `}>
              Paytron Fee
            </Col>
            <Col span={12} className={`${styles.right} ${styles.fee}`}>
              $3.02 AUD
            </Col>
          </Row>
          <Row className={`${styles.rate_row} ${styles.highlight}`}>
            <Col span={12} className={styles.left}>
              Paytron Rate
            </Col>
            <Col span={12} className={styles.right}>
              $1 USD = $1.3823 AUD
            </Col>
          </Row>
        </Row>
        <Row justify="center">
          <Button type="primary" className={styles.btn} onClick={() => {}}>
            Convert Now
          </Button>
        </Row>
      </Col>
    </Row>
  );
});

Conversion.defaultProps = {};

Conversion.propTypes = {
  amount: PropTypes.number,
  rate: PropTypes.object,
};

export default Conversion;
