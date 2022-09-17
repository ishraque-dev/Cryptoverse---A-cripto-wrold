import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoAPI';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';
const { Title } = Typography;

const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  if (isFetching) return <Loader />;

  return (
    <div>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Crypto Currencies"
            value={globalStats.total}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>

      <div className="home-heading-container">
        <Title level={3} className="home-title">
          Top 10 Crypto Currencies in the world
        </Title>
        <h5 className="show-more">
          <Link to="./cryptocurrencies">Show more</Link>
        </h5>
      </div>
      <Cryptocurrencies simplified={true} />

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto Currencies News
        </Title>
        <h5 className="show-more">
          <Link to="./news">Show more</Link>
        </h5>
      </div>
      <News simplified />
    </div>
  );
};

export default HomePage;
