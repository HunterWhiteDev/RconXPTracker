import React, { useEffect, useState } from "react";

function Table({ data = [] }) {
  const [three, setThree] = useState();
  const [five, setFive] = useState();
  const [seven, setSeven] = useState();

  useEffect(() => {
    if (data) {
      const threeConst = data[data.length - 1] - data[data.length - 4];
      const fiveConst = data[data.length - 1] - data[data.length - 6];
      const sevenConst = data[data.length - 1] - data[data.length - 8];
      setThree(threeConst);
      setFive(fiveConst);
      setSeven(sevenConst);
    }
  }, [data]);

  console.log(data);

  return (
    <div>
      <table>
        <thead>
          <td>Last 3 days</td>
          <td>Last 5 days</td>
          <td>Last 7 days</td>
        </thead>
        <tbody>
          <td>{three}</td>
          <td>{five}</td>
          <td>{seven}</td>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
