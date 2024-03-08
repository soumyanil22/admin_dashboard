import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import Table from './components/Table';
import axios from 'axios';

const fetchData = async () => {
  const res = await axios.get(
    'https://nach-card-tasks.onrender.com/api/get/all/invoices'
  );
  return res.data.data;
};

const InvoicesPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();        
      setData(fetchedData);
    };
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <FilterBar data={data} />
      <div style={{ marginTop: '20px' }}>
        <Table data={data} />
      </div>
    </>
  );
};

export default InvoicesPage;
