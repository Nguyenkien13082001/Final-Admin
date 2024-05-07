import React, { useEffect, useState } from "react";
import "./DashBoard.css";
import apiClient from "../../api/apiClient";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// const combinedData = [
//   { name: "month 1", TestsCreated: 30, TestAttempts: 150 },
//   { name: "month 2", TestsCreated: 20, TestAttempts: 120 },
//   { name: "month 3", TestsCreated: 50, TestAttempts: 200 },
//   { name: "month 4", TestsCreated: 40, TestAttempts: 180 },
// ];

function Dashboard() {
  const [userData, setUserData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  // const formatYAxisTick = (tickItem) => {
  //   return tickItem % 1 === 0 ? tickItem : "";
  // };
  const fetchUserData = async () => {
    try {
      const response = await apiClient.get("api/count_member_admin");
      setUserData(response.count);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchCombinedData();
  }, []);

  const fetchCombinedData = async () => {
    try {
      const response = await apiClient.get("/api/count_exam_admin");
      setCombinedData(response.count);
    } catch (error) {
      console.error("Failed to fetch combined data:", error);
    }
  };

  return (
    <div className="chart-container">
      <div className="BarChartcss">
        <h2 style={{ textAlign: "center" }}>
          Graph of normal users and vip users
        </h2>{" "}
        <BarChart
          width={800}
          height={300}
          data={userData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis
            allowDecimals={false}
            tickFormatter={(value) => Math.floor(value)}
            domain={[0, "dataMax + 1"]}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="USER" fill="#8884d8" />
          <Bar dataKey="VIP" fill="#82ca9d" />
        </BarChart>
      </div>

      <div className="charts-row">
        <div
          style={{ backgroundColor: "#e1d5f326   " }}
          className="BarChartcss"
        >
          <h2>Number of Mock Exam and Practice every month</h2>
          <BarChart
            width={800}
            height={300}
            data={combinedData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Mock" fill="#8884d8" name="Mock Exam" />
            <Bar dataKey="Practice" fill="#82ca9d" name="Practice" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
