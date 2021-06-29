import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, changeStore } from '@/store/user/userReducer';
import {
  Typography, Select, Space,
} from 'antd';
import {
  ShopOutlined,
} from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const StoreSelector = () => {
  const user = useSelector(selectUser);
  const [selected, setSelected] = useState(user.selectedStore
    ? user.selectedStore : user.stores[0]);
  const dispatch = useDispatch();

  const handleChange = (newValue) => {
    setSelected(newValue);
  };

  useEffect(() => {
    dispatch(changeStore(selected));
  }, [dispatch, selected]);

  return (
    <Space direction="vertical">
      <Title level={5}>
        Seleccionar tienda:
      </Title>
      <Select size="middle" value={selected} onChange={handleChange}>
        {user.stores.map((e) => (
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
