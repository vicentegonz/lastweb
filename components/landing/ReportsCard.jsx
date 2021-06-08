import {
  string, number,
} from 'prop-types';

import {
  Typography, Card, Space, Row, Col,
} from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';

import styles from '@/styles/landing.module.scss';

const { Title, Text } = Typography;

const ReportCard = ({ name, value, createdAt }) => {
  const timestamp = parseInt(createdAt, 10);
  const date = new Date(timestamp * 1000).toLocaleDateString();
  const time = new Date(timestamp * 1000).toLocaleTimeString();
  const formattedDate = `${date} ${time}`;
  const formattedValue = new Intl.NumberFormat().format(value);

  return (
    <Card
      title={name}
      extra={<Text strong type="secondary">{formattedDate}</Text>}
    >
      <Title type="success">{`$ ${formattedValue}`}</Title>

      <Row justify="space-between">

        <Col>
          <Title className={styles.percentageTitle} level={3} type="danger">
            <Space>
              <ArrowDownOutlined />
              25%
            </Space>
          </Title>
          <Text className={styles.sinceText} strong type="secondary">Desde ayer</Text>
        </Col>

        <Col>
          <Title className={styles.percentageTitle} level={3} type="danger">
            <Space>
              <ArrowDownOutlined />
              10%
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
};

export default ReportCard;
