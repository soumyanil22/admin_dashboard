import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Calendar from './Calendar';
import axios from 'axios';

const ChartFilter = ({ setData }) => {
  const fetchFilteredData = async (filter) => {
    try {
      const response = await axios.get(
        `https://nach-card-tasks.onrender.com/api/get/invoiceInsights?date=${filter}`
      );

      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    }
  };

  return (
    <div
      className="position-absolute d-flex justify-content-around align-items-center gap-3"
      style={{ top: '-80px', left: '25%' }}
    >
      <Form.Select
        aria-label="Default select example"
        style={{ width: '80px' }}
      >
        <option value="₹">INR</option>
        <option value="$">USD</option>
      </Form.Select>
      <Button variant="light" style={{ backgroundColor: 'white' }}>
        Day
      </Button>
      <Button variant="light" style={{ backgroundColor: 'white' }}>
        Week
      </Button>
      <Button variant="light" style={{ backgroundColor: 'white' }}>
        Month
      </Button>
      <Calendar />
      <Form.Select
        onChange={(e) => {
          fetchFilteredData(e.target.value);
        }}
        style={{ marginLeft: '-10px', width: '195px' }}
        aria-label="Default select example"
      >
        <option value="">Select custom date</option>
        <option value="last_7_days">Last 7 days</option>
        <option value="last_30_days">Last 30 days</option>
        <option value="this_month">This month</option>
        <option value="last_month">Last month</option>
        <option value="this_year">This Year</option>
        <option value="last_year">Last Year</option>
      </Form.Select>
    </div>
  );
};

export default ChartFilter;
