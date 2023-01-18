import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
const url = process.env.REACT_APP_URL;
function App() {
  const [data, setData] = useState(null);
  const [keysData, setKeysData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`http://localhost:5124/data`, {
        headers: "Content-Type: application/json",
      });
      let dataSetsArr = [];
      for (const entry in data) {
        let plotObj = {};

        for (const user in data[entry]) {
          let userObj = data[entry][user];
          plotObj["date"] = entry;
          plotObj[userObj.username] = userObj.xp;
        }

        dataSetsArr.push(plotObj);
      }

      setData(dataSetsArr);
    };

    getData();
  }, []);

  useEffect(() => {
    if (data) {
      try {
        const keys = Object.keys(data[1]);
        let keysArr = [];
        for (const key of keys) {
          if (key !== "date") {
            keysArr.push(key);
          }
        }
        setKeysData(keysArr);
      } catch {
        setKeysData([]);
      }
    }
  }, [data]);

  console.log(keysData);

  return (
    <div className="app">
      <LineChart
        width={1920 / 2}
        height={1080 / 2}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="level" stroke="#8884d8" />
        {/* <Line type="monotone" dataKey="amount" stroke="#8884d8" /> */}
        {keysData?.map((key) => (
          <Line type="monotone" dataKey={key} stroke="#8884d8" />
        ))}

        <Line type="monotone" dataKey={"VividElites"} stroke="#8884d8" />

        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        {/* <XAxis dataKey="name" tick={renderCustomAxisTick} /> */}
        <XAxis dataKey={"date"} />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
}

export default App;
