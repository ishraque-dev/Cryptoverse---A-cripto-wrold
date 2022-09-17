import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoAPI';
import Loader from './Loader';
const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const [searchItem, setSearchItem] = useState();
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [notFund, setNotFund] = useState(false);

  // fully functional search system
  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchItem?.toLowerCase())
    );
    setCryptos(filteredData);

    const notFound = filteredData?.filter(
      (item) => item.name.toLowerCase() !== searchItem?.toLowerCase()
    );

    if (filteredData?.length === 0 && notFound && searchItem !== undefined) {
      setNotFund(true);
    } else {
      setNotFund(false);
    }
  }, [cryptosList, searchItem]);

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);
  }, [cryptosList?.data?.coins]);
  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Crypto Currencies"
            onChange={(e) => setSearchItem(e.target.value)}
          />
        </div>
      )}
      <div>{notFund && <h2>No items found!</h2>}</div>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    alt="icon"
                  />
                }
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
