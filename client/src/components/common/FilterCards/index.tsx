import React, { BaseSyntheticEvent, useState } from 'react';
import './index.view.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import simpleChart from 'assets/img/chart.png';
import warning from 'assets/img/warning.svg';

function FilterCards() {
  const navigate = useNavigate();

  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
  );

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false
    },
    stacked: false,
    plugins: {
      title: {
        display: false,
        text: 'Value Over Time'
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false
        }
      }
    }
  };

  const labels = ['11/25', '12/10', '12/15', '12/20', '12/30'];

  const LineData = {
    labels,
    datasets: [
      {
        label: 'blue',
        data: [70, 83, 79, 87, 76],
        borderColor: '#FF3366',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        lineTension: 0.4,
        yAxisID: 'y'
      },
      {
        label: 'gray1',
        data: [30, 53, 69, 47, 76],
        borderColor: 'gray',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
        lineTension: 0.4
      }
    ]
  };

  const data = {
    labels: [],
    datasets: [
      {
        label: '',
        data: [29, 71],
        backgroundColor: ['rgba(75, 85, 99, 0.3 )', 'rgba(255, 99, 132, 0.3)'],
        borderColor: ['rgba(75, 85, 99, 1 )', 'rgba(255, 99, 132, 1)'],
        borderWidth: 0.5
      }
    ]
  };

  return (
    <div className="p-2 flex-1">
      <div className="store-card px-8 py-4">
        <div className="flex items-end">
          <h1 className="text-2xl flex-1 text-[#FF3366]">Current Store</h1>
          <svg
            width="14"
            height="9"
            viewBox="0 0 14 9"
            fill="none"
            className="self-end cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: 'rotate(180deg)' }}
          >
            <path
              d="M1.16732 7.5L7.00065 1.66667L12.834 7.5"
              stroke="#4A5567"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex items-end mt-[15px]">
          <h1 className="text-2xl flex-1 text-black"> L.A Head Quarters</h1>
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.69922 20.0322H4.69922M4.69922 20.0322H14.6992M4.69922 20.0322V6.23242C4.69922 5.11232 4.69922 4.55185 4.91721 4.12402C5.10895 3.7477 5.41469 3.44196 5.79102 3.25021C6.21884 3.03223 6.77931 3.03223 7.89941 3.03223H11.4994C12.6195 3.03223 13.1788 3.03223 13.6066 3.25021C13.9829 3.44196 14.2897 3.7477 14.4814 4.12402C14.6992 4.55143 14.6992 5.11122 14.6992 6.22914V12.0322M14.6992 20.0322H20.6992M14.6992 20.0322V12.0322M20.6992 20.0322H22.6992M20.6992 20.0322V12.0322C20.6992 11.1003 20.6991 10.6346 20.5469 10.2671C20.3439 9.77703 19.9549 9.38745 19.4648 9.18447C19.0973 9.03223 18.6308 9.03223 17.699 9.03223C16.7671 9.03223 16.3011 9.03223 15.9336 9.18447C15.4435 9.38745 15.0544 9.77703 14.8515 10.2671C14.6992 10.6346 14.6992 11.1003 14.6992 12.0322M7.69922 10.0322H11.6992M7.69922 7.03223H11.6992"
              stroke="#333399"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="store-card px-8 py-4">
        <div className="flex items-end">
          <h1 className="text-2xl flex-1 text-[#FF3366]">
            Current Titles Value
          </h1>
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <g clipPath="url(#clip0_958_180727)">
              <path
                d="M5.0084 4.06363C6.67175 2.62232 8.79972 1.83031 11.0007 1.83338C16.0634 1.83338 20.1673 5.9373 20.1673 11C20.1673 12.958 19.5532 14.773 18.5082 16.2617L15.584 11H18.334C18.3341 9.56237 17.9116 8.15637 17.1191 6.95687C16.3266 5.75737 15.1989 4.81728 13.8764 4.2535C12.5539 3.68971 11.0948 3.52711 9.68061 3.7859C8.26642 4.04469 6.95948 4.71346 5.92232 5.70905L5.0084 4.06363ZM16.9929 17.9365C15.3296 19.3778 13.2016 20.1698 11.0007 20.1667C5.9379 20.1667 1.83398 16.0628 1.83398 11C1.83398 9.04205 2.44815 7.22705 3.49315 5.73838L6.41732 11H3.66732C3.6672 12.4377 4.08967 13.8437 4.88221 15.0432C5.67474 16.2427 6.80238 17.1828 8.1249 17.7466C9.44743 18.3104 10.9065 18.473 12.3207 18.2142C13.7349 17.9554 15.0418 17.2866 16.079 16.291L16.9929 17.9365Z"
                fill="#A6A9B3"
              />
            </g>
            <defs>
              <clipPath id="clip0_958_180727">
                <rect width="22" height="22" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="flex items-end mt-[15px]">
          <h1 className="text-2xl flex-1 text-black">
            {' '}
            2,855 <span className="text-gray-500"> Titles &rarr; </span>{' '}
            81,693,224 <span className="text-gray-500"> USD</span>
          </h1>
        </div>
        <div className="flex items-center mt-5">
          {/* <Doughnut
            data={data}
            width={10}
            options={{ maintainAspectRatio: false }}
          /> */}
          <div>
            <img src={simpleChart} />
          </div>
          <div className="ml-3">
            <h1 className="text-2xl">30% of Titles</h1>
            <h2 className="text-xl">Are pending</h2>
          </div>
          <div className="float-right ml-5">
            <img src={warning} />
          </div>
        </div>
      </div>

      <div className="store-card px-8 py-4">
        <div className="flex items-center">
          <span className="flex-1 text-2xl">Value Over Time</span>
          <button
            className="bg-[#333399] text-white font-bold py-1 px-4 rounded inline-flex items-center"
            style={{ borderRadius: 4 }}
          >
            <span className="mr-2">30 Days</span>
          </button>
          <svg
            width="16"
            className="ml-2 cursor-pointer"
            height="9"
            viewBox="0 0 16 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 1L8 8L1 1"
              stroke="#333399"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <Line options={options} data={LineData} height={250} width={400} />
        </div>
      </div>
    </div>
  );
}

export default FilterCards;
