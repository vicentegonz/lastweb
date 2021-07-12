import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectStoreStats, changeKPI } from '@/store/storeStats/storeStatsReducer';
import { selectUser } from '@/store/user/userReducer';
import {
  Typography, Select, Space,
} from 'antd';
import {
  BarChartOutlined,
} from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const KPISelector = () => {
  const { statsData, selectedKPI } = useSelector(selectStoreStats);
  const { selectedStore } = useSelector(selectUser);
  const [kpis, setKpis] = useState([]);
  const [selected, setSelected] = useState(selectedKPI);
  const dispatch = useDispatch();

  const handleChange = (newValue) => {
    setSelected(newValue);
  };

  useEffect(() => {
    dispatch(changeKPI(selected));
  }, [dispatch, selected]);

  useEffect(() => {
    if (!statsData || !selectedStore || !statsData[selectedStore]) {
      return;
    }
    const storeStats = Object.keys(statsData[selectedStore]);

    setKpis(storeStats);
    if (!selected && storeStats.length !== 0) {
      setSelected(storeStats[0]);
    }
  }, [selectedStore, statsData, selected]);

  return (
    <>
      {
        kpis.length !== 0 && (
        <Space direction="vertical">
          <Title level={5}>
            Seleccionar estadística:
          </Title>
          <Select
            size="middle"
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
