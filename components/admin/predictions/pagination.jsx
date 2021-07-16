import { useState } from 'react';
import {
  instanceOf,
} from 'prop-types';

import { useDispatch } from 'react-redux';
import { changeProduct } from '@/store/storePredictions/predictionsReducer';

import {
  Pagination, Menu, Space,
} from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import styles from './predictions.module.scss';

const locale = {
  prevText: '<',
  nextText: '>',
};

const PaginationFrame = ({ itemArray }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState(1);
  const [elemsForPage, setElemsForPage] = useState(8);

  const pairReducer = (originalArray) => {
    const reduced = originalArray.reduce(
      (rows, key, index) => (
        index % elemsForPage === 0 ? rows.push([key])
          : rows[rows.length - 1].push(key)) && rows, [],
    );
    return reduced;
  };

  const changePage = (page, pageSize) => {
    setState(page);
    setElemsForPage(pageSize);
  };

  const clickHandle = (idx) => {
    dispatch(changeProduct(idx));
  };

  return (
    <div className={styles.fatherWidth}>
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
          <div className={styles.alertContainer}>
            <Menu mode="inline" key={`row-${item[0].id}`}>
              {item.map((subitem) => (
                <Menu.Item key={subitem.id} icon={<DollarCircleOutlined />}>
                  <a role="button" onClick={() => clickHandle(subitem.id)} onKeyDown={() => clickHandle(subitem.id)} tabIndex={subitem.id}>
                    <Space size="middle">
                      <span>
                        {`${subitem.description} `}
                      </span>
                    </Space>
                  </a>
                </Menu.Item>
              ))}
            </Menu>
          </div>

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
