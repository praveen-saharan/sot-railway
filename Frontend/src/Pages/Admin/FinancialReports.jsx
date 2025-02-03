import React, { useState, useEffect } from 'react';
import { Layout, Input, Button, Table, Pagination, message, Modal, DatePicker } from 'antd';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaFileUpload, FaUsers, FaFileInvoice, FaUser } from "react-icons/fa";
import  PassengerCharts from '../../Components/PassengerCharts';
const { Content, Sider } = Layout;

const FinancialReports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ stationName: '' });
  const [financialData, setFinancialData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs()); 
  const [totalEarnings, setTotalEarnings] = useState(0);

  const pageSize = 10;
 


  // Fetch financial data
  const fetchFinancialData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/revenue/calculate-and-save");

      // Sort the data by earnings in descending order (highest earnings first)
      const sortedData = response.data.sort((a, b) => b.earnings - a.earnings);
      const total = sortedData.reduce((sum, station) => sum + station.earnings, 0);
      setTotalEarnings(total);
      
      // Now set the sorted data to state
      setFinancialData(sortedData);
      
    } catch (error) {
      console.error('Error fetching financial data:', error);
      message.error('Error fetching financial data.');
    }
  };

  // Fetch transactions data for a train
  const fetchTransactionData = async () => {
    if (!selectedTrain) return;

    try {
      const response = await axios.get(
        `http://localhost:8080/api/revenue/station/${selectedTrain}/transactions?date=${selectedDate.format('YYYY-MM-DD')}`
      );
      setTransactions(response.data.length > 0 ? response.data : []);
    } catch (error) {
      console.error('Error fetching transaction data:', error);
      message.error('Error fetching transaction data.');
    }
  };

  // Filter and paginate data
  const filteredData = financialData.filter((report) =>
    report.stationName?.toLowerCase().includes(filters.stationName.toLowerCase())
  );
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Handle modal visibility and fetch transactions when a train is selected
  const showModal = (trainId) => {
    setSelectedTrain(trainId);
    setIsModalVisible(true);
  };

  // Handle modal close
  const handleCancel = () => {
    setIsModalVisible(false);
    setTransactions([]); 
    setSelectedTrain(null);
  };

  // Fetch transactions when selectedTrain or selectedDate changes
  useEffect(() => {
    if (isModalVisible && selectedTrain) fetchTransactionData();
  }, [selectedTrain, selectedDate]);

  // Fetch financial data on component mount
  useEffect(() => {
    fetchFinancialData();
  }, []);

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
        <PassengerCharts />
        <Content className="pt-4 px-8">
      
          {/* Filter Section */}
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-semibold text-gray-800">Financial Reports</h2>
            <div className="flex items-center space-x-4">
              <Input
                value={filters.stationName}
                onChange={(e) => setFilters({ ...filters, stationName: e.target.value })}
                placeholder="Search by Station Name"
                className="w-64"
              />
              <Button type="primary" className="bg-purple-700 hover:bg-purple-800" onClick={fetchFinancialData}>
                Apply Filter
              </Button>
            </div>
          </div>

          {/* Table Section */}
          <Table
            columns={[
              { title: 'Train ID', dataIndex: 'trainId', key: 'trainId' },
              { title: 'Station Name', dataIndex: 'stationName', key: 'stationName' },
              { title: 'Earnings (¥)', dataIndex: 'earnings', key: 'earnings' },
              { title: 'Total Passengers', dataIndex: 'totalPassengers', key: 'totalPassengers' },
            ]}
            dataSource={paginatedData}
            pagination={false}
            rowKey="trainId"
            className=''
            onRow={(record) => ({
              onClick: () => showModal(record.trainId),
            })}
            rowClassName="cursor-pointer hover:bg-purple-200"
          />

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <Pagination
              current={currentPage}
              total={filteredData.length}
              pageSize={pageSize}
              onChange={setCurrentPage}
            />
          </div>
        </Content>
      </Layout>

      {/* Transactions Modal */}
      <Modal
        title={`Transactions for Train ID ${selectedTrain}`}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        {/* DatePicker */}
        <div className="mb-4">
          <DatePicker
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            format="YYYY-MM-DD"
            className="w-full"
          />
        </div>

        {/* Transaction Table */}
        <Table
          columns={[
            { title: 'Transaction ID', dataIndex: 'transactionId', key: 'transactionId' },
            { title: 'Passenger Name', dataIndex: 'userFirstname', key: 'userFirstname', render: (text, record) => `${text} ${record.userLastname}` },
            { title: 'Payment Method', dataIndex: 'modeOfPayment', key: 'modeOfPayment' },
            { title: 'Destination', dataIndex: 'destinationName', key: 'destinationName' },
            { title: 'Amount (¥)', dataIndex: 'amount', key: 'amount' },
            { title: 'Transaction Time', dataIndex: 'transactionDateTime', key: 'transactionDateTime', render: (text) => format(new Date(text), 'yyyy-MM-dd HH:mm:ss') },
            { title: 'Train Station ID', dataIndex: 'trainStationId', key: 'trainStationId' },
          ]}
          dataSource={transactions}
          rowKey="transactionId"
          pagination={false}
        />
      </Modal>
    </Layout>
  );
};

export default FinancialReports;
