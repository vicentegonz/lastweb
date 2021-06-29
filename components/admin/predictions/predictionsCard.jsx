import {
  string, number, arrayOf,
} from 'prop-types';

import {
  Typography, Card, Space, Row, Col,
} from 'antd';

import styles from './predictions.module.scss';

const { Title, Text } = Typography;

const PredictionCard = ({
  productId, description, date, days, prediction,
}) => (
  <Card
    title={(
      <Title
        level={5}
      >
        Producto #
        {productId}
      </Title>
      )}
    extra={(
      <Text strong type="secondary">{date}</Text>
      )}
    className={styles.predictionCard}
  >

    <Row justify="space-between">

      <Col span={11} className={styles.verticallyCentered}>
        <Text strong className={styles.highlightedBig}>{description}</Text>
      </Col>

      <Col span={11} className={styles.verticallyCentered}>
        <Row>
          <Space wrap>
            En los siguientes
            <Text strong className={styles.highlightedText}>{days}</Text>
            días se espera que se vendan entre
          </Space>
        </Row>

        <Row>
          <Text strong className={styles.highlightedBig}>
            <Space wrap>
              {prediction[0]}
              -
              {prediction[1]}
              unidades
            </Space>
          </Text>
        </Row>
      </Col>

    </Row>
  </Card>
);

PredictionCard.propTypes = {
  productId: string.isRequired,
  description: string.isRequired,
  date: string.isRequired,
  days: number.isRequired,
  prediction: arrayOf(number).isRequired,
};

export default PredictionCard;
