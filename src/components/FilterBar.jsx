import { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DownloadIcon from './DownloadIcon';
import axios from 'axios';
import './filterbar.css';

const FilterBar = ({ data, setData }) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    applyFilters();
  }, [selectedStatus, name]);

  const applyFilters = async () => {
    let url = `https://nach-card-tasks.onrender.com/api/get/all/invoices`;
    if (selectedStatus) {
      url += `?status=${selectedStatus}`;
    }

    if (name) {
      if (selectedStatus) {
        url += `&clientName=${name}`;
      } else {
        url += `?clientName=${name}`;
      }
    }

    const res = await axios.get(url);

    setData(res.data.data);
  };

  const handleStatusChange = (event) => {
    const status = event.target.value;
    setSelectedStatus(status);
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
  };

  return (
    <div
      className="d-flex gap-3 mx-4 justify-content-between align-items-center"
      style={{ marginTop: '80px' }}
    >
      <div
        id="filterBar_first"
        className="d-flex justify-content-center align-items-center gap-3"
      >
        <Dropdown>
          <Dropdown.Toggle
            id="dropdown-basic"
            variant="info"
            className="text-white"
          >
            More Actions
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>View PDF</Dropdown.Item>
            <Dropdown.Item>Download PDF</Dropdown.Item>
            <Dropdown.Item>Resend Invoice</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Form.Select
          aria-label="select status"
          size="3"
          style={{ width: '160px' }}
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <option value="">Filter by status</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </Form.Select>
      </div>
      <div
        id="filterBar_second"
        className="d-flex align-items-center justify-content-center gap-3"
      >
        <input
          className="form-control"
          value={name}
          onChange={handleNameChange}
          type="text"
          placeholder="Search by name..."
          style={{ width: '200px' }}
        />
        <Button variant="success">
          <DownloadIcon />
          Import
        </Button>
        <Button className="btn-bd-primary">New Invoice</Button>
      </div>
    </div>
  );
};

export default FilterBar;
