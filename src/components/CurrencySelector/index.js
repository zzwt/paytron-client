import React from 'react';
import styles from './style.module.scss';
import { Select } from 'antd';
import { currency } from '../../constants/currency';
import 'flag-icons/css/flag-icons.min.css';
import PropTypes from 'prop-types';

const CurrencySelector = React.memo(({ title, value, onValueChange }) => {
  const renderCurrencies = () => {
    return currency.map((c) => {
      return (
        <Select.Option key={c.code + title} value={c.code}>
          <span
            style={{
              display: 'inline-block',
              marginRight: '1rem',
            }}
            className={c.flag}
          ></span>
          {`${c.code} - ${c.desc}`}
        </Select.Option>
      );
    });
  };

  return (
    <React.Fragment>
      <div className={styles.title}>{title}</div>
      <div>
        <Select
          showSearch
          placeholder="Type to Search"
          optionFilterProp="children"
          value={value}
          onChange={onValueChange}
          style={{ width: '100%' }}
          filterOption={(input, option) =>
            option.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {renderCurrencies()}
        </Select>
      </div>
    </React.Fragment>
  );
});

CurrencySelector.defaultProps = {
  onValueChange: () => {},
};

CurrencySelector.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  onValueChange: PropTypes.func,
};

export default CurrencySelector;
