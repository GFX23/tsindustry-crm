import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';



const LineChart = ({orderData}) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        aspectRatio: 4,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: false,
          },
        },
      };
      
      const labels = Object.keys(orderData);
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Current month',
            data: Object.values(orderData),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };

    return (
        <Line options={options} data={data} />
    )
}

export default LineChart