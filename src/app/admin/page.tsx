"use client";

import { useEffect, useState } from "react";
import { db } from "@/Lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const AdminDashboard = () => {
  const [apiLogs, setApiLogs] = useState<{ success: number; error: number }>({
    success: 0,
    error: 0,
  });
  const [errors, setErrors] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {    
    setIsClient(true);
    const unsubscribeApiLogs = onSnapshot(
      collection(db, "api_logs"),
      (snapshot) => {
        let successCount = 0;
        let errorCount = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.success) successCount++;
          else errorCount++;
        });

        setApiLogs({ success: successCount, error: errorCount });
      }
    );

    const unsubscribeErrors = onSnapshot(
      collection(db, "errors"),
      (snapshot) => {
        const errorList: any[] = [];
        snapshot.forEach((doc) => errorList.push(doc.data()));
        setErrors(errorList);
      }
    );

    return () => {
      unsubscribeApiLogs();
      unsubscribeErrors();
    };
  }, []);

  const totalApiCalls = apiLogs.success + apiLogs.error;
  const successPercentage = totalApiCalls
    ? ((apiLogs.success / totalApiCalls) * 100).toFixed(2)
    : 0;
  const errorPercentage = totalApiCalls
    ? ((apiLogs.error / totalApiCalls) * 100).toFixed(2)
    : 0;

  const chartData = [
    { name: "Successful Calls", value: apiLogs.success, color: "#4CAF50" },
    { name: "Failed Calls", value: apiLogs.error, color: "#F44336" },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="p-4 border rounded-lg shadow-md bg-white">
        <div className="flex justify-around items-center">
          <div className="text-center">
            <h3 className="text-green-600 text-xl font-bold">
              {apiLogs.success} ({successPercentage}%)
            </h3>
            <p className="text-gray-600">Successful Calls</p>
          </div>
          <div className="text-center">
            <h3 className="text-red-600 text-xl font-bold">
              {apiLogs.error} ({errorPercentage}%)
            </h3>
            <p className="text-gray-600">Failed Calls</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          {isClient && (
            <PieChart width={300} height={300}>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )}
        </div>
      </div>

      <div className="p-4 border rounded-lg shadow-md bg-white">
        <h2 className="text-lg font-semibold mb-4">Error Logs</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Message</th>
                <th className="px-4 py-2 border">Status Code</th>
                <th className="px-4 py-2 border">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {errors.length > 0 ? (
                errors.map((error, index) => {
                  // تبدیل Timestamp به تاریخ خوانا
                 const formattedTimestamp = error.timestamp?.toDate
                   ? error.timestamp.toDate().toLocaleString()
                   : "N/A";


                  return (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2 border">
                        {error.message || "No message"}
                      </td>
                      <td className="px-4 py-2 border">
                        {error.statusCode || "N/A"}
                      </td>
                      <td className="px-4 py-2 border">{formattedTimestamp}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={3} className="px-4 py-2 text-center">
                    No errors recorded.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
