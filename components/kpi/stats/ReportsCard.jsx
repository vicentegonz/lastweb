import Link from 'next/link';
import { useRouter } from 'next/router';
import { changeKPI } from '@/store/storeStats/storeStatsReducer';
import { useDispatch } from 'react-redux';

import {
  string, number,
} from 'prop-types';

import {
  Typography, Card, Space, Row, Col, Button,
} from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, MinusOutlined } from '@ant-design/icons';

import round from '@/utils/round';
import styles from '../kpi.module.scss';

const { Title, Text } = Typography;

const ReportCard = ({
  name, value, createdAt, differenceYesterdayPct, differenceLastWeekPct,
  differenceYesterdayVal, differenceLastWeekVal, category, unit,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  let formattedDate = new Date(createdAt);
  formattedDate = new Date(
    formattedDate.getTime() + Math.abs(formattedDate.getTimezoneOffset() * 60000),
  ).toLocaleDateString('en-ZA');

  const formattedValue = round(value, 2);
  const FormattDifferencePercent = (val) => {
    const newVal = round(Math.abs(val), 2);
    return newVal;
  };

  const nFormatter = (num, digits) => {
    const lookup = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'G' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    const Newitem = lookup.slice().reverse().find((item) => Math.abs(num) >= item.value);
    return Newitem ? round((num / Newitem.value), digits).replace(rx, '$1') + Newitem.symbol : '0';
  };

  let yesterdayComparison = 'secondary';
  if (differenceYesterdayPct < 0) {
    yesterdayComparison = 'danger';
  } else if (differenceYesterdayPct > 0) {
    yesterdayComparison = 'success';
  }

  let lastWeekComparison = 'secondary';
  if (differenceLastWeekPct < 0) {
    lastWeekComparison = 'danger';
  } else if (differenceLastWeekPct > 0) {
    lastWeekComparison = 'success';
  }

  const clickedButton = () => {
    dispatch(changeKPI(name));
  };

  return (
    <Card
      title={(
        <Space size="middle">
          <span>{name}</span>
          <span>
            <Text className={styles.category} strong type="secondary">{category}</Text>
          </span>
        </Space>
      )}
      extra={(
        <Space size="middle">
          {router.pathname === '/'
           && (
           <Link href="/kpi">
             <Button type="primary" shape="round" onClick={clickedButton}>Ver detalle</Button>
           </Link>
           )}
          <Text strong type="secondary">{formattedDate}</Text>
        </Space>
      )}
    >
      {unit === '$' && <Title type="success">{`${unit} ${formattedValue}`}</Title>}
      {unit === 'unidades' && <Title type="success">{`${formattedValue} ${unit}`}</Title>}
      {!unit && <Title type="success">{`${formattedValue}`}</Title>}

      <Row justify="space-between">
        <Col>
          <Title className={styles.percentageTitle} level={3} type={yesterdayComparison}>
            <Space>
              {differenceYesterdayPct < 0 && <ArrowDownOutlined />}
              {differenceYesterdayPct > 0 && <ArrowUpOutlined />}
              {differenceYesterdayPct === 0 && <MinusOutlined />}

              {unit === '$' ? (
                <span>
                  {`${unit} ${nFormatter(differenceYesterdayVal, 1)}`}
                </span>
              ) : (
                <span>
                  {`${nFormatter(differenceYesterdayVal, 1)}`}
                </span>
              )}

              {differenceYesterdayPct !== 0 && (
              <span>
                (
                {FormattDifferencePercent(differenceYesterdayPct)}
                %)
              </span>
              )}
            </Space>
          </Title>
          <Text className={styles.sinceText} strong type="secondary">Desde ayer</Text>
        </Col>

        <Col>
          <Title className={styles.percentageTitle} level={3} type={lastWeekComparison}>
            <Space>
              {differenceLastWeekPct < 0 && <ArrowDownOutlined />}
              {differenceLastWeekPct > 0 && <ArrowUpOutlined />}
              {differenceLastWeekPct === 0 && <MinusOutlined />}
              {unit === '$' ? (
                <span>
                  {`${unit} ${nFormatter(differenceLastWeekVal, 1)}`}
                </span>
              ) : (
                <span>
                  {`${nFormatter(differenceLastWeekVal, 1)}`}
                </span>
              )}

              {differenceLastWeekPct !== 0 && (
              <span>
                (
                {FormattDifferencePercent(differenceLastWeekPct)}
                %)
              </span>
              )}
            </Space>
          </Title>
          <Text className={styles.sinceText} strong type="secondary">Desde la semana pasada</Text>
        </Col>
      </Row>
    </Card>
  );
};

ReportCard.propTypes = {
  name: string.isRequired,
  value: number.isRequired,
  createdAt: string.isRequired,
  differenceYesterdayPct: number.isRequired,
  differenceLastWeekPct: number.isRequired,
  differenceYesterdayVal: number.isRequired,
  differenceLastWeekVal: number.isRequired,
  category: string,
  unit: string,
};

ReportCard.defaultProps = {
  unit: '',
  category: '',
};

export default ReportCard;
