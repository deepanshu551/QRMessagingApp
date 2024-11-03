// MessageForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Messageing.css'; // Import the CSS file

const MessageForm = () => {
  const { carId } = useParams();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e,data) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/send-message/${carId}`, { message:data });
      
      toast.success('Message sent successfully');
      setMessage(''); // Clear the message field after sending
    } catch (error) {
        toast.error("message send failed");
    }
  };

  return (
    <div className="message-form-container">
      <h2>Notify the Car Owner</h2>
      <p>Car ID: {carId}</p>
      {/* <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here"
          className="message-textarea"
          required
        />
        <button type="submit" className="message-button">Send Message</button>
      </form> */}
      <span>select any message</span>
      <ul>
        <li><button onClick={(e)=>handleSubmit(e,"Your car is in wrong parking")}><span>Your car is in wrong parking</span></button></li>
        <li><button onClick={(e)=>handleSubmit(e,"Hello! Your car seems to be parked in an area that may be restricting access for other vehicles. Would you mind moving it when you get a moment? Thanks for helping keep things running smoothly!")}><span>Hello! Your car seems to be parked in an area that may be restricting access for other vehicles. Would you mind moving it when you get a moment? Thanks for helping keep things running smoothly!</span></button></li>
        <li><button onClick={(e)=>handleSubmit(e,`Hey ${carId}, just wanted to let you know that your car is parked in a spot that might be causing a bit of an issue`)}><span>Hey {carId}, just wanted to let you know that your car is parked in a spot that might be causing a bit of an issue</span></button></li>
      </ul>
      <ToastContainer position="top-center" autoClose={3000} />

    </div>
  );
};

export default MessageForm;
