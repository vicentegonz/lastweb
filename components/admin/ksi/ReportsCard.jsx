import {
  string, number,
} from 'prop-types';

import {
  Typography, Card, Space, Row, Col,
} from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, MinusOutlined } from '@ant-design/icons';

import styles from './ksi.module.scss';

const { Title, Text } = Typography;

const ReportCard = ({
  name, value, createdAt, differenceYesterdayPct, differenceLastWeekPct,
  differenceYesterdayVal, differenceLastWeekVal,
}) => {
  const date = new Date(createdAt).toLocaleDateString('en-ZA');
  const time = new Date(createdAt).toLocaleTimeString('en-ZA');
  const formattedDate = `${date} ${time}`;
  const formattedValue = new Intl.NumberFormat().format(value);
  const FormattDifferencePercent = (val) => {
    const newVal = (val * 100).toFixed(1);
    return (Math.abs(newVal));
  };
  const nFormatter = (num, digits) => {
    const newVal = (num).toFixed(digits);
    return (Math.abs(newVal));
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
      title={name}
      extra={<Text strong type="secondary">{formattedDate}</Text>}
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
              {differenceYesterdayPct === 0 && (<MinusOutlined />)}
              <span>
                {nFormatter(differenceYesterdayVal, 3)}
              </span>
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
          <Title
            className={styles.percentageTitle}
            level={3}
            type={lastWeekComparison}
          >
            <Space>
              {differenceLastWeekPct < 0 && (<ArrowDownOutlined />)}
              {differenceLastWeekPct > 0 && (<ArrowUpOutlined />)}
              {differenceLastWeekPct === 0 && (<MinusOutlined />)}
              <span>
                {nFormatter(differenceLastWeekVal, 3)}
              </span>
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
};

export default ReportCard;
