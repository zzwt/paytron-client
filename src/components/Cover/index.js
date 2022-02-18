import React from 'react';
import styles from './style.module.scss';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import Spinner from '../../assets/images/spinner.gif';

const Cover = React.memo(({ loading }) => {
  if (!loading) return <React.Fragment></React.Fragment>;

  return (
    <Row className={styles.container}>
      <Col sm={16} md={13} lg={10} xl={8} xxl={6} className={styles.cover}>
        <img src={Spinner} alt="spiner" />
      </Col>
    </Row>
  );
});

Cover.defaultProps = {
  loading: false,
};

Cover.propTypes = {
  loading: PropTypes.bool,
};

export default Cover;
