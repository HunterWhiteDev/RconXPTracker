import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import LineChart from "./LineChart";
import Tabs from "./Tabs";
import Table from "./Table";

const url = process.env.REACT_APP_URL;
function App() {
  const [rawData, setRawData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [keysData, setKeysData] = useState([]);
  const [pointsData, setPointsData] = useState([]);
  const [stat, setStat] = useState("xp");
  const [username, setUsername] = useState("cole");
  const [userTabs, setUserTabs] = useState();

  const getData = async () => {
    const { data } = await axios.get(`http://localhost:5124/data`, {
      headers: "Content-Type: application/json",
    });
    let dataSetsArr = [];
    let userNames = [];
    for (const entry in data) {
      const entryObj = data[entry];

      for (const item of entryObj) {
        if (!userNames.includes(item.username)) {
          userNames.push(item.username);
        }
        console.log(item);
      }
    }
    console.log(userNames);
    setUserTabs(userNames);
    setRawData(data);
    const keys = Object.keys(data);
    let rawDataArr = [];
    for (const entry in data) {
      const entryObj = data[entry];
      // rawDataArr.push(entryObj.xp);
      for (const item of entryObj) {
        if (username === item.username) {
          rawDataArr.push(item[stat]);
        }
      }
    }

    setKeysData(keys);
    setPointsData(rawDataArr);
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [username, stat]);

  return (
    <div className="app">
      <Tabs
        username={username}
        stat={stat}
        users={userTabs}
        setUsername={setUsername}
        setStat={setStat}
      />
      <LineChart xData={keysData} yData={pointsData} />
      <Table data={pointsData} />
    </div>
  );
}

export default App;
