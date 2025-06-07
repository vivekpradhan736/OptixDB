import React from "react";
import GetApiKey from "./GetApiKey.js";
import PlanUsage from "./PlanUsage.js";

const ApiKey = () => {
  return (
    <div className="bg-gray-100 p-3">
      <div className="max-w-6xl mx-3 space-y-6">
        <GetApiKey />
        <PlanUsage />
      </div>
    </div>
  );
};

export default ApiKey;
