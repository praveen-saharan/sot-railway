// import React, { useState } from 'react';
// import { FaFileUpload, FaUsers, FaFileInvoice } from 'react-icons/fa'; // Import icons
// import { Layout, Button, Modal, Upload, message, Spin } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const { Header, Content, Sider } = Layout;

// const AdminHome = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [fileList, setFileList] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   // Handle modal close
//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   // Handle file upload change
//   const handleChange = (info) => {
//     setFileList(info.fileList);
//   };

//   // Handle file upload and make the POST request
//   const handleUpload = async () => {
//     if (fileList.length === 0) {
//       message.error('Please select a CSV file to upload.');
//       return;
//     }

//     setIsLoading(true); // Start loading

//     const formData = new FormData();
//     formData.append('file', fileList[0].originFileObj); // Append the file

//     try {
//       const response = await axios.post('http://localhost:8080/api/trainstations/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data', 
//         },
//       });

//       if (response.status === 200) {
//         message.success('File uploaded successfully!');
//         setIsModalVisible(false); // Close the modal on success
//         setFileList([]); // Reset file list
//       }
//     } catch (error) {
//       message.error('File upload failed. Please try again.');
//     } finally {
//       setIsLoading(false); // Stop loading
//     }
//   };

//   return (
//     <Layout style={{ minHeight: '100vh' }} className="bg-gray-100">
//       <Content className="pt-24 px-8 bg-gray-100">
//         <div className="text-center py-8">
//           <h2 className="text-3xl font-semibold text-gray-800">Welcome, Admin!</h2>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//           {/* Upload CSV Button */}
//           <div className="bg-white p-8 rounded-lg shadow-xl text-center hover:bg-purple-100 transition-colors">
//             <FaFileUpload className="text-5xl mb-4 text-purple-600" />
//             <button
//               onClick={showModal}
//               size="large"
//               className="text-xl font-medium text-gray-800 border-2 border-purple-200 p-2 rounded-lg"
//             >
//               Upload New CSV File
//             </button>
//           </div>

//           {/* Passenger Data Button */}
//           <div className="bg-white p-8 rounded-lg shadow-xl text-center hover:bg-purple-100 transition-colors">
//             <FaUsers className="text-5xl mb-4 text-purple-600" />
//             <Link to="/admin/passenger-list"
//               size="large"
//               className="text-xl font-medium text-gray-800 border-2 border-purple-200 p-2 rounded-lg"
//             >
//               Passenger Data
//             </Link>
//           </div>

//           {/* Financial Reports Button */}
//           <div className="bg-white p-8 rounded-lg shadow-xl text-center hover:bg-purple-100 transition-colors">
//             <FaFileInvoice className="text-5xl mb-4 text-purple-600" />
//             <Link to="/admin/financial-reports"
//               size="large"
//               className="text-xl font-medium text-gray-800 border-2 border-purple-200 p-2 rounded-lg"
//             >
//               Financial Reports
//             </Link>
//           </div>
//         </div>
//       </Content>

//       {/* Modal for CSV Upload */}
//       <Modal
//         title="Upload CSV File"
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         footer={[
//           <Button key="back" onClick={handleCancel} className="bg-gray-500 hover:bg-gray-600 text-white">
//             Cancel
//           </Button>,
//           <Button 
//             key="submit" 
//             type="primary" 
//             onClick={handleUpload} 
//             className="bg-purple-700 hover:bg-purple-800"
//             disabled={isLoading} // Disable button when loading
//           >
//             {isLoading ? <Spin /> : "Upload"} {/* Show spinner if loading */}
//           </Button>,
//         ]}
//       >
//         <Upload
//           accept=".csv"
//           fileList={fileList}
//           onChange={handleChange}
//           beforeUpload={() => false} // Disable automatic upload, we'll handle it manually
//         >
//           <Button icon={<UploadOutlined />} className="bg-purple-700 text-white hover:bg-purple-800">
//             Select CSV File
//           </Button>
//         </Upload>
//       </Modal>
//     </Layout>
//   );
// };

// export default AdminHome;


// import { useState } from "react";
// import { Card, CardContent } from "../../Components/ui/Cards";
// import { Button } from "../../Components/ui/Button";
// import axios from 'axios';
// import { Layout, Modal, Upload, message, Spin } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import { FaFileUpload, FaUsers, FaFileInvoice, FaUser } from 'react-icons/fa';

// import { Link } from 'react-router-dom';
// const AdminHome = () => {
 
//     const [isModalVisible, setIsModalVisible] = useState(false);
//   const [fileList, setFileList] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   // Handle modal close
//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   // Handle file upload change
//   const handleChange = (info) => {
//     setFileList(info.fileList);
//   };

//   // Handle file upload and make the POST request
//   const handleUpload = async () => {
//     if (fileList.length === 0) {
//       message.error('Please select a CSV file to upload.');
//       return;
//     }

//     setIsLoading(true); // Start loading

//     const formData = new FormData();
//     formData.append('file', fileList[0].originFileObj); // Append the file

//     try {
//       const response = await axios.post('http://localhost:8080/api/trainstations/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data', 
//         },
//       });

//       if (response.status === 200) {
//         message.success('File uploaded successfully!');
//         setIsModalVisible(false); // Close the modal on success
//         setFileList([]); // Reset file list
//       }
//     } catch (error) {
//       message.error('File upload failed. Please try again.');
//     } finally {
//       setIsLoading(false); // Stop loading
//     }
//   };
 
//   return (
//     <div className="min-h-screen flex flex-col bg-purple-100">
     
//       <div className="flex flex-col items-center justify-center flex-grow text-center p-6">
//         <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg w-full">
//           <div className="flex flex-col items-center">
//             <div className="w-16 h-16 flex items-center justify-center bg-purple-200 rounded-full">
//               {/* User Icon */}
//               <FaUser className="w-8 h-8 text-purple-700" />
//             </div>
//             <h1 className="text-2xl font-bold mt-4">Welcome, Admin</h1>
//             <p className="text-gray-600 mt-1">What would you like to do today?</p>
//           </div>
//         </div>
 
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//           <Card>
//             <CardContent>
//               {/* Upload Icon */}
//               <svg
//                 className="w-12 h-12 text-purple-700"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a4 4 0 004 4h8a4 4 0 004-4v-1m-4-6l-4-4m0 0l-4 4m4-4v12"></path>
//               </svg>
//               <h2 className="text-lg font-semibold mt-4">Upload new CSV file</h2>
//               <Button oonClick={showModal}>Upload</Button>
//             </CardContent>
//           </Card>
 
//           <Card>
//             <CardContent>
//               <FaUsers className="w-12 h-12 text-purple-700" />
//               <h2 className="text-lg font-semibold mt-4">Passenger Data</h2>
              
//               <Link to="/admin/passenger-list" size="large" className="text-xl font-medium text-gray-800 border-2 border-purple-200 p-2 rounded-lg">
//                 View Data
//               </Link>
              
//             </CardContent>
//           </Card>
 
//           <Card>
//             <CardContent>
//               {/* Financial Reports Icon */}
//               <FaFileInvoice className="w-12 h-12 text-purple-700" />
//               <h2 className="text-lg font-semibold mt-4">Financial Reports</h2>
//               <Link to="/admin/financial-reports" size="large" className="text-xl font-medium text-gray-800 border-2 border-purple-200 p-2 rounded-lg">
//                 View Report
//               </Link>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
  
 
  
//             <Modal
//         title="Upload CSV File"
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         footer={[
//           <Button key="back" onClick={handleCancel} className="bg-gray-500 hover:bg-gray-600 text-white">
//             Cancel
//           </Button>,
//           <Button 
//             key="submit" 
//             type="primary" 
//             onClick={handleUpload} 
//             className="bg-purple-700 hover:bg-purple-800"
//             disabled={isLoading} // Disable button when loading
//           >
//             {isLoading ? <Spin /> : "Upload"} {/* Show spinner if loading */}
//           </Button>,
//         ]}
//       >
//         <Upload
//           accept=".csv"
//           fileList={fileList}
//           onChange={handleChange}
//           beforeUpload={() => false} // Disable automatic upload, we'll handle it manually
//         >
//           <Button icon={<UploadOutlined />} className="bg-purple-700 text-white hover:bg-purple-800">
//             Select CSV File
//           </Button>
//         </Upload>
//       </Modal>
  
//     </div>
//   );
// };
 
// export default AdminHome;


import { useState } from "react";
import { Card, CardContent } from "../../Components/ui/Cards";
import { Button } from "../../Components/ui/Button";
import axios from "axios";
import { Layout, Modal, Upload, message, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FaFileUpload, FaUsers, FaFileInvoice, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminHome = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Show modal
  const showModal = () => setIsModalVisible(true);

  // Close modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setFileList([]); // Reset file list when closing
  };

  // Handle file selection
  const handleChange = ({ fileList }) => setFileList(fileList);

  // Handle file upload
  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.error("Please select a CSV file to upload.");
      return;
    }

    setIsLoading(true); // Start loading
    const formData = new FormData();
    formData.append("file", fileList[0].originFileObj);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/trainstations/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        message.success("File uploaded successfully!");
        handleCancel(); // Close modal on success
      }
    } catch (error) {
      message.error("File upload failed. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-purple-100">
      <div className="flex flex-col items-center justify-center flex-grow text-center p-6">
        {/* Admin Welcome Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg w-full">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center bg-purple-200 rounded-full">
              <FaUser className="w-8 h-8 text-purple-700" />
            </div>
            <h1 className="text-2xl font-bold mt-4">Welcome, Admin</h1>
            <p className="text-gray-600 mt-1">What would you like to do today?</p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Upload CSV Card */}
          <Card>
            <CardContent>
              <FaFileUpload className="w-12 h-12 text-purple-700" />
              <h2 className="text-lg font-semibold mt-4">Upload new CSV file</h2>
              <Button onClick={showModal}>Upload</Button>
            </CardContent>
          </Card>

          {/* Passenger Data Card */}
          <Card>
            <CardContent className="">
              <FaUsers className="w-12 h-12 text-purple-700" />
              <h2 className="text-lg font-semibold mt-4">Passenger Data</h2>
              <Link
                to="/admin/passenger-list"
                className="text-xl font-medium text-gray-800 border-2 border-purple-200 p-2 rounded-lg hover:bg-purple-100 transition-colors"
              >
                View Data
              </Link>
            </CardContent>
          </Card>

          {/* Financial Reports Card */}
          <Card>
            <CardContent>
              <FaFileInvoice className="w-12 h-12 text-purple-700" />
              <h2 className="text-lg font-semibold mt-4">Financial Reports</h2>
              <Link
                to="/admin/financial-reports"
                className="text-xl font-medium text-gray-800 border-2 border-purple-200 p-2 rounded-lg hover:bg-purple-100 transition-colors"
              >
                View Report
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upload Modal */}
      {/* <Modal
        title="Upload CSV File"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel} className="bg-gray-500 hover:bg-gray-600 text-white">
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleUpload}
            className="bg-purple-700 hover:bg-purple-800"
            disabled={isLoading}
          >
            {isLoading ? <Spin /> : "Upload"}
          </Button>,
        ]}
      >
        <Upload
          accept=".csv"
          fileList={fileList}
          onChange={handleChange}
          beforeUpload={() => false} // Prevent auto-upload
        >
          <Button icon={<UploadOutlined />} className="bg-purple-700 text-white hover:bg-purple-800">
            Select CSV File
          </Button>
        </Upload>
      </Modal> */}
                  <Modal
        title="Upload CSV File"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel} className="bg-red-500 rounded-md p-1 hover:bg-red-400 text-white mr-2">
            Cancel
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={handleUpload} 
            className="bg-black rounded-md p-1 hover:bg-gray-600 text-white"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? <Spin /> : "Upload"} {/* Show spinner if loading */}
          </Button>,
        ]}
      >
        <Upload
          accept=".csv"
          fileList={fileList}
          onChange={handleChange}
          beforeUpload={() => false} // Disable automatic upload, we'll handle it manually
        >
          <Button icon={<UploadOutlined />} className="text-black bg-purple-100 hover:bg-purple-200 rounded-lg p-2">
            Select CSV File
          </Button>
        </Upload>
      </Modal>
    </div>
  );
};

export default AdminHome;
