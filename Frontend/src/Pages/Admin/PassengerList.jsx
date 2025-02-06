


import React, { useState, useEffect } from 'react';
import { Layout, Input, Button, Table, Pagination, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FaFileUpload, FaUsers, FaFileInvoice, FaUser } from "react-icons/fa";
// import PassengerCharts from '../../Components/PassengerCharts';

const { Content, Sider } = Layout;

const PassengerList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ name: '', trainStation: '' });
  const [passengerData, setPassengerData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPassenger, setSelectedPassenger] = useState(null);


  const pageSize = 10;
 
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://optical-wall-450106-p9.an.r.appspot.com/api/transactions/all-transactions');
        const data = await response.json();
        setPassengerData(data);
      } catch (error) {
        console.error('Error fetching passenger data:', error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { title: 'Transaction ID', dataIndex: 'transactionId', key: 'transactionId' },
    { title: 'Passenger Name', dataIndex: 'userFirstname', key: 'userFirstname' },
    { title: 'Payment Method', dataIndex: 'modeOfPayment', key: 'modeOfPayment' },
    { title: 'Destination', dataIndex: 'destinationName', key: 'destinationName' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (text) => `¥${text}` },
    { title: 'Transaction Time', dataIndex: 'transactionDateTime', key: 'transactionDateTime',
      render: (text) => format(new Date(text), 'yyyy-MM-dd HH:mm:ss')
    },
    { title: 'Train Station ID', dataIndex: 'trainStationId', key: 'trainStationId' },
  ];

  const filteredData = passengerData.filter(passenger => 
    (passenger.userFirstname.toLowerCase().includes(filters.name.toLowerCase()) || 
     passenger.userLastname.toLowerCase().includes(filters.name.toLowerCase())) &&
    (passenger.destinationName.toLowerCase().includes(filters.trainStation.toLowerCase()))
  );
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);



  const showPassengerDetails = (passenger) => {
    setSelectedPassenger(passenger);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout className="min-h-screen flex mt-16">
      {/* Sidebar */}
      <Sider
      width={250}
      className={`bg-purple-900 text-white fixed h-full z-20 transition-all duration-300`}
    
    >
      <div className="p-6 text-center font-bold text-xl border-b border-gray-600 bg-purple-950">
        Admin Panel
      </div>
      <nav className="p-6">
        <ul className="space-y-6">
          <li className="flex items-center space-x-4">
            <Link to="/admin" className="block text-lg hover:text-purple-300 flex">
              <FaUser  className='mt-1' />
            <span className="text-lg ml-1">Home</span>
            </Link>
          </li>
          <li className="flex items-center space-x-4">
            <Link to="/admin/passenger-list" className="block text-lg hover:text-purple-300 flex">
              <FaUsers className='mt-1' />
              <span className="text-lg ml-1">Passenger Data</span>
            </Link>
          </li>
          <li className="flex items-center space-x-4">
            <Link to="/admin/financial-reports" className="block text-lg hover:text-purple-300 flex">
              <FaFileInvoice className='mt-1' />
              <span className="text-lg ml-1">Financial Report</span>
            </Link>
          </li>
        </ul>
      </nav>
    </Sider>
      

      {/* Main Content */}
      <Layout className="ml-[250px] w-full p-6">
        <Content className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Passenger List</h2>
          
          {/* Filter Section */}
          <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
            <Input
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
              placeholder="Search by Name"
              className="w-full md:w-1/3"
            />
            <Input
              value={filters.trainStation}
              onChange={(e) => setFilters({ ...filters, trainStation: e.target.value })}
              placeholder="Filter by Destination"
              className="w-full md:w-1/3"
            />
            <Button type="primary" className="bg-purple-700 hover:bg-purple-800 w-full md:w-auto">
              Apply Filter
            </Button>
          </div>

          {/* Table Section */}
          <Table
            columns={columns}
            // dataSource={filteredData}
            dataSource={paginatedData}
            pagination={false}
            rowKey="transactionId"
            className="overflow-x-auto cursor-pointer"
            onRow={(record) => ({
              onClick: () => showPassengerDetails(record),
            })}
            rowClassName="cursor-pointer hover:bg-purple-200"
          />

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <Pagination


              current={currentPage}
              total={filteredData.length}
              pageSize={pageSize}
              onChange={setCurrentPage}
            />
          </div>
        </Content>
      </Layout>

      {/* Modal for Passenger Details */}
      <Modal
        title="Passenger Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedPassenger && (
          <div className="space-y-4">
          {/* Transaction ID */}
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
            <p className="text-sm font-semibold text-gray-700"><strong>Transaction ID:</strong> <span className="text-purple-700">{selectedPassenger.transactionId}</span></p>
          </div>

          {/* Name */}
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <p className="text-sm font-semibold text-gray-700"><strong>Name:</strong> <span className="text-purple-700">{`${selectedPassenger.userFirstname.toUpperCase()} ${selectedPassenger.userLastname.toUpperCase()}`}</span></p>
          </div>

          {/* Payment Method */}
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
            <p className="text-sm font-semibold text-gray-700"><strong>Payment Method:</strong> <span className="text-purple-700">{selectedPassenger.modeOfPayment}</span></p>
          </div>

          {/* Destination */}
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <p className="text-sm font-semibold text-gray-700"><strong>Destination:</strong> <span className="text-purple-700">{selectedPassenger.destinationName}</span></p>
          </div>

          {/* Amount */}
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
            <p className="text-sm font-semibold text-gray-700"><strong>Amount:</strong> <span className="text-purple-700">¥{selectedPassenger.amount}</span></p>
          </div>

          {/* Transaction Time */}
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <p className="text-sm font-semibold text-gray-700"><strong>Transaction Time:</strong> <span className="text-purple-700">{format(new Date(selectedPassenger.transactionDateTime), 'yyyy-MM-dd HH:mm:ss')}</span></p>
          </div>

          {/* Train Station ID */}
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
            <p className="text-sm font-semibold text-gray-700"><strong>Train Station ID:</strong> <span className="text-purple-700">{selectedPassenger.trainStationId}</span></p>
          </div>

          {/* Card Number */}
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <p className="text-sm font-semibold text-gray-700"><strong>Card No.:</strong> <span className="text-purple-700">**** **** **** {selectedPassenger.cardNumber.slice(-4)}</span></p>
          </div>
        </div>      
        )}
      </Modal>
    </Layout>
  );
};

export default PassengerList;
