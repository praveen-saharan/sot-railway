import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';  // Import jsPDF
import { Button, Typography, Space, Divider } from 'antd';  // Ant Design components
import { motion } from 'framer-motion';  // Framer Motion
import tick from "../../assets/tick.png";
import { useLocation, useNavigate } from "react-router-dom";
import logo1 from "../../assets/Picture1.png"; 
import QRCode from '../../assets/QR.png';

const { Title, Text } = Typography;

const Ticket = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    amount,
    cardNumber,
    destinationName,
    modeOfPayment,
    source,
    travelTime,
    userFirstname,
    userLastname
  } = state.requestData;
  

  const [arrivalTimeString, setArrivalTimeString] = useState('');
  const [departureTimeString, setDepartureTimeString] = useState('');


    useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [navigate]);

  useEffect(() => {
    const departureTime = new Date();
    departureTime.setMinutes(departureTime.getMinutes());

    setDepartureTimeString(departureTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }));

    const arrivalTime = new Date(departureTime);
    arrivalTime.setMinutes(arrivalTime.getMinutes() + parseInt(travelTime)); // Adjust based on travelTime

    setArrivalTimeString(arrivalTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }));
  }, [travelTime]);

  const downloadPDF = () => {

          var doc = new jsPDF();
          doc.setFillColor(226, 207, 234); 
          doc.rect(0, 0, 210, 297, "F");
          doc.setFillColor(88, 28, 135);
          doc.rect(0, 0, 210, 40, "F");
          doc.setFontSize(22);
          doc.setTextColor(255, 255, 255);
          doc.setFont("helvetica", "bold");
          doc.text("Booking Confirmation", 105, 25, { align: "center" });

          doc.addImage(logo1, "PNG", 10, 7.5, 25, 25);
          doc.setFontSize(14);
          doc.setTextColor(40, 40, 40);
          doc.setFont("helvetica", "normal");
          doc.text("Passenger Name:", 20, 55);
          doc.setFont("helvetica", "bold");
          doc.text(`${userFirstname.toUpperCase()} ${userLastname.toUpperCase()}`, 80, 55);
          
          doc.setFont("helvetica", "normal");
          doc.text("Booked On:", 20, 65);
          doc.setFont("helvetica", "bold");
          doc.text(`Booked On: ${new Date().toLocaleString()}`, 80, 65);
          doc.setFont("helvetica", "normal");
          doc.text("From:", 20, 80);
          doc.setFont("helvetica", "bold");
          doc.text(`${source || "Tokyo"}`, 80, 80);
          
          doc.setFont("helvetica", "normal");
          doc.text("To:", 20, 90);
          doc.setFont("helvetica", "bold");
          doc.text(`${destinationName}`, 80, 90);
          
          doc.setFont("helvetica", "normal");
          doc.text("Departure:", 20, 100);
          doc.setFont("helvetica", "bold");
          doc.text(`${departureTimeString}`, 80, 100);
          
          doc.setFont("helvetica", "normal");
          doc.text("Arrival:", 20, 110);
          doc.setFont("helvetica", "bold");
          doc.text(`${arrivalTimeString}`, 80, 110);
          
          doc.setDrawColor(200, 200, 200);
          doc.line(20, 120, 190, 120);
          
          doc.setFontSize(16);
          doc.setTextColor(0, 102, 204);
          doc.setFont("helvetica", "bold");
          doc.text("Payment Summary", 20, 135);
          
          doc.setFontSize(14);
          doc.setTextColor(40, 40, 40);
          doc.setFont("helvetica", "normal");
          
          doc.text("Fare:", 20, 150);
          doc.setFont("helvetica", "bold");
          doc.text(`${amount.toFixed(2)}`, 190, 150, { align: "right" });
          
          doc.setFont("helvetica", "normal");
          doc.text("Mode of Payment:", 20, 160);
          doc.setFont("helvetica", "bold");
          doc.text(`${modeOfPayment}`, 190, 160, { align: "right" });
          
          doc.setFont("helvetica", "normal");
          doc.text("Card Number:", 20, 170);
          doc.setFont("helvetica", "bold");
          doc.text(`**** **** **** ${cardNumber.toString().slice(-4)}`, 190, 170, { align: "right" });
            doc.addImage(QRCode, "PNG", 85, 190, 40, 40);
            doc.setFontSize(16);
            doc.setTextColor(0, 153, 76);
            doc.setFont("helvetica", "bold");
            doc.text("Thank you for choosing SoT Railways!", 105, 240, { align: "center" });
    
            doc.setFontSize(12);
            doc.setTextColor(100, 100, 100);
            doc.setFont("helvetica", "italic");
            doc.text("Safe travels and happy journey!", 105, 250, { align: "center" });
    
            doc.save("booking_invoice.pdf");
    
    
    
  };

  return (
    <div className="min-h-screen bg-[#E2CFEA] py-10">
     

      <motion.div 
        className="max-w-2xl mx-auto mt-16 py-3 rounded-lg shadow-xl bg-gradient-to-r from-blue-100 via-white to-blue-100"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8 }}
      >
        {/* Success Tick Image */}
        <div className="flex justify-center mb-8">
          <img src={tick} alt="Ticket Confirmed" className="w-32 h-32" />
        </div>

        {/* Main Heading */}
        <Title level={2} className="text-center text-green-600 mb-6">
          Hurray! Your Ticket has been confirmed
        </Title>

        {/* Booking Details */}
        <div className="space-y-4">
          <Space direction="vertical" size="large">
            <div className="flex justify-between">
              <Text strong>Name:</Text>
              <Text>{`${userFirstname} ${userLastname}`}</Text>
            </div>
            <div className="flex justify-between">
              <Text strong>Source:</Text>
              <Text>{source || "Tokyo"} - {departureTimeString}</Text>
              </div>
            <div className="flex justify-between">
              <Text strong>Destination:</Text>
              <Text>{destinationName} - {arrivalTimeString}</Text>
            </div>
            <div className="flex justify-between">
              <Text strong>Fare Amount:</Text>
              <Text>¥‎{amount}</Text>
            </div>
            <div className="flex justify-between">
              <Text strong>Mode of Payment:</Text>
              <Text>{modeOfPayment}</Text>
            </div>
            <div className="flex justify-between">
              <Text strong>Card Number:</Text>
              <Text>**** **** **** {cardNumber.toString().slice(-4)}</Text>
            </div>
            <div className="flex justify-between">
              <Text strong>Booking Time:</Text>
              <Text>{new Date().toLocaleString()}</Text>
            </div>
          </Space>
        </div>

        {/* Divider for Visual Separation */}
        <Divider />

        {/* Instructions */}
        <div className="mt-8">
          <Text className="text-lg text-center text-gray-600">
            Thanks for choosing SoT Railways. Happy Journey!
          </Text>
        </div>

        {/* Download Button */}
        <div className="flex justify-center my-6">
          <Button 
            type="primary" 
            size="large" 
            icon={<i className="fas fa-download"></i>} 
            onClick={downloadPDF}
            className="w-full md:w-1/4 text-lg bg-purple-700 hover:bg-purple-800"
          >
            Download PDF
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Ticket;

