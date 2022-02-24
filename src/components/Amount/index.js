import React, { useState, useMemo, useEffect } from 'react';
import styles from './style.module.scss';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import { toCurrency, currencyToNum } from '../../utils';
const Amount = React.memo(({ title, amount, prefix, onValueChange }) => {
  const [valueText, setValueText] = useState(toCurrency(amount));
  const [error, setError] = useState(null);

  const value = useMemo(() => {
    const newAmount = currencyToNum(valueText);
    if (isNaN(newAmount)) {
      setError('Please enter a valid amount');
      return null;
    } else if (newAmount <= 0) {
      setError('Please enter amount greater than 0');
      return null;
    } else if (newAmount > Number.MAX_SAFE_INTEGER) {
      return 1.0;
    } else {
      setError(null);
      return newAmount;
    }
  }, [valueText]);

  useEffect(() => {
    if (!error) {
      onValueChange(value);
    } else {
      onValueChange(null);
    }
  }, [value, error, onValueChange]);

  const onChange = (e) => {
    setValueText(e.target.value);
  };

  const onBlur = (e) => {
    if (!error) {
      setValueText(toCurrency(value));
    }
  };

  return (
    <div className={styles.container} data-testid="amount-container">
      <div className={styles.title}>
        {title}
        {error && (
          <span className={styles.error} data-testid="error">
            {error}
          </span>
        )}
      </div>

      <div>
        <Input
          prefix={prefix}
          value={valueText}
          onChange={onChange}
          onBlur={onBlur}
          data-testid="amount"
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
  onValueChange: PropTypes.func,
};

export default Amount;
