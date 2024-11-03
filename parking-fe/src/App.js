// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QRCodeGenerator from './component/GenerateQR';
import MessageForm from './component/Messageing';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<QRCodeGenerator />} />
        <Route path="/notify/:carId" element={<MessageForm />} />
      </Routes>
    </Router>
  );
};

export default App;
