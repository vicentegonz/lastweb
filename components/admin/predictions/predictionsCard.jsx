import {
  string, number, arrayOf,
} from 'prop-types';

import {
  Typography, Card, Space, Row, Col, Divider,
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
        className={styles.leftAligned}
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

      <Col span={10} className={styles.verticallyCentered}>
        <Text strong className={`${styles.highlightedBig} ${styles.leftAligned}`}>{description}</Text>
      </Col>

      <Col>
        <Divider type="vertical" className={styles.fullHeight} />
      </Col>

      <Col span={12} className={styles.verticallyCentered}>
        <Row>
          <Space wrap className={styles.leftAligned}>
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
  productId: number.isRequired,
  description: string.isRequired,
  date: string.isRequired,
  days: number.isRequired,
  prediction: arrayOf(number).isRequired,
};

export default PredictionCard;
