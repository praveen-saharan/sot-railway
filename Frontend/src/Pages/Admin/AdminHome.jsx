

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
        "https://optical-wall-450106-p9.an.r.appspot.com/api/trainstations/upload",
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
