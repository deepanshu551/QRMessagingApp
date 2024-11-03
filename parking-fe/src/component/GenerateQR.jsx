// QRCodeGenerator.js
import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./GenerateQR.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const QRCodeGenerator = () => {
  const [carId, setCarId] = useState("");
  const [phone, setPhone] = useState("");
  const [showQr, setShowQr] = useState(false);
  const handleGenerate = async () => {
    if (!carId || !phone) {
      toast.error("Please enter both fields");
      return;
    } else {
      try {
        await axios.post(`http://localhost:5000/save-to-db`, {
          carId: carId,
          phone: phone,
        });
        setShowQr(true);
        toast.success("Car saved to our db");
      } catch (error) {
        setShowQr(false);
        toast.error("not able to save car");
      }
    }
  };

  return (
    <div className="qr-generator-container">
      {!showQr ? <h2>Generate QR Code for Your Car</h2>: <h2>QR Generated for <span style={{color:"blue"}}>{carId}</span>. <br/>Please take a print</h2>}
      {!showQr && (
        <div>
          <input
            type="text"
            className="qr-input"
            placeholder="Enter Car ID/Owner Name"
            value={carId}
            onChange={(e) => setCarId(e.target.value)}
          />
          <input
            type="text"
            className="qr-input"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={handleGenerate} className="qr-button">
            Generate QR Code
          </button>
        </div>
      )}

      {showQr && (
        <div className="qr-code">
          <QRCodeCanvas value={`http://localhost:3000/notify/${carId}`} />
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default QRCodeGenerator;
