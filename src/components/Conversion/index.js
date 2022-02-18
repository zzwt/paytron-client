import React from 'react';
import styles from './style.module.scss';
import { Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import useCurrency from './useCurrency';
const Conversion = React.memo(({ amount, rate, from, to }) => {
  const {
    fromAmountText,
    baseRateText,
    paytronFee,
    paytronRateText,
    finalToAmountText,
  } = useCurrency(amount, rate, from, to);

  if (isNaN(amount) || rate === null) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <Row className={styles.container}>
      <Col sm={16} md={13} lg={10} xl={8} xxl={6}>
        <Row className={styles.from}>
          <Col span={12} className={styles.left}>
            Converting
          </Col>
          <Col span={12} className={styles.right}>
            {fromAmountText}
          </Col>
        </Row>
        <Row className={styles.to}>
          <Col span={12} className={styles.left}>
            You'll receive
          </Col>
          <Col span={12} className={styles.right}>
            {finalToAmountText}
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
              {baseRateText}
            </Col>
          </Row>

          <Row className={styles.rate_row}>
            <Col span={12} className={`${styles.left} `}>
              Paytron Fee
            </Col>
            <Col span={12} className={`${styles.right} ${styles.fee}`}>
              {paytronFee}
            </Col>
          </Row>
          <Row className={`${styles.rate_row} ${styles.highlight}`}>
            <Col span={12} className={styles.left}>
              Paytron Rate
            </Col>
            <Col span={12} className={styles.right}>
              {paytronRateText}
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
  from: PropTypes.string,
  to: PropTypes.string,
};

export default Conversion;
