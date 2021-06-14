import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '@/store/user/userReducer';
import { changeStore } from '@/store/storeServices/storeServicesReducer';

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
  const [selected, setSelected] = useState(stores[0]);
  const dispatch = useDispatch();

  const handleChange = (newValue) => {
    setSelected(newValue);
  };

  useEffect(() => {
    dispatch(changeStore(selected));
  }, [dispatch, selected]);

  return (
    <>
      <Title level={5}>
        Seleccionar:
      </Title>
      <Select size="large" value={selected} onChange={handleChange}>
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
    </>
  );
};

export default StoreSelector;
