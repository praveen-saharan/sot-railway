import logo from "../../assets/account-benefits 1.png";
import React, { useState, useEffect } from "react";
import { Button, Card as Card1, Divider, Modal, Input, Radio, notification } from "antd";
import { DollarOutlined, CreditCardOutlined, CalendarOutlined, CloseCircleOutlined, CheckOutlined } from "@ant-design/icons";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'; 
import LoadingScreen from "../Loading";

const Booking = () => {
  const { state } = useLocation();
  const { firstName, lastName, destination, stopNumber, fareAmount, duration: travelTime, 
    sourceStation:source, id } = state;
  const navigate = useNavigate();
  

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [arrivalTime, setArrivalTime] = useState(""); 
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    focused: ""
  });

  // Base fare calculation
  const baseFare = (fareAmount / 1.1).toFixed(2); 

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
    
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);

    const departureTime = new Date();
    departureTime.setMinutes(departureTime.getMinutes() + parseInt(travelTime));
    
    const arrivalTimeString = departureTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    setArrivalTime(arrivalTimeString);
  }, [travelTime]);
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleProceedToPayment = () => {
    if (paymentMethod) {
      setIsPopupVisible(true);
    } else {
      notification.error({
        message: "Payment Method Missing",
        description: "Please select a payment method before proceeding.",
      });
    }
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
      focused: name === "cvc" ? "cvc" : formData.focused,
    });
  };

  const handleInputFocus = ({ target }) => {
    setFormData({ ...formData, focused: target.name });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Check for required fields
    if (!formData.cardNumber || !formData.expiry || !formData.cvc) {
      notification.error({
        message: "Missing Card Information",
        description: "Please complete all card details before proceeding.",
      });
      return;
    }
    
    // Check if the card number length is between 12 and 19 digits
    const cardNumberLength = formData.cardNumber.replace(/\D/g, '').length; // Removes any non-digit characters
    if (cardNumberLength < 12 || cardNumberLength > 19) {
      notification.error({
        message: "Invalid Card Number Length",
        description: "Card number must be between 12 and 19 digits.",
      });
      return;
    }
    
  
    // Data to send in the POST request
    const requestData = {
      modeOfPayment: "Card",
      userFirstname: firstName,
      userLastname: lastName,
      destinationName: destination,
      trainStationId: id,
      amount: fareAmount,
      travelTime,
      source,
      cardNumber: parseInt(formData.cardNumber),
    };
  
    try {
      // Set loading to true before sending request
      setIsLoading(true);
  
      const response = await axios.post(
        "http://localhost:8080/api/transactions/add-transaction",
        requestData
      );
  
      // Log the requestData to console
      console.log(requestData);
  
      // Check if the response status is 200 OK
      if (response.status === 200) {
        console.log("Payment successful:", response.data);
  
        notification.success({
          message: "Payment Success",
          description: "Your payment was successful!",
        });
  
        navigate("/ticket", {
          state: { requestData },
        });
      } else {
        notification.error({
          message: "Payment Failed",
          description: `Unexpected response: ${response.statusText}`,
        });
      }
    } catch (error) {
      console.error("Payment failed:", error);
  
      if (error.response) {
        notification.error({
          message: "Payment Failed",
          description: error.response.data || "An error occurred during the payment process.",
        });
      } else if (error.request) {
        notification.error({
          message: "Payment Failed",
          description: "No response received from the server. Please try again later.",
        });
      } else {
        notification.error({
          message: "Payment Failed",
          description: `Error: ${error.message}`,
        });
      }
    } finally {
      // Set loading to false after request completes
      setIsLoading(false);
  
      // Reset form data and close popup
      setFormData({
        cardNumber: "",
        expiry: "",
        cvc: "",
        focused: "",
      });
      setIsPopupVisible(false);
    }
  };
  
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-[#E2CFEA]">
      <h2 className="text-3xl font-semibold text-[#6247AA] mb-4 text-center mt-16 pt-10">Complete Your Booking</h2>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 min-w-full">
        <div className="flex flex-col gap-6 w-full md:col-span-2 h-full">
          <Card1 className="shadow-lg h-full">
            <Divider />
            <div className="text-[#102B3F] flex items-center gap-2 mb-4">
              <CalendarOutlined /> {currentDate}
            </div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <div className="bg-[#6247AA] w-4 h-4 rounded-full"></div>
                  <p className="text-[#102B3F]">{source}</p>
                  <p className="text-[#102B3F]">{new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}</p>
                </div>
                <div className="h-8 border-l-2 border-dashed border-[#102B3F] ml-2"></div>
                <div className="flex items-center gap-2">
                  <div className="bg-[#A06CD5] w-4 h-4 rounded-full"></div>
                  <p className="text-[#102B3F]">{destination}</p>
                  <p className="text-[#102B3F]">{arrivalTime}</p>
                </div>
              </div>
              <div className="text-[#102B3F]">
                {`${Math.floor(parseInt(travelTime) / 60)} hours ${parseInt(travelTime) % 60} minutes`}
              </div>

              <div className="flex justify-center">
                <img src={logo} alt="Traveler Illustration" />
              </div>
            </div>
          </Card1>
        </div>
        <div className="flex flex-col gap-6 w-full h-full">
          <Card1 className="shadow-lg h-full">
            <h2 className="text-lg font-semibold text-[#6247AA]">Fare Summary</h2>
            <Divider />
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 text-[#102B3F]">
                <DollarOutlined /> Base Fare
              </div>
              <span>¥{baseFare}</span>
            </div>
            <Divider className="my-1" />
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 text-[#102B3F]">
                <DollarOutlined /> Taxes(10%)
              </div>
              <span>¥{(fareAmount - baseFare).toFixed(2)}</span>
            </div>
            <Divider className="my-1" />
            <div className="flex justify-between items-center text-lg font-semibold text-[#062726]">
              <span>Total Amount</span>
              <span>¥{fareAmount}</span>
            </div>
            <Divider />
          </Card1>
        </div>
      </div>

      <div className="flex justify-center w-full">
        <div className="flex flex-col gap-4 w-full md:w-1/3 p-6">
          <Radio.Group
            onChange={handlePaymentMethodChange}
            value={paymentMethod}
            className="flex gap-3 justify-center items-center"
          >
            <Radio value="card" className="flex items-center text-lg font-medium">
              <CreditCardOutlined className="mr-3 text-[#102B3F]" /> Card
            </Radio>
          </Radio.Group>
          <Button
            type="primary"
            className="w-full bg-[#6247AA] hover:bg-[#A06CD5] border-none mt-6 py-3 rounded-md shadow-md text-white text-lg font-medium"
            disabled={!paymentMethod}
            onClick={handleProceedToPayment}
          >
            Proceed to Payment
          </Button>
        </div>
      </div>

      <Modal
  visible={isPopupVisible}
  title="Card Payment"
  onCancel={closePopup}
  footer={null}
  className="payment-modal"
>
  <p className="text-sm text-gray-600">Amount to be paid: ¥{fareAmount}</p>

  {/* Credit Card Form */}
  <form onSubmit={handleSubmit} className="space-y-6">
    <div className="flex flex-col justify-center items-center space-y-4 w-[5/6]">
      {/* Credit Card Preview */}
      <div className="flex justify-center w-full">
        <Card
          number={formData.cardNumber}
          name={firstName.toUpperCase() + " " + lastName.toUpperCase()}
          expiry={formData.expiry}
          cvc={formData.cvc}
          focused={formData.focused}
        />
      </div>

      {/* Card Number Input */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 w-full">
        <Input
          className="border rounded-xl border-gray-300 p-3 w-full text-base placeholder-gray-500"
          type="number"
          name="cardNumber"
          placeholder="Card Number"
          value={formData.cardNumber}
          onChange={handleInputChange}
          required
        />
   
        <Input
          className="border rounded-xl border-gray-300 p-3 w-full text-base placeholder-gray-500"
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={firstName.toUpperCase() + " " + lastName.toUpperCase()}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Expiry & CVC Inputs */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 w-full">
        <Input
          className="border rounded-xl border-gray-300 p-3 w-full text-base placeholder-gray-500"
          type="text"
          name="expiry"
          placeholder="MM/YY"
          value={formData.expiry}
          onChange={handleInputChange}
          required
        />
        <Input
          className="border rounded-xl border-gray-300 p-3 w-full text-base placeholder-gray-500"
          type="text"
          name="cvc"
          placeholder="CVV"
          value={formData.cvc}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          required
        />
      </div>

      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row justify-between gap-2 mt-6 w-full">
        <Button onClick={closePopup} icon={<CloseCircleOutlined />} className="border-none text-gray-700 hover:bg-gray-200 w-full sm:w-auto">
          Cancel
        </Button>
        <Button type="primary" icon={<CheckOutlined />} htmlType="submit" className="bg-[#062726] w-full sm:w-auto">
          Submit
        </Button>
      </div>
    </div>
  </form>
</Modal>


    </div>
  );
};

export default Booking;


// import logo from "../../assets/account-benefits 1.png";
// import React, { useState, useEffect } from "react";
// import Card1 from "./Payment1";
// import { Button, Card, Divider, Modal, Input, Radio } from "antd";
// import {
//   DollarOutlined,
//   CreditCardOutlined,
//   CalendarOutlined,
//   CloseCircleOutlined,
//   CheckOutlined,
// } from "@ant-design/icons";

// const Booking = () => {
//   const [isPopupVisible, setIsPopupVisible] = useState(false);
//   const [currentDate, setCurrentDate] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState(null);
//   const [arrivalTime, setArrivalTime] = useState(""); // State for arrival time

//   const staticData = {
//     totalFare: 550,
//     source: "Tokyo Station",
//     destination: "Yokohama Station",
//     travelTime: "65", // Travel time in minutes 
//   };

//   const baseFare = (staticData.totalFare / 1.1).toFixed(2); // Deducting 10% tax

//   useEffect(() => {
//     // Set Current Date
//     const now = new Date();
//     const formattedDate = now.toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//     setCurrentDate(formattedDate);

//     // Calculate Arrival Time
//     const departureTime = new Date();

//     // Add 65 minutes to the departure time
//     departureTime.setMinutes(departureTime.getMinutes() + parseInt(staticData.travelTime));

//     // Set the final arrival time as a string
//     const arrivalTimeString = departureTime.toLocaleTimeString([], {
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//     setArrivalTime(arrivalTimeString);
//   }, []);

//   const handlePaymentMethodChange = (e) => {
//     setPaymentMethod(e.target.value);
//   };

//   const handleProceedToPayment = () => {
//     if (paymentMethod) {
//       setIsPopupVisible(true);
//     }
//   };

//   const closePopup = () => {
//     setIsPopupVisible(false);
//   };

//   return (
//     <div className="min-h-screen bg-[#E2CFEA]">
//       {/* Header Section */}
//       <header className="bg-[#062726] p-4 flex justify-between items-center">
//         <div className="text-[#E2CFEA] text-xl font-bold">SoT Railways Ticketing System</div>
//         <div className="text-[#E2CFEA] font-semibold">ADMIN</div>
//       </header>
// <Card1/>
//       {/* Main Content */}
//       <h2 className="text-3xl font-semibold text-[#6247AA] mt-6 mb-4 text-center">Complete Your Booking</h2>
//       <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 min-w-full">
//         {/* Booking Section */}
//         <div className="flex flex-col gap-6 w-full md:col-span-2 h-full">
//           <Card className="shadow-lg h-full">
//             <Divider />
//             <div className="text-[#102B3F] flex items-center gap-2 mb-4">
//               <CalendarOutlined /> {currentDate}
//             </div>
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <div className="flex items-center gap-2">
//                   <div className="bg-[#6247AA] w-4 h-4 rounded-full"></div>
//                   <p className="text-[#102B3F]">{staticData.source}</p>
//                   <p className="text-[#102B3F]">{new Date().toLocaleTimeString([], {
//                     hour: '2-digit',
//                     minute: '2-digit',
//                     })}
//                   </p>
//                 </div>
//                 <div className="h-8 border-l-2 border-dashed border-[#102B3F] ml-2"></div>
//                 <div className="flex items-center gap-2">
//                   <div className="bg-[#A06CD5] w-4 h-4 rounded-full"></div>
//                   <p className="text-[#102B3F]">{staticData.destination}</p>
//                   <p className="text-[#102B3F]">{arrivalTime}</p>
//                 </div>
//               </div>
//               <div className="text-[#102B3F]">
//   {`${Math.floor(parseInt(staticData.travelTime) / 60)} hours ${parseInt(staticData.travelTime) % 60} minutes`}
// </div>

//               <div className="flex justify-center">
//                 <img src={logo} alt="Traveler Illustration" />
//               </div>
//             </div>
//           </Card>
//         </div>

//         {/* Fare Summary */}
//         <div className="flex flex-col gap-6 w-full h-full">
//           <Card className="shadow-lg h-full">
//             <h2 className="text-lg font-semibold text-[#6247AA]">Fare Summary</h2>
//             <Divider />
//             <div className="flex justify-between items-center mb-4">
//               <div className="flex items-center gap-2 text-[#102B3F]">
//                 <DollarOutlined /> Base Fare
//               </div>
//               <span>¥{baseFare}</span>
//             </div>
//             <Divider className="my-1" />
//             <div className="flex justify-between items-center mb-4">
//               <div className="flex items-center gap-2 text-[#102B3F]">
//                 <DollarOutlined /> Taxes(10%)
//               </div>
//               <span>¥{(staticData.totalFare - baseFare).toFixed(2)}</span>
//             </div>
//             <Divider className="my-1" />
//             <div className="flex justify-between items-center text-lg font-semibold text-[#062726]">
//               <span>Total Amount</span>
//               <span>¥{staticData.totalFare}</span>
//             </div>
//             <Divider />
//           </Card>
//         </div>
//       </div>

//       {/* Payment Method Section */}
//       <div className="flex justify-center w-full">
//         <div className="flex flex-col gap-4 w-full md:w-1/3 p-6">
//           <Radio.Group
//             onChange={handlePaymentMethodChange}
//             value={paymentMethod}
//             className="flex gap-3 justify-center items-center"
//           >
//             {/* <Radio value="cash" className="flex items-center text-lg font-medium">
//               <DollarOutlined className="mr-3 text-[#102B3F]" /> Cash
//             </Radio> */}
//             <Radio value="card" className="flex items-center text-lg font-medium">
//               <CreditCardOutlined className="mr-3 text-[#102B3F]" /> Card
//             </Radio>
//           </Radio.Group>
//           <Button
//             type="primary"
//             className="w-full bg-[#6247AA] hover:bg-[#A06CD5] border-none mt-6 py-3 rounded-md shadow-md text-white text-lg font-medium"
//             disabled={!paymentMethod}
//             onClick={handleProceedToPayment}
//           >
//             Proceed to Payment
//           </Button>
//         </div>
//       </div>

//       {/* Payment Modal */}
//       <Modal
//         visible={isPopupVisible}
//         title={paymentMethod == "Card Payment"}
//         onCancel={closePopup}
//         footer={null}
//         className="payment-modal"
//       >
//         <p>Amount to be paid: ¥{staticData.totalFare}</p>
       
//           <Input placeholder="Enter Card Details" className="mb-4" />
        
//         <div className="flex justify-end gap-2">
//           <Button onClick={closePopup} icon={<CloseCircleOutlined />} className="border-none">
//             Cancel
//           </Button>
//           <Button type="primary" icon={<CheckOutlined />} className="bg-[#062726]">
//             Submit
//           </Button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default Booking;
