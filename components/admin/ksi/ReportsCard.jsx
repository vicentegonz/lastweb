import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  string, number,
} from 'prop-types';

import {
  Typography, Card, Space, Row, Col, Button,
} from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, MinusOutlined } from '@ant-design/icons';

import round from '@/utils/round';
import styles from './ksi.module.scss';

const { Title, Text } = Typography;

const ReportCard = ({
  name, value, createdAt, differenceYesterdayPct, differenceLastWeekPct,
  differenceYesterdayVal, differenceLastWeekVal,
}) => {
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
    const newVal = round((Math.abs(num)), digits);
    return newVal;
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
  return (
    <Card
      title={(
        <Space size="middle">
          <span>{name}</span>
        </Space>
      )}
      extra={(
        <Space size="middle">
          {router.pathname === '/'
           && (
           <Link href="/ksi">
             <Button type="primary" shape="round">Ver detalle</Button>
           </Link>
           )}
          <Text strong type="secondary">{formattedDate}</Text>
        </Space>
      )}
    >
      <Title type="success">{formattedValue}</Title>

      <Row justify="space-between">
        <Col>
          <Title
            className={styles.percentageTitle}
            level={3}
            type={yesterdayComparison}
          >
            <Space>
              {differenceYesterdayPct < 0 && (<ArrowDownOutlined />)}
              {differenceYesterdayPct > 0 && (<ArrowUpOutlined />)}
              {(!differenceYesterdayPct || differenceYesterdayPct === 0) && (<MinusOutlined />)}
              <span>
                {differenceYesterdayVal && nFormatter(differenceYesterdayVal, 2)}
              </span>
              {differenceYesterdayPct !== 0 && (
              <span>
                (
                {differenceYesterdayVal && FormattDifferencePercent(differenceYesterdayPct)}
                %)
              </span>
              )}
            </Space>
          </Title>
          <Text className={styles.sinceText} strong type="secondary">Desde ayer</Text>
        </Col>

        <Col>
          <Title
            className={styles.percentageTitle}
            level={3}
            type={lastWeekComparison}
          >
            <Space>
              {differenceLastWeekPct < 0 && (<ArrowDownOutlined />)}
              {differenceLastWeekPct > 0 && (<ArrowUpOutlined />)}
              {(!differenceLastWeekPct || differenceLastWeekPct === 0) && (<MinusOutlined />)}
              <span>
                {differenceLastWeekVal && nFormatter(differenceLastWeekVal, 2)}
              </span>
              {differenceLastWeekPct ? (differenceLastWeekPct !== 0 && (
              <span>
                (
                {differenceLastWeekVal && FormattDifferencePercent(differenceLastWeekPct)}
                %)
              </span>
              )) : null}
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
  differenceYesterdayPct: number,
  differenceLastWeekPct: number,
  differenceYesterdayVal: number,
  differenceLastWeekVal: number,
};

ReportCard.defaultProps = {
  differenceYesterdayPct: undefined,
  differenceLastWeekPct: undefined,
  differenceYesterdayVal: undefined,
  differenceLastWeekVal: undefined,
};

export default ReportCard;
