import { Bar } from 'react-chartjs-2';
import ChartFilter from './ChartFilter';
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const Chart = ({ state, setData }) => {
  const colors = ['#2995bd', '#51b730', '#1890ef', '#bb323d'];

  return (
    <>
      <div className="position-relative me-4 mt-5 flex-grow-1 border rounded-1 bg-white">
        <ChartFilter setData={setData} />
        <h5 className="ms-4 my-4" style={{ color: '#5f6064' }}>
          Overview
        </h5>
        <div className="border"></div>
        <div className="w-100 mt-2">
          {state && (
            <Bar
              data={{
                labels: ['$1', '$2', '$3', '$4', '$5'],
                datasets: [
                  {
                    label: 'Invoices',
                    data: [state.total[0].totalAmount],
                    backgroundColor: colors[0],
                  },
                  {
                    label: 'Payments',
                    data: [state.total[0].payments],
                    backgroundColor: colors[1],
                  },
                  {
                    label: 'Expenses',
                    data: [state.total[0].totalExpenses],
                    backgroundColor: colors[2],
                  },
                  {
                    label: 'Outstanding',
                    data: [state.total[0].totalBalance],
                    backgroundColor: colors[3],
                  },
                ],
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Chart;
