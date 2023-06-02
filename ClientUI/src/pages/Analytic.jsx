import { Box, Text } from "@chakra-ui/react";
import AdminLayout from "../components/AdminLayout";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
);

const dataPie = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [1, 2, 3, 4, 5, 65, 7, 98, 9, 4, 5, 5, 3, 6, 54, 74],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [1, 2, 3, 4, 5, 65, 7, 98, 9, 4, 5, 5, 3, 6, 54, 74],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function Analytic() {
  return (
    <AdminLayout>
      <Box display="flex" margin="auto" justifyContent="center">
        <Box>
          <Box
            w="800px"
            bg="whiteAlpha.700"
            borderRadius="10px"
            padding="16px 32px"
            margin="32px auto"
          >
            <Line options={options} data={data} />
          </Box>
          <Box
            w="800px"
            bg="whiteAlpha.700"
            borderRadius="10px"
            padding="16px 32px"
            margin="32px auto"
          >
            <Bar options={options} data={data} />
          </Box>
        </Box>
        <Box
          w="800px"
          bg="whiteAlpha.700"
          borderRadius="10px"
          padding="16px 32px"
          margin="32px"
        >
          <Pie data={dataPie} />;
        </Box>
      </Box>
    </AdminLayout>
  );
}
