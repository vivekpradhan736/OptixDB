import { useState } from "react";
import { Card } from "./ui/card";

const SDKSelector = ({selectedSDK, setSelectedSDK}) => {
//   const [selectedSDK, setSelectedSDK] = useState("nodejs");

  const sdks = [
    { id: "nodejs", name: "Node.js", icon: "🟢" },
    { id: "react", name: "React", icon: "⚛️" },
    { id: "nextjs", name: "Next.js", icon: "▲" },
    { id: "python", name: "Python", icon: "🐍" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 bg-[#fa7275] text-white rounded-full flex items-center justify-center font-bold">
          1
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-900">Choose an SDK</h2>
        </div>
      </div>

      <div className="flex items-stretch gap-10">
        <div className=" w-[0.10rem] self-stretch ml-5 border border-dashed border-[#d1d6e0]"></div>
      <div className="grid grid-cols-4 md:grid-cols-4 w-full gap-4">
        {sdks.map((sdk) => (
          <Card
            key={sdk.id}
            className={`p-2 sm:p-3 md:p-4 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedSDK === sdk.id
                ? " bg-[#fa7275] text-white"
                : "hover:bg-gray-50"
            }`}
            onClick={() => setSelectedSDK(sdk.id)}
          >
            <div className="flex justify-center items-center">
              <div className="text-sm md:text-base">{sdk.icon}</div>
              <div className={`font-medium text-xs md:text-base text-gray-900 ${
              selectedSDK === sdk.id
                ? "text-white"
                : "text-black"
            }`}>{sdk.name}</div>
            </div>
          </Card>
        ))}
      </div>
      </div>
    </div>
  );
};

export default SDKSelector;