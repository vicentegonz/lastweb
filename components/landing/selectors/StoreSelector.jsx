import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '@/store/user/userReducer';
import { selectStoreStats, changeStore } from '@/store/storeStats/storeStatsReducer';
import { changeStatStore } from '@/store/storeServices/storeServicesReducer';
import {
  Typography, Select, Space,
} from 'antd';
import {
  ShopOutlined,
} from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const StoreSelector = () => {
  const { stores } = useSelector(selectUser);
  const storeStats = useSelector(selectStoreStats);
  const [selected, setSelected] = useState(storeStats.selectedStore
    ? storeStats.selectedStore : stores[0]);
  const dispatch = useDispatch();

  const handleChange = (newValue) => {
    setSelected(newValue);
  };

  useEffect(() => {
    dispatch(changeStore(selected));
    dispatch(changeStatStore(selected));
  }, [dispatch, selected]);

  return (
    <Space direction="vertical">
      <Title level={5}>
        Seleccionar tienda:
      </Title>
      <Select size="middle" value={selected} onChange={handleChange}>
        {stores.map((e) => (
          <Option key={e} value={e}>
            <Space>
              <ShopOutlined />
              Tienda:
              {e}
            </Space>
          </Option>
        ))}
      </Select>
    </Space>
  );
};

export default StoreSelector;
