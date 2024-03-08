import React, { useState } from 'react';
import axios from 'axios';

export default function UpdateDeliveryStatus() {
  const [status, setStatus] = useState('');
  const [orderID, setOrderID] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true); // Set loading state to true while processing API call
    try {
      const response = await axios.post(
        'http://localhost:8000/api/update/delivery/timeline',
        {
          status,
          orderID,
        }
      );
      if (response.status === 200) {
        setOrderID('');
        setStatus('');
        alert('Update successful');
      } else {
        alert('Update failed');
      }
    } catch (error) {
      alert('Update failed');
    }
    setIsLoading(false); // Set loading state back to false after API call is completed
  };

  return (
    <div className="container py-5">
      {/* Delivery Timeline header */}
      <div className="row text-center mb-5">
        <div className="col-lg-8 mx-auto">
          <h1 className="display-4">Update Delivery Timeline</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
            <input
              style={{ maxWidth: '200px' }} // Set maximum width to 200px
              type="text"
              className="form-control  "
              placeholder="Enter Order ID"
              value={orderID}
              onChange={(e) => setOrderID(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? ( // Display spinner if isLoading is true
                  <div
                    className="spinner-border "
                    role="status"
                    style={{ width: '23px', height: '23px' }}
                  ></div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12" y2="16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
