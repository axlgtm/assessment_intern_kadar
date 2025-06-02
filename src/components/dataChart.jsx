import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import DataJson from "../assets/data.json";

const DataChart = () => {
  const [selectedBranch, setSelectedBranch] = useState("all");

  const branch = [...new Set(DataJson.dataTarget.map(item => item.cabang))];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dataProsessed = useMemo(() => {
    const dataTarget = selectedBranch == "all" ? DataJson.dataTarget: DataJson.dataTarget.filter(item => item.cabang === selectedBranch);
    const dataTargetBooking = selectedBranch == "all" ? DataJson.dataTargetBooking: DataJson.dataTargetBooking.filter(item => item.cabang === selectedBranch);
    return monthNames.map((month, index) => {
        const monthKey = (index + 1).toString();
        const target = dataTarget.reduce((sum, item) => sum + (item[monthKey] || 0), 0);
        const targetBooking = dataTargetBooking.reduce((sum, item) => sum + (item[monthKey] || 0), 0);
        return { 
          month, 
          target, 
          targetBooking, 
        };
    });
  }, [selectedBranch]);
  
  const insightsData = useMemo(() => {
    const totalTarget = DataJson.dataTarget.reduce((sum, item) => {
      return sum + Object.keys(item).filter(key => !isNaN(key)).reduce((itemsum, key) => itemsum + (item[key] || 0), 0);
    }, 0);

    const totalBooking = DataJson.dataTargetBooking.reduce((sum, item) => {
      return sum + Object.keys(item).filter(key => !isNaN(key)).reduce((itemsum, key) => itemsum + (item[key] || 0), 0);
    }, 0);

    const overallConversionRate = totalTarget > 0 ? ((totalBooking / totalTarget) * 100).toFixed(1) : 0;

    return { totalTarget, totalBooking, overallConversionRate }
  }, []);
  return (
  <>  
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 dark:text-gray-200">Data Target vs Data Booking Perumahan</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800">Total Target</h3>
            <p className="text-2xl font-bold text-blue-600">{insightsData.totalTarget}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800">Total Booking</h3>
            <p className="text-2xl font-bold text-green-600">{insightsData.totalBooking}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800">Persentase Booking / Target</h3>
            <p className="text-2xl font-bold text-purple-600">{insightsData.overallConversionRate}%</p>
          </div>
        </div>

        <div className="flex gap-2">
            <label className="font-medium text-gray-700 dark:text-gray-200">Cabang:</label>
            <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)} className="select">
              <option value="all">Semua Cabang</option>
              {branch.map(branch => (
                <option key={branch} value={branch} className=''>{branch}</option>
              ))}
            </select>
          </div>
      </div>
    </div>

    <div className="p-4">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={dataProsessed} margin={{right: 15, left: 15, bottom: 20}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey={'month'} 
            angle={0}
            textAnchor={'middle'}
            height={60}
            interval={0}
          />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => {
              if (name === 'target') return [value, 'target'];
              if (name === 'targetBooking') return [value, 'targetBooking'];
              return [value, name];
            }}
          />
          <Legend />
          <Bar dataKey="target" fill="#8884d8" name="Target" />
          <Bar dataKey="targetBooking" fill="#82ca9d" name="Booking" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </>
  )
}

export default DataChart;