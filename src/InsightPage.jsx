import Navbar from './components/Navbar';
import Chart from './components/Chart';

function Insight({ state }) {
  return (
    <div
      className="mx-4 border bg-white rounded-1"
      style={{ marginTop: '80px', width: '450px' }}
    >
      <h4 className="mx-4 py-3">Welcome! Glad to see you.</h4>
      <div className="border"></div>
      <h3 className="mx-4 mt-3">Jess Westerfer</h3>
      <p className="ms-4" style={{ fontSize: '18px' }}>
        Here are your company&apos;s most recent <br />
        transactions:
      </p>
      <div className="mt-5 mx-4 mb-3 d-flex align-items-center justify-content-between">
        <h5 style={{ color: '#5f6064' }}>Invoices</h5>
        <span
          className="border px-4 rounded text-white fw-bold d-flex justify-content-center align-items-center"
          style={{ backgroundColor: '#2995bd', height: '32px' }}
        >
          ₹{state.total[0].totalAmount}
        </span>
      </div>
      <div className="border"></div>
      <div className="my-3 mx-4 d-flex align-items-center justify-content-between">
        <h5 style={{ color: '#5f6064' }}>Payments</h5>
        <span
          className="border px-4 rounded text-white fw-bold d-flex justify-content-center align-items-center"
          style={{ backgroundColor: '#51b730', height: '32px' }}
        >
          ₹{state.total[0].payments}
        </span>
      </div>
      <div className="border"></div>
      <div className="my-3 mx-4 d-flex align-items-center justify-content-between">
        <h5 style={{ color: '#5f6064' }}>Expenses</h5>
        <span
          className="border px-4 rounded text-white fw-bold d-flex justify-content-center align-items-center"
          style={{ backgroundColor: '#24292e', height: '32px' }}
        >
          ₹{state.total[0].totalExpenses}
        </span>
      </div>
      <div className="border"></div>
      <div className="my-3 mx-4 d-flex align-items-center justify-content-between">
        <h5 style={{ color: '#5f6064' }}>Outstanding</h5>
        <span
          className="border px-4 rounded text-white fw-bold d-flex justify-content-center align-items-center"
          style={{ backgroundColor: '#bb4e28', height: '32px' }}
        >
          ₹{state.total[0].totalBalance}
        </span>
      </div>
      <div className="border"></div>
      <div className="my-3 mx-4 d-flex align-items-center justify-content-between">
        <h5 style={{ color: '#5f6064' }}>Total Invoices Outstanding</h5>
        <span
          className="border px-4 rounded fw-bold d-flex justify-content-center align-items-center"
          style={{ backgroundColor: '#ffff', height: '32px', color: '#5f6064' }}
        >
          {state.pendingCount[0].pendingCount}
        </span>
      </div>
      <div className="border" style={{ marginBottom: '50px' }}></div>
    </div>
  );
}

const InsightPage = ({ data, setData }) => {
  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-between align-items-center">
        {data && <Insight state={data} />}
        {data && <Chart state={data} setData={setData} />}
      </div>
    </>
  );
};

export default InsightPage;
