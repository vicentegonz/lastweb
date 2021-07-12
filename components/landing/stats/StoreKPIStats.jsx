/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectStoreStats } from '@/store/storeStats/storeStatsReducer';
import { selectUser } from '@/store/user/userReducer';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

import { Carousel, Space } from 'antd';

import ReportCard from '@/components/kpi/stats/ReportsCard.jsx';
import styles from '../landing.module.scss';

const NextArrow = ({ currentSlide, slideCount, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <div {...props}>
    <ArrowRightOutlined />
  </div>
);

const PrevArrow = ({ currentSlide, slideCount, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <div {...props}>
    <ArrowLeftOutlined />
  </div>
);

const KPIStats = () => {
  const storeStats = useSelector(selectStoreStats);
  const user = useSelector(selectUser);
  const [cardData, setCardData] = useState([]);
  useEffect(() => {
    if (!user.selectedStore || !storeStats.summaryKPIs[user.selectedStore]
    ) {
      return;
    }
    const finalData = storeStats.summaryKPIs[user.selectedStore];
    setCardData(finalData);
  }, [storeStats.summaryKPIs, user.selectedStore]);

  return (
    <Space direction="vertical" className={styles.parentWidth} size="large">
      <Carousel
        className={styles.landingCarousel}
        arrows
        nextArrow={<NextArrow />}
        prevArrow={<PrevArrow />}
        slidesToShow={2}
        dots={false}
        frameOverflow="invisible"
      >
        {
          cardData.map((item) => (
            <ReportCard
              key={item.name}
              name={item.name}
              value={item.value}
              createdAt={user.dateRange[1]}
              differenceYesterdayPct={item.variationYpercentage}
              differenceLastWeekPct={item.variationLWpercentage}
              differenceYesterdayVal={item.variationYNumber}
              differenceLastWeekVal={item.variationLWNumber}
              category={item.category}
              unit={item.units}
            />
          ))
        }
      </Carousel>
    </Space>
  );
};

export default KPIStats;
