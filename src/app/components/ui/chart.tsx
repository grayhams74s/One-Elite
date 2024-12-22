'use client'

import { Line, Bar } from "react-chartjs-2"
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
  ChartOptions,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

interface LineChartProps {
  data: number[]
  className?: string
  strokeWidth?: number
  pathColor?: string
}

interface BarChartProps {
  data: {
    desktop: number[]
    mobile: number[]
  }
  months: string[]
  className?: string
}

export function LineChart({ data, className, strokeWidth = 1.5, pathColor = "#0000FF" }: LineChartProps) {
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: strokeWidth,
        borderColor: pathColor,
      },
      point: {
        radius: 0,
      },
    },
  }

  const chartData = {
    labels: months,
    datasets: [
      {
        data: data,
        fill: false,
      },
    ],
  }

  return (
    <div className={className}>
      <Line options={options} data={chartData} />
    </div>
  )
}

export function BarChart({ data, months, className }: BarChartProps) {
  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  }

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Desktop',
        data: data.desktop,
        backgroundColor: '#666666',
      },
      {
        label: 'Mobile',
        data: data.mobile,
        backgroundColor: '#cccccc',
      },
    ],
  }

  return (
    <div className={className}>
      <Bar options={options} data={chartData} />
    </div>
  )
}

