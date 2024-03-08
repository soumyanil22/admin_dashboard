import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import axios from 'axios';
import '../table.css';

const Table = ({ data }) => {
  const [disabledButtons, setDisabledButtons] = useState({});
  const [loading, setLoading] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleAction = async (id, action) => {
    setDisabledButtons({ ...disabledButtons, [id]: true });
    setLoading({ ...loading, [id]: true });

    try {
      let res;
      let uint8Array;
      let pdfData;
      let pdfURL;
      switch (action) {
        case 'view':
          res = await axios.get(
            `https://nach-card-tasks.onrender.com/api/get/invoices/pdf/${id}`
          );

          uint8Array = new Uint8Array(res.data.data.data.data);
          pdfData = new Blob([uint8Array], {
            type: 'application/pdf',
          });
          pdfURL = URL.createObjectURL(pdfData);
          window.open(pdfURL, '_blank');

          break;
        case 'download':
          res = await axios.get(
            `https://nach-card-tasks.onrender.com/api/get/invoices/pdf/${id}`
          );
          uint8Array = new Uint8Array(res.data.data.data.data);
          pdfData = new Blob([uint8Array], {
            type: 'application/pdf',
          });
          pdfURL = URL.createObjectURL(pdfData);
          var a = document.createElement('a');
          a.href = pdfURL;
          a.download = 'invoice.pdf';
          a.click();

          break;
        case 'resend':
          res = await axios.post(
            `https://nach-card-tasks.onrender.com/api/resend/invoices`,
            {
              invoiceNumber: id,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          if (res.status === 200 || res.status === 201) {
            setShowToast(true);
            setToastMessage('Invoice resent successfully');
            setTimeout(() => {
              setShowToast(false);
            }, 3000);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error:', error);
      setShowToast(true);
      setToastMessage('Error sending invoice');
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } finally {
      setDisabledButtons({ ...disabledButtons, [id]: false });
      setLoading({ ...loading, [id]: false });
    }
  };

  return (
    <div className="mx-4 pb-4">
      {data?.length > 0 ? (
        <>
          <Toast
            show={showToast}
            onClose={() => setShowToast(false)}
            className="mr-0 position-fixed top-0 end-0 z-1 bg-white"
          >
            <Toast.Header>
              <strong className="mr-0">Notification</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
          <div className="card rounded-3 p-2">
            <table className="table table-hover text-center align-middle">
              <thead>
                <tr>
                  <th scope="col" style={{ color: 'white' }}>
                    STATUS
                  </th>
                  <th scope="col" style={{ color: 'white' }}>
                    INVOICE NO.
                  </th>
                  <th scope="col" style={{ color: 'white' }}>
                    CLIENT
                  </th>
                  <th scope="col" style={{ color: 'white' }}>
                    AMOUNT
                  </th>
                  <th scope="col" style={{ color: 'white' }}>
                    BALANCE
                  </th>
                  <th scope="col" style={{ color: 'white' }}>
                    DATE
                  </th>
                  <th scope="col" style={{ color: 'white' }}>
                    DUE DATE
                  </th>
                  <th scope="col" style={{ color: 'white' }}></th>
                </tr>
              </thead>
              <tbody>
                {data.map((el) => (
                  <tr key={el.invoiceNumber}>
                    <td>
                      <div id="status">
                        <div
                          className={`border w-75  text-white rounded-1 ${
                            el.status.toLowerCase() === 'paid'
                              ? 'bg-success'
                              : 'bg-danger'
                          }`}
                        >
                          {el.status.charAt(0).toUpperCase() +
                            el.status.slice(1)}
                        </div>
                      </div>
                    </td>
                    <td style={{ color: '#5f8ec3', fontWeight: '600' }}>
                      {el.invoiceNumber}
                    </td>
                    <td style={{ color: '#5f8ec3', fontWeight: '600' }}>
                      {el.user}
                    </td>
                    <td style={{ fontWeight: '600' }}>₹{el.amount}</td>
                    <td style={{ fontWeight: '600' }}>₹{el.balance}</td>
                    <td style={{ fontWeight: '600' }}>
                      {new Date(el.createdDate).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </td>
                    <td style={{ fontWeight: '600' }}>
                      {new Date(el.dueDate).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </td>
                    <td>
                      <Dropdown id="dropdown">
                        <Dropdown.Toggle id="dropdown-basic">
                          {loading[el.invoiceNumber] ? (
                            <Spinner
                              animation="border"
                              role="status"
                              size="sm"
                              style={{ with: '150px' }}
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </Spinner>
                          ) : (
                            'More Actions'
                          )}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() =>
                              handleAction(el.invoiceNumber, 'view')
                            }
                            disabled={disabledButtons[el.invoiceNumber]}
                          >
                            View PDF
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              handleAction(el.invoiceNumber, 'download')
                            }
                            disabled={disabledButtons[el.invoiceNumber]}
                          >
                            Download PDF
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              handleAction(el.invoiceNumber, 'resend')
                            }
                            disabled={disabledButtons[el.invoiceNumber]}
                          >
                            Resend Invoice
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="card rounded-3 p-2 text-center">
          <strong>No data found</strong>
        </div>
      )}
    </div>
  );
};

export default Table;
