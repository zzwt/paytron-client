import React, { useState, useMemo, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import { CurrencySelector, Amount, Conversion } from '../index';
import { RiArrowLeftRightFill } from 'react-icons/ri';
import { Transition } from 'react-transition-group';
import styles from './style.module.scss';
import { currency } from '../../constants/currency';
import { getRate } from '../../request';
import { useRequest } from '../../request/useRequest';

const transitionDuration = 300;

const defaultStyle = {
  transition: `height ${transitionDuration}ms ease-in-out`,
  overflow: 'hidden',
};

const transitionStyles = {
  entering: { height: 0 },
  entered: { height: '35.2rem' },
  exiting: { height: '35.2rem' },
  exited: { height: 0 },
};

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

  // If rate fetched or error returned, update rate
  useEffect(() => {
    if (!loading && error) setRate(null);
    if (!loading && data) setRate(data);
  }, [loading, data, error]);

  // If source or target changes, remove current rate
  useEffect(() => {
    setRate(null);
    if (loading) {
      cancelRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to]);

  // If enter an invalid amount ,remove current rate
  useEffect(() => {
    if (!amount) {
      setRate(null);
      if (loading) {
        cancelRequest();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  const swapCurrency = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <Row className={styles.container}>
      <Col
        xs={22}
        sm={20}
        md={14}
        lg={12}
        xl={10}
        xxl={8}
        className={styles.calculator}
      >
        <Row className={styles.row}>
          <Col span={24}>
            <Amount prefix={prefix} onValueChange={setAmount} amount={amount} />
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col span={10}>
            <CurrencySelector
              title="From"
              value={from}
              onValueChange={setFrom}
            />
          </Col>
          <Col span={4} className={styles.icon_container}>
            <div
              className={styles.revert_icon}
              onClick={swapCurrency}
              data-testId="swap"
            >
              <RiArrowLeftRightFill />
            </div>
          </Col>
          <Col span={10}>
            <CurrencySelector title="To" value={to} onValueChange={setTo} />
          </Col>
        </Row>
        {(!rate || error || !amount) && (
          <Row className={`${styles.btn_container} ${styles.row}`}>
            <Col span={24}>
              <Button
                type="primary"
                className={styles.btn}
                disabled={amount === null || !from || !to || from === to}
                onClick={onCalculate}
                loading={loading}
              >
                Calculate
              </Button>
            </Col>
            {error && (
              <div className={styles.error} data-testid="fetch-error">
                {error.message}
              </div>
            )}
          </Row>
        )}

        <Transition in={rate !== null} timeout={0}>
          {(state) => (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
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
            </div>
          )}
        </Transition>
      </Col>
    </Row>
  );
});
