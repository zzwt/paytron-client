import React, { useState, useMemo, useEffect } from 'react';
import styles from './style.module.scss';
import { Row, Col, Button } from 'antd';
import { CurrencySelector, Amount, Conversion } from '../index';
import { RiArrowLeftRightFill } from 'react-icons/ri';
import { currency } from '../../constants/currency';
import { getRate } from '../../request';
import { useRequest } from '../../request/useRequest';

export default React.memo(() => {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState('AUD');
  const [to, setTo] = useState('USD');
  const [rate, setRate] = useState(null);

  const { loading, error, data, fetchFn, cancelRequest } = useRequest(getRate);

  const prefix = useMemo(
    () =>
      currency.find((c) => {
        return c.code === from;
      }).symbol,
    [from]
  );

  const onCalculate = () => {
    setRate(null);
    fetchFn(amount, from, to);
  };

  useEffect(() => {
    if (error) {
      setRate(null);
    } else {
      setRate(data);
    }
  }, [data, error]);

  useEffect(() => {
    setRate(null);
    if (loading) {
      cancelRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to]);

  const swapCurrency = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <React.Fragment>
      <Row>
        <Col span={20} offset={2} className={styles.container}>
          <Row>
            <Col span={7}>
              <Amount
                prefix={prefix}
                onValueChange={setAmount}
                amount={amount}
              />
            </Col>
            <Col span={7} offset={1}>
              <CurrencySelector
                title="From"
                value={from}
                onValueChange={setFrom}
              />
            </Col>
            <Col span={2} className={styles.icon_container}>
              <div className={styles.revert_icon} onClick={swapCurrency}>
                <RiArrowLeftRightFill />
              </div>
            </Col>
            <Col span={7}>
              <CurrencySelector title="To" value={to} onValueChange={setTo} />
            </Col>
          </Row>
          {(!rate || error) && (
            <Row className={styles.btn_container}>
              <Button
                type="primary"
                className={styles.btn}
                disabled={amount === null || !from || !to || from === to}
                onClick={onCalculate}
                loading={loading}
              >
                Calculate
              </Button>
              {error && <div className={styles.error}>{error.message}</div>}
            </Row>
          )}
          {rate && (
            <Row className={styles.conversion_container}>
              <Conversion
                amount={amount}
                rate={rate}
                from={from}
                to={to}
                loading={loading}
                fetchRate={fetchFn}
              />
            </Row>
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
});
