import { ResponsiveLine } from '@nivo/line';
import {
  string, arrayOf, number, shape, objectOf,
} from 'prop-types';

import styles from '@/components/admin/predictions/predictions.module.scss';

const PredictionLineChart = ({ chartData, chartRange }) => (
  <ResponsiveLine
    data={chartData}
    margin={{
      top: 20, right: 110, bottom: 90, left: 60,
    }}
    xScale={{ type: 'point' }}
    yScale={{
      type: 'linear', min: 0, max: 'auto',
    }}
    pointSize={12}
    colors="#0d72ba"
    pointBorderWidth={3}
    pointBorderColor={{ from: 'serieColor' }}
    lineWidth={3}
    theme={{ fontSize: 15 }}
    useMesh
    animate
    motionStiffness={90}
    motionDamping={15}
    tooltip={(point) => (
      <div className={styles.tooltipBox}>
        <div>
          {`Esperado: ${point.point.data.y}`}
        </div>
        <div>
          {`Rango posible: ${chartRange[point.point.data.x][0]} - ${chartRange[point.point.data.x][1]}`}
        </div>
      </div>
    )}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      format: (value) => value.slice(5).replace('-', '/'),
    }}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

PredictionLineChart.propTypes = {
  chartData: arrayOf(shape({
    id: string,
    data: arrayOf(shape({
      x: string,
      y: number,
    })),
  })).isRequired,
  chartRange: objectOf(arrayOf(number)).isRequired,
};

export default PredictionLineChart;
