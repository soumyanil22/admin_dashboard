import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddNewDeliverAddress from './components/AddNewDeliverAddress.jsx';
import axios from 'axios';
import InvoicesPage from './InvoicesPage.jsx';
import GetDeliveryStatus from './GetDeliveryStatus.jsx';
import UpdateDeliveryStatus from './UpdateDeliveryStatus.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/add-new-delivery-address/:_id',
        element: <AddNewDeliverAddress />,
      },
    ],
    errorElement: (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <h1>404 Not Found</h1>
      </div>
    ),
  },
  {
    path: '/invoices',
    element: <InvoicesPage />,
    errorElement: (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <h1>404 Not Found</h1>
      </div>
    ),
  },
  {
    path: '/delivery/status',
    element: <GetDeliveryStatus />,
    errorElement: (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <h1>404 Not Found</h1>
      </div>
    ),
  },
  {
    path: '/update/delivery/status',
    element: <UpdateDeliveryStatus />,
    errorElement: (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <h1>404 Not Found</h1>
      </div>
    ),
  },
]);

const AppWithState = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        'https://nach-card-tasks.onrender.com/api/get/invoiceInsights'
      );
      setData(res.data.data);
    } catch (error) {
      console.error('Error fetching invoice insights:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const applyFilters = async (newData) => {
    setData(newData); // Update state in AppWithState
  };

  return <RouterProvider router={router} appData={data} />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWithState />
  </React.StrictMode>
);
