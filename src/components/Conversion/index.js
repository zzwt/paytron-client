import React from 'react';
import styles from './style.module.scss';
import { Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import useCurrency from './useCurrency';
import Cover from '../Cover';
import { useInterval } from './useInterval';

const REFRESH_INTERVAL = 30000;

const Conversion = React.memo(
  ({ amount, rate, from, to, loading, fetchRate }) => {
    const {
      fromAmountText,
      baseRateText,
      paytronFee,
      paytronRateText,
      finalToAmountText,
    } = useCurrency(amount, rate, from, to);

    useInterval(() => {
      fetchRate && fetchRate(amount, from, to);
    }, REFRESH_INTERVAL);

    if (isNaN(amount) || rate === null) {
      return <React.Fragment></React.Fragment>;
    }
    return (
      <Col className={styles.container}>
        {loading && <Cover />}
        <Row className={styles.conversion}>
          <Row className={styles.from}>
            <Col span={8} className={styles.left}>
              Converting
            </Col>
            <Col span={16} className={styles.right}>
              {fromAmountText}
            </Col>
          </Row>
          <Row className={styles.to}>
            <Col span={8} className={styles.left}>
              You'll receive
            </Col>
            <Col span={16} className={styles.right}>
              {finalToAmountText}
            </Col>
          </Row>
          <Row className={styles.rate_container}>
            <Row className={`${styles.rate_row} ${styles.rate_label} `}>
              Rate & Fee
            </Row>
            <Row className={styles.rate_row}>
              <Col span={8} className={`${styles.left}`}>
                Base Rate
              </Col>
              <Col span={16} className={`${styles.right} ${styles.base_rate}`}>
                {baseRateText}
              </Col>
            </Row>

            <Row className={styles.rate_row}>
              <Col span={8} className={`${styles.left} `}>
                Paytron Fee
              </Col>
              <Col span={16} className={`${styles.right} ${styles.fee}`}>
                {paytronFee}
              </Col>
            </Row>
            <Row className={`${styles.rate_row} ${styles.highlight}`}>
              <Col span={8} className={styles.left}>
                Paytron Rate
              </Col>
              <Col span={16} className={styles.right}>
                {paytronRateText}
              </Col>
            </Row>
          </Row>
          <Row className={styles.btn_container}>
            <Button type="primary" className={styles.btn} onClick={() => {}}>
              Convert Now
            </Button>
          </Row>
        </Row>
      </Col>
    );
  }
);

Conversion.defaultProps = {
  loading: false,
};

Conversion.propTypes = {
  amount: PropTypes.number.isRequired,
  rate: PropTypes.object.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  fetchRate: PropTypes.func,
};

export default Conversion;
