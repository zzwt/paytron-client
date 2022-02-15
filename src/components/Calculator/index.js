import React, { useState } from 'react';
import styles from './style.module.scss';
import { Row, Col, Button } from 'antd';
import { CurrencySelector, Amount } from '../index';
import { RiArrowLeftRightFill } from 'react-icons/ri';

export default React.memo(() => {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState('AUD');
  const [to, setTo] = useState('USD');

  const onCalculate = (e) => {
    console.log(amount, from, to);
  };

  const swapCurrency = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };
  return (
    <React.Fragment>
      <Row>
        <Col span={20} offset={2} className={styles.container}>
          <Row>
            <Col span={7}>
              <Amount prefix="€" onValueChange={setAmount} amount={amount} />
            </Col>
            <Col span={7} offset={1}>
              <CurrencySelector
                title="From"
                value={from}
                onValueChange={setFrom}
                defaultValue="AUD"
              />
            </Col>
            <Col span={2} className={styles.icon_container}>
              <div
                className={styles.revert_icon}
                onClick={() => {
                  swapCurrency();
                }}
              >
                <RiArrowLeftRightFill />
              </div>
            </Col>
            <Col span={7}>
              <CurrencySelector
                title="To"
                value={to}
                onValueChange={setTo}
                defaultValue="USD"
              />
            </Col>
          </Row>
          <Button
            type="primary"
            className={styles.btn}
            disabled={isNaN(amount) || !from || !to}
            onClick={onCalculate}
          >
            Calculate
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
});
