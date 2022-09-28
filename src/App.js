 
import './App.css';
import { Route, Link, Routes } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import HomePage from './components/HomePage';
import Exchanges from './components/Exchanges';
import Cryptocurrencies from './components/Cryptocurrencies';
import CryptoDetails from './components/CryptoDetails';
import News from './components/News';

import Navbar from './components/Navbar';
function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="/exchanges" element={<Exchanges />} />

              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />

              <Route path="/crypto/:coinId" element={<CryptoDetails />} />

              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>

        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: 'white', textAlign: 'center' }}
          >
            Cryptowall-2022 <br />
          </Typography.Title>
          <p style={{ color: 'gray' }}>All rights reserved</p>

          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Space>
              <Link to="/">Home</Link>
              <Link to="/exchanges">Exchanges</Link>
              <Link to="/news">News</Link>
            </Space>
            <a
              style={{}}
              href="https://ishraque-dev.netlify.app/"
              target="_blank"
              rel=" noreferrer"
            >
              Developed by~ Ishraque
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
