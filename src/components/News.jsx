import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNews.Api';
import { useGetCryptosQuery } from '../services/cryptoAPI';
import Loader from './Loader';
const { Text, Title } = Typography;
const { Option } = Select;
const demoImage =
  'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {
  const { data } = useGetCryptosQuery(100);
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: newsCategory,
    count: simplified ? 6 : 12,
  });

  if (!cryptoNews?.value) return <Loader />;
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => {
              return (
                option.children.toLowerCase().indexOf(input.toLowerCase()) > 0
              );
            }}
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => {
              return (
                <Option value={coin.name} key={coin.name}>
                  {coin.name}
                </Option>
              );
            })}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, index) => {
        return (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel=" noreferrer">
                <div className="news-image-container">
                  <Title
                    className="news-title"
                    level={4}
                    style={{ maxWidth: '150px' }}
                  >
                    {news.name.length > 10
                      ? `${news.name.substring(0, 40)}...`
                      : news.name}
                  </Title>
                  <img
                    style={{ width: '100px', height: '100px' }}
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="newsImage"
                  />
                </div>
                <p>
                  {news.description.length > 150
                    ? `${news.description.substring(0, 150)}... Read more`
                    : news.description}
                </p>
                <div
                  className="provider-container"
                  style={{
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <Avatar
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                    />
                    <Text className="provider-name">
                      {news.provider[0].name}
                    </Text>
                  </div>
                  <div>
                    <Text>
                      {moment(news?.datePublished).startOf('day').fromNow()}
                    </Text>
                  </div>
                </div>
              </a>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default News;
