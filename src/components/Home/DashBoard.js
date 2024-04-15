import React from "react";
import "./DashBoard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Tháng 1", User: 4000, Premium: 2400 },
  { name: "Tháng 2", User: 3000, Premium: 1398 },
  { name: "Tháng 3", User: 2000, Premium: 9800 },
  { name: "Tháng 4", User: 2780, Premium: 3908 },
];

const testDataCreation = [
  { name: "Tháng 1", TestsCreated: 30 },
  { name: "Tháng 2", TestsCreated: 20 },
  { name: "Tháng 3", TestsCreated: 50 },
  { name: "Tháng 4", TestsCreated: 40 },
];

const testAttemptsData = [
  { name: "Tháng 1", TestAttempts: 150 },
  { name: "Tháng 2", TestAttempts: 120 },
  { name: "Tháng 3", TestAttempts: 200 },
  { name: "Tháng 4", TestAttempts: 180 },
];

function Dashboard() {
  return (
    <div className="chart-container">
      <div className="BarChartcss">
        <h2 style={{ textAlign: "center" }}>Biểu đồ Số lượng Người dùng</h2>{" "}
        <BarChart
          width={800}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="User" fill="#8884d8" />
          <Bar dataKey="Premium" fill="#82ca9d" />
        </BarChart>
      </div>

      <div className="charts-row">
        <div
          style={{ backgroundColor: "#e1d5f326   " }}
          className="BarChartcss"
        >
          <h2>Biểu đồ Số lượng Bài kiểm tra được tạo</h2>
          <BarChart
            width={500}
            height={300}
            data={testDataCreation}
            // ... props khác ...
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="TestsCreated" fill="#8884d8" />
          </BarChart>
        </div>

        <div style={{ backgroundColor: "#e1d5f326" }} className="BarChartcss">
          <h2>Biểu đồ Số lần Bài kiểm tra được làm</h2>
          <BarChart
            width={500}
            height={300}
            data={testAttemptsData}
            // ... props khác ...
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="TestAttempts" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
