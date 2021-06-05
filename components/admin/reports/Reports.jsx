import {
  Row, Col, Typography, Divider, DatePicker, Space, Card,
} from 'antd';

import DummyChart from './DummyChart.jsx';
import { dummyChartIndex, dummyChartKeys, dummyChartData } from './dummyChartData.jsx';

import reportsStyles from './Reports.module.scss';

const { Title } = Typography;

const AdminReports = () => (
  <div>

    <Row justify="space-between">

      <Col>
        <Title level={2}>
          Reportes
        </Title>
      </Col>
      <Col span={4}>
        <DatePicker className={reportsStyles.fatherWidth} placeholder="Seleccione una fecha" format="DD/MM/YYYY" />
      </Col>
    </Row>

    <div>
      <Divider className={reportsStyles.dividerA} />
    </div>

    <Row gutter={32}>
      <Col span={10}>
        <Space direction="vertical" size="large" className={reportsStyles.fatherWidth}>
          <Row justify="space-around">

            <Col span={10}>
              <Card
                title={(
                  <div>
                    <div>Total donuts</div>
                    <div>vendidas</div>
                  </div>
                )}
                className={reportsStyles.foodCard}
              >
                <Title type="success">628</Title>
              </Card>
            </Col>

            <Col span={10}>
              <Card
                title={(
                  <div>
                    <div>Total sandwichs</div>
                    <div>vendidos</div>
                  </div>
                )}
                className={reportsStyles.foodCard}
              >
                <Title type="success">825</Title>
              </Card>
            </Col>

          </Row>

          <Row justify="space-around">

            <Col span={10}>
              <Card
                title={(
                  <div>
                    <div>Total hot dogs</div>
                    <div>vendidos</div>
                  </div>
                )}
                className={reportsStyles.foodCard}
              >
                <Title type="success">434</Title>
              </Card>
            </Col>

            <Col span={10}>
              <Card
                title={(
                  <div>
                    <div>Total burgers</div>
                    <div>vendidas</div>
                  </div>
                )}
                className={reportsStyles.foodCard}
              >
                <Title type="success">505</Title>
              </Card>
            </Col>

          </Row>

          <Row justify="space-around">
            <Col span={10}>
              <Card
                title={(
                  <div>
                    <div>Total papas fritas</div>
                    <div>vendidas</div>
                  </div>
                )}
                className={reportsStyles.foodCard}
              >
                <Title type="success">580</Title>
              </Card>
            </Col>

            <Col span={10}>
              <Card
                title={(
                  <div>
                    <div>Total bebidas</div>
                    <div>vendidas</div>
                  </div>
                )}
                className={reportsStyles.foodCard}
              >
                <Title type="success">628</Title>
              </Card>
            </Col>

          </Row>

        </Space>
      </Col>
      <Col span={14} className={reportsStyles.barChartSize}>
        <DummyChart
          chartIndex={dummyChartIndex}
          chartKeys={dummyChartKeys}
          chartData={dummyChartData}
        />
      </Col>
    </Row>

  </div>
);

export default AdminReports;
