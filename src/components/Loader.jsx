import React from 'react';
import '../App.css';
const Loader = () => {
  return (
    <div style={{ textAlign: 'center', width: '100%', height: '100%' }}>
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
