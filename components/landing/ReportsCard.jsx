import {
  string, number,
} from 'prop-types';

import {
  Typography, Card,
} from 'antd';

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
      <Title type="success">{formattedValue}</Title>
    </Card>
  );
};

ReportCard.propTypes = {
  name: string.isRequired,
  value: number.isRequired,
  createdAt: string.isRequired,
};

export default ReportCard;
