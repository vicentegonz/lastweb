import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectStorePredictions, changeDays } from '@/store/storePredictions/predictionsReducer';
import {
  Typography, Select, Space,
} from 'antd';
import {
  CalendarOutlined,
} from '@ant-design/icons';

import styles from './selectors.module.scss';

const { Title } = Typography;
const { Option } = Select;

const DaysSelector = () => {
  const { days } = useSelector(selectStorePredictions);
  const [selected, setSelected] = useState(days);
  const dispatch = useDispatch();

  const handleChange = (newValue) => {
    setSelected(newValue);
  };

  useEffect(() => {
    dispatch(changeDays(selected));
  }, [dispatch, selected]);

  return (
    <>
      <Space direction="vertical">
        <Title level={5}>
          Días a predecir:
        </Title>
        <Select size="middle" value={selected} onChange={handleChange} className={styles.parentWidth}>
          {Array.from({ length: 7 }, (x, i) => i + 1).map((e) => (
            <Option key={e} value={e}>
              <Space>
                <CalendarOutlined />
                {e}
                {e === 1 ? 'día' : 'días'}
              </Space>
            </Option>
          ))}
        </Select>
      </Space>
    </>
  );
};

export default DaysSelector;
