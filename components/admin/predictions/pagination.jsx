import { useState } from 'react';
import {
  instanceOf,
} from 'prop-types';
import {
  Pagination, Row, Col, Space,
} from 'antd';
import PredictionCard from './predictionsCard.jsx';

import styles from './predictions.module.scss';

const locale = {
  prevText: '<',
  nextText: '>',
};

const pairReducer = (originalArray) => {
  const reduced = originalArray.reduce(
    (rows, key, index) => (
      index % 2 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows, [],
  );
  return reduced;
};

const PaginationFrame = ({ itemArray }) => {
  const [state, setState] = useState(1);
  const [elemsForPage, setElemsForPage] = useState(6);

  const changePage = (page, pageSize) => {
    setState(page);
    setElemsForPage(pageSize);
  };

  return (
    <div className={styles.paginationContainer}>
      <Space
        direction="vertical"
        size="middle"
        className={styles.fullLength}
      >
        {
        pairReducer(itemArray.slice(
          (state - 1) * elemsForPage,
          elemsForPage * (state),
        )).map((item) => (
          <Row justify="space-between" key={`row-${item[0].id}`}>
            {item.map((subitem) => (
              <Col span={12} key={subitem.id}>
                <PredictionCard
                  key={subitem.id}
                  productId={subitem.id}
                  description={subitem.description}
                  date={subitem.initialDate}
                  days={subitem.days}
                  prediction={[subitem.min, subitem.max]}
                />
              </Col>
            ))}

          </Row>
        ))
        }

        <div className={styles.pagination}>
          <Pagination
            pageSize={elemsForPage}
            current={state}
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
