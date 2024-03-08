import React, { useState, useEffect } from 'react';

export default function GetDeliveryStatus() {
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        // Fetch timeline data from the API
        const response = await fetch(
          'http://localhost:8000/api/get/delivery/timeline/MJ-30301'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // Set the fetched timeline data to state
        setTimelineData(data.orderTimeline);
        setLoading(false);
      } catch (error) {
        // Handle errors during data fetching
        setError(error.message);
        setLoading(false);
      }
    };

    // Call the fetchTimelineData function on component mount
    fetchTimelineData();
  }, []);

  return (
    <div className="container py-5">
      {/* Delivery Timeline header */}
      <div className="row text-center mb-5">
        <div className="col-lg-8 mx-auto">
          <h1 className="display-4">Delivery Timeline</h1>
        </div>
      </div>

      {/* Timeline items */}
      <div className="row">
        <div className="col-lg-7 mx-auto">
          {/* Display loading message if data is loading */}
          {loading ? (
            <p>Loading...</p>
          ) : // Display error message if an error occurred during data fetching
          error ? (
            <p>{error}</p>
          ) : // Display 'No data found' message if no timeline data is available
          timelineData.length === 0 ? (
            <p>No data found</p>
          ) : (
            // Render timeline items if data is available
            <ul className="list-unstyled">
              {timelineData.map((item, index) => (
                <li
                  key={index}
                  className="timeline-item d-flex align-items-center gap-4 mt-4"
                >
                  {/* Timeline icon */}
                  <div className="timeline-icon mr-3">
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
                      {/* Clock icon */}
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  {/* Timeline content */}
                  <div className="timeline-content">
                    <h2 className="h5 mb-0">{item.status}</h2>
                    <span className="small text-gray">
                      {/* Convert timestamp to localized date and time string */}
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
