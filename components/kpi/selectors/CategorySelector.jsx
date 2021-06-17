import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectStoreStats, changeCategory } from '@/store/storeStats/storeStatsReducer';
import {
  Typography, Select, Space,
} from 'antd';
import {
  TagsOutlined,
} from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const CategorySelector = () => {
  const { selectedStore, statsData } = useSelector(selectStoreStats);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (newValue) => {
    setSelected(newValue);
  };

  useEffect(() => {
    dispatch(changeCategory(selected));
  }, [dispatch, selected]);

  useEffect(() => {
    const storeStats = statsData[selectedStore];
    if (storeStats && storeStats.length !== 0) {
      const uniqueStats = [...new Set(storeStats.map((item) => item.category))];
      setCategories(uniqueStats);
    } else {
      setCategories([]);
      setSelected(null);
    }
  }, [selectedStore, statsData]);

  return (
    <>
      {
        categories.length !== 0 && (
        <Space direction="vertical">
          <Title level={5}>
            Seleccionar categoría:
          </Title>
          <Select size="middle" value={selected} onChange={handleChange} disabled={categories.length === 0}>
            {
            categories.length !== 0
              && (
                <Option value={null}>
                  <Space>
                    <TagsOutlined />
                    Todas las categorías
                  </Space>
                </Option>
              )
            }

            {categories.map((e) => (
              <Option key={e} value={e}>
                <Space>
                  <TagsOutlined />
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

export default CategorySelector;
