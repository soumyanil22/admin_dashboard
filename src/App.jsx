import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Table from './components/Table';
import axios from 'axios';
import Loader from './components/Loader';
import FilterBar from './components/FilterBar';
import Chart from './components/Chart';
import ChartFilter from './components/ChartFilter';
import InsightPage from './InsightPage';

const fetchData = async () => {
  const res = await axios.get(
    'https://nach-card-tasks.onrender.com/api/get/invoiceInsights'
  );
  return res.data.data;
};

function App(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };
    getData();
  }, []);

  const renderContent = (data) => {
    return (
      <>
        <InsightPage data={data} setData={setData} />
      </>
    );
  };

  return <>{data ? renderContent(data) : <Loader />}</>;
}

export default App;
