import {
  string, func,
} from 'prop-types';

import { Input, Space, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import styles from './selectors.module.scss';

const { Title } = Typography;

const TextSearch = ({ filteredText, setFilteredText }) => {
  const changeFilter = (event) => {
    setFilteredText(event.target.value);
  };

  return (
    <Space direction="vertical">
      <Title level={5}>
        Búsqueda por nombre:
      </Title>
      <Input
        className={styles.parentWidth}
        placeholder="Buscar..."
        prefix={<SearchOutlined />}
        value={filteredText}
        onChange={changeFilter}
      />
    </Space>
  );
};

TextSearch.propTypes = {
  filteredText: string.isRequired,
  setFilteredText: func.isRequired,
};

export default TextSearch;
