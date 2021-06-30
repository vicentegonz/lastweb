import { useState } from 'react';
import {
  instanceOf,
} from 'prop-types';
import {
  Pagination, Row, Space,
} from 'antd';

import styles from './predictions.module.scss';

const locale = {
  prevText: '<',
  nextText: '>',
};

const PaginationFrame = ({ itemArray }) => {
  const [state, setState] = useState(0);
  const [elemsForPage, setElemsForPage] = useState(10);

  const changePage = (page, pageSize) => {
    setState(page - 1);
    setElemsForPage(pageSize);
  };

  return (
    <div className={styles.paginationContainer}>
      <Space
        direction="vertical"
        size="middle"
      >
        {itemArray.slice(
          state * elemsForPage,
          elemsForPage * (state + 1),
        ).map((item) => (
          <Row justify="center" key={item}>
            {item}
          </Row>
        ))}

        <div className={styles.pagination}>
          <Pagination
            defaultCurrent={1}
            total={itemArray.length}
            locale={locale}
            onChange={changePage}
            responsive
          />
        </div>
      </Space>
    </div>
  );
};

PaginationFrame.propTypes = {
  itemArray: instanceOf(Array).isRequired,
};

export default PaginationFrame;
