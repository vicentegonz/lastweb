import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectStoreStats, changeKPI } from '@/store/storeStats/storeStatsReducer';
import {
  Typography, Select, Space,
} from 'antd';
import {
  BarChartOutlined,
} from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const KPISelector = () => {
  const { selectedStore, statsData } = useSelector(selectStoreStats);
  const [kpis, setKpis] = useState([]);
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (newValue) => {
    setSelected(newValue);
  };

  useEffect(() => {
    dispatch(changeKPI(selected));
  }, [dispatch, selected]);

  useEffect(() => {
    const storeStats = statsData[selectedStore];
    if (storeStats && storeStats.length !== 0) {
      const uniqueStats = [...new Set(storeStats.map((item) => item.name))];
      setKpis(uniqueStats);
      setSelected(uniqueStats[0]);
    } else {
      setKpis([]);
      setSelected(null);
    }
  }, [selectedStore, statsData]);

  return (
    <>
      {
        kpis.length !== 0 && (
        <Space direction="vertical">
          <Title level={5}>
            Seleccionar estadística:
          </Title>
          <Select
            size="large"
            value={selected}
            onChange={handleChange}
            disabled={kpis.length === 0}
          >
            {kpis.map((e) => (
              <Option key={e} value={e}>
                <Space>
                  <BarChartOutlined />
                  {e}
                </Space>
              </Option>
            ))}
          </Select>
        </Space>
        )
      }
    </>
  );
};

export default KPISelector;
