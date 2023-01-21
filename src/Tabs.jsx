import React from "react";

function Tabs({ users = [], setUsername, setStat, username, stat }) {
  return (
    <>
      <h1>Users</h1>
      <div className="user-Tabs">
        {users.map((user) => (
          <div
            className={`user-Tab ${username === user && "active-tab"}`}
            onClick={() => setUsername(user)}
          >
            {user}
          </div>
        ))}
      </div>
      <h3>Stat</h3>
      <div className="user-Tabs">
        <div
          className={`user-Tab ${stat === "xp" && "active-tab"}`}
          onClick={() => setStat("xp")}
        >
          XP
        </div>
        <div
          className={`user-Tab ${stat === "message_count" && "active-tab"}`}
          onClick={() => setStat("message_count")}
        >
          Messages
        </div>
      </div>
    </>
  );
}

export default Tabs;
