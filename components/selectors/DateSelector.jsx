import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeDateRange } from '@/store/user/userReducer';
import {
  Typography, DatePicker, Space,
} from 'antd';

import styles from './selectors.module.scss';

const { Title } = Typography;

const DateSelector = () => {
  const [value, setValue] = useState();
  const dispatch = useDispatch();

  const disabledDate = (current) => (current && current > new Date());

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value) {
      // eslint-disable-next-line no-underscore-dangle
      let firstDate = value._d;
      firstDate = new Date(
        firstDate.getTime() - Math.abs(firstDate.getTimezoneOffset() * 60000),
      );

      const secondDate = new Date(firstDate);
      secondDate.setDate(firstDate.getDate() - 7);

      const parsedFirst = firstDate.toISOString().split('T')[0];
      const parsedSecond = secondDate.toISOString().split('T')[0];

      dispatch(changeDateRange([parsedSecond, parsedFirst]));
    }
  }, [dispatch, value]);

  return (
    <Space direction="vertical">
      <Title level={5}>
        Seleccionar fecha:
      </Title>
      <DatePicker
        className={styles.dateWidth}
        size="middle"
        value={value}
        disabledDate={disabledDate}
        onChange={handleChange}
        placeholder="Selecciona Fecha"
      />
    </Space>
  );
};

export default DateSelector;
