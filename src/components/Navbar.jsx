import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import './breadcrumbstyle.css';

const Navbar = () => {
  const [selectedItem, setSelectedItem] = useState('Dashboard');

  const handleDropdownChange = (eventKey) => {
    setSelectedItem(eventKey);
  };

  return (
    <div
      className="shadow-sm container-fluid"
      style={{ height: '50px', backgroundColor: 'white' }}
    >
      <style type="text/css">
        {`
    .btn-flat {
      background-color: white;
      color: black;
      border: none;
    }

    .btn-xxl {
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
    }
    `}
      </style>
      <div className="h-100 d-flex align-items-center">
        <div className="d-flex gap-3 align-items-center w-50">
          <Dropdown
            as={ButtonGroup}
            className="col"
            onSelect={handleDropdownChange}
          >
            <Button variant="flat">{selectedItem}</Button>
            <Dropdown.Toggle split variant="flat" id="dropdown-split-basic" />
            <Dropdown.Menu>
              <Dropdown.Item eventKey="Dashboard">Dashboard</Dropdown.Item>
              <Dropdown.Item eventKey="Invoices">Invoices</Dropdown.Item>
              <Dropdown.Item eventKey="Something else">
                Something else
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <input
            type="text"
            className="form-control border-0"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="mt-4">
        <Breadcrumb>
          <Breadcrumb.Item href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={40}
              height={24}
              viewBox="-6 2 28 24"
            >
              <path d="M12.56 2.171a1 1 0 0 0-1.12 0l-8 5.4A1 1 0 0 0 3 8.4V21a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8.4a1 1 0 0 0-.44-.829ZM14 20h-4v-6h4Zm5 0h-3v-7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H5V8.932l7-4.725 7 4.725Z" />
            </svg>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{selectedItem}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default Navbar;
