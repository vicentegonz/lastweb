import {
  string, number,
} from 'prop-types';

import {
  Typography, Card, Space, Row, Col,
} from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, MinusOutlined } from '@ant-design/icons';

import styles from '../landing.module.scss';

const { Title, Text } = Typography;

const ReportCard = ({
  name, value, createdAt, differenceYesterdayPct, differenceLastWeekPct,
  differenceYesterdayVal, differenceLastWeekVal,
}) => {
  const date = new Date(createdAt).toLocaleDateString();
  const time = new Date(createdAt).toLocaleTimeString();
  const formattedDate = `${date} ${time}`;
  const formattedValue = new Intl.NumberFormat().format(value);
  const FormattDifferencePercent = (val) => {
    const newVal = (val * 100).toFixed(1);
    return (Math.abs(newVal));
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
    const Newitem = lookup.slice().reverse().find((item) => num >= item.value);
    return Newitem ? (num / Newitem.value).toFixed(digits).replace(rx, '$1') + Newitem.symbol : '0';
  };
  return (
    <Card
      title={name}
      extra={<Text strong type="secondary">{formattedDate}</Text>}
    >
      <Title type="success">{`$ ${formattedValue}`}</Title>

      <Row justify="space-between">
        {(() => {
          if (differenceYesterdayPct < 0) {
            return (
              <Col>
                <Title className={styles.percentageTitle} level={3} type="danger">
                  <Space>
                    <ArrowDownOutlined />
                    <span>
                      $
                      {nFormatter(differenceYesterdayVal, 1)}
                    </span>
                    <span>
                      (
                      {FormattDifferencePercent(differenceYesterdayPct)}
                      %)
                    </span>
                  </Space>
                </Title>
                <Text className={styles.sinceText} strong type="secondary">Desde ayer</Text>
              </Col>
            );
          } if (differenceYesterdayPct > 0) {
            return (
              <Col>
                <Title className={styles.percentageTitle} level={3} type="success">
                  <Space>
                    <ArrowUpOutlined />
                    <span>
                      $
                      {nFormatter(differenceYesterdayVal, 1)}
                    </span>
                    <span>
                      (
                      {FormattDifferencePercent(differenceYesterdayPct)}
                      %)
                    </span>
                  </Space>
                </Title>
                <Text className={styles.sinceText} strong type="secondary">Desde ayer</Text>
              </Col>
            );
          }
          return (
            <Col>
              <Title className={styles.percentageTitle} level={3} type="secondary">
                <Space>
                  <MinusOutlined />
                  <span>
                    $
                    {nFormatter(differenceYesterdayVal, 1)}
                  </span>
                  <span>
                    (
                    {FormattDifferencePercent(differenceYesterdayPct)}
                    %)
                  </span>
                </Space>
              </Title>
              <Text className={styles.sinceText} strong type="secondary">Desde ayer</Text>
            </Col>
          );
        })()}

        {(() => {
          if (differenceLastWeekPct < 0) {
            return (
              <Col>
                <Title className={styles.percentageTitle} level={3} type="danger">
                  <Space>
                    <ArrowDownOutlined />
                    <span>
                      $
                      {nFormatter(differenceLastWeekVal, 1)}
                    </span>
                    <span>
                      (
                      {FormattDifferencePercent(differenceLastWeekPct)}
                      %)
                    </span>
                  </Space>
                </Title>
                <Text className={styles.sinceText} strong type="secondary">Desde la semana pasada</Text>
              </Col>
            );
          } if (differenceLastWeekPct > 0) {
            return (
              <Col>
                <Title className={styles.percentageTitle} level={3} type="success">
                  <Space>
                    <ArrowUpOutlined />
                    <span>
                      $
                      {nFormatter(differenceLastWeekVal, 1)}
                    </span>
                    <span>
                      (
                      {FormattDifferencePercent(differenceLastWeekPct)}
                      %)
                    </span>
                  </Space>
                </Title>
                <Text className={styles.sinceText} strong type="secondary">Desde la semana pasada</Text>
              </Col>
            );
          }
          return (
            <Col>
              <Title className={styles.percentageTitle} level={3} type="secondary">
                <Space>
                  <MinusOutlined />
                  <span>
                    $
                    {nFormatter(differenceLastWeekVal, 1)}
                  </span>
                  <span>
                    (
                    {FormattDifferencePercent(differenceLastWeekPct)}
                    %)
                  </span>
                </Space>
              </Title>
              <Text className={styles.sinceText} strong type="secondary">Desde la semana pasada</Text>
            </Col>
          );
        })()}

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
