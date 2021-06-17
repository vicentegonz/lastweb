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
    halfwayChartData[kpiData.date][kpiData.category] = kpiData.value;
  });

  Object.entries(halfwayChartData).forEach((chartGroupData) => {
    const [timestamp, kpiValues] = chartGroupData;
    let formattedDate = new Date(timestamp);
    formattedDate = new Date(
      formattedDate.getTime() + Math.abs(formattedDate.getTimezoneOffset() * 60000),
    ).toLocaleDateString('en-ZA', { day: 'numeric', month: 'numeric' });

    const formattedChartGroup = { ...{ date: formattedDate }, ...kpiValues };
    formattedChartData.push(formattedChartGroup);
  });

  return formattedChartData;
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

const DummyRecapChart = ({ chartData }) => {
  let unit = '';
  if (chartData[0]) {
    if (chartData[0].units === '$') {
      unit = chartData[0].units;
    }
  }

  const formattedChartData = formatChartData(chartData);

  return (
    <ResponsiveBar
      indexBy="date"
      keys={[...new Set(chartData.map((item) => item.category))]}
      data={formattedChartData}
      margin={{
        top: 50, right: 170, bottom: 50, left: 80,
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
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: (value) => `${unit} ${nFormatter(value, 1)}`,
      }}
      tooltipFormat={(value) => `${unit} ${Number(value).toLocaleString()}`}
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
          itemsSpacing: 1,
          itemWidth: 120,
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
    store: number,
    category: string,
    value: number,
    date: string,
  })).isRequired,
};

export default DummyRecapChart;
