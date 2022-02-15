import React, { useState, useMemo, useEffect } from 'react';
import styles from './style.module.scss';
import { Input } from 'antd';
import PropTypes from 'prop-types';

const Amount = React.memo(({ title, amount, prefix, onValueChange }) => {
  const [valueText, setValueText] = useState(amount.toFixed(2));
  const [error, setError] = useState(null);

  const value = useMemo(() => {
    const newAmount = parseFloat(valueText);
    if (isNaN(newAmount)) {
      setError('Please enter a valid amount');
      return NaN;
    } else if (parseFloat(newAmount) <= 0) {
      setError('Please enter amount greater than 0');
      return NaN;
    } else {
      setError(null);
      return newAmount;
    }
  }, [valueText]);

  useEffect(() => {
    if (!error) {
      onValueChange(value);
    } else {
      onValueChange(NaN);
    }
  }, [value, error, onValueChange]);

  const onChange = (e) => {
    setValueText(e.target.value);
  };

  const onBlur = (e) => {
    if (!error) {
      setValueText(value.toFixed(2));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      {error && <div className={styles.error}>{error}</div>}
      <div>
        <Input
          prefix={prefix}
          value={valueText}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
});

Amount.defaultProps = {
  title: 'Amount',
  amount: 100,
  onValueChange: () => {},
};

Amount.propTypes = {
  prefix: PropTypes.string,
  title: PropTypes.string,
  amount: PropTypes.number,
  onValueChange: PropTypes.function,
};

export default Amount;