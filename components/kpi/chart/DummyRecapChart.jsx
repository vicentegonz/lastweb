import { ResponsiveBar } from '@nivo/bar';
import {
  string, arrayOf, number, shape,
} from 'prop-types';

const formatChartData = (chartData) => {
  const formattedChartData = [];
  const halfwayChartData = {};

  chartData.forEach((kpiData) => {
    if (!Object.keys(halfwayChartData).includes(kpiData.date)) {
      halfwayChartData[kpiData.date] = {};
    }
    halfwayChartData[kpiData.date][kpiData.name] = kpiData.value;
  });

  Object.entries(halfwayChartData).forEach((chartGroupData) => {
    const [timestamp, kpiValues] = chartGroupData;
    const formattedDate = new Date(timestamp).toLocaleDateString('en-ZA', { day: 'numeric', month: 'numeric' });

    const formattedChartGroup = { ...{ date: formattedDate }, ...kpiValues };
    formattedChartData.push(formattedChartGroup);
  });

  return formattedChartData;
};

const DummyRecapChart = ({ chartData }) => {
  const formattedChartData = formatChartData(chartData);

  return (
    <ResponsiveBar
      indexBy="date"
      keys={[...new Set(chartData.map((item) => item.name))]}
      data={formattedChartData}
      margin={{
        top: 50, right: 130, bottom: 50, left: 100,
      }}
      padding={0.3}
      groupMode="grouped"
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'nivo' }}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      theme={{ fontSize: 15 }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Fecha',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Monto',
        legendPosition: 'middle',
        legendOffset: -90,
        format: (value) => `$ ${Number(value).toLocaleString()}`,
      }}
      tooltipFormat={(value) => `$ ${Number(value).toLocaleString()}`}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      animate
      motionStiffness={90}
      motionDamping={15}
    />
  );
};

DummyRecapChart.propTypes = {
  chartData: arrayOf(shape({
    id: number,
    name: string,
    value: number,
    date: string,
  })).isRequired,
};

export default DummyRecapChart;
