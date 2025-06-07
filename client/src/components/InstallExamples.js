import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CheckCheck, Copy } from "lucide-react";

const InstallExamples = (selectedSDK) => {
  const npmCode = `npm i optixdb`;
  const yarnCode = `yarn add optixdb`;
  const pnpmCode = `pnpm i optixdb`;

  const [activeTab, setActiveTab] = useState("01");
  const [tabContent, setTabContent] = useState(npmCode);
  const [copied, setCopied] = useState(false);

  const tabs = [
    { id: "01", label: "npm", content: npmCode },
    { id: "02", label: "yarn", content: yarnCode },
    { id: "03", label: "pnpm", content: pnpmCode },
  ];

  const handleCopy = () => {
      navigator.clipboard.writeText(tabContent)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 3000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 bg-[#fa7275] text-white rounded-full flex items-center justify-center font-bold">
          2
        </div>
        <h2 className="text-lg font-medium text-gray-900">
          Install OptixDB
        </h2>
        <Badge variant="secondary">Get the OptixDB Node.js SDK</Badge>
      </div>

      <div className="flex items-stretch gap-10">
        <div className=" w-[0.10rem] self-stretch ml-5 border border-dashed border-[#d1d6e0]"></div>

        <Card className="overflow-hidden w-full">
          <div className="border-b bg-gray-50">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-6 py-3 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "bg-white text-[#ea6365] border-b-2 border-[#ea6365]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setTabContent(tab.content);
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="px-4">
            {(() => {
              switch (activeTab) {
                case "01":
                  return (
                    <div className="bg-[#f9fafb] hover:bg-[#ebebeb] flex justify-between group cursor-pointer text-[#ea6365] p-4 rounded-lg font-mono text-sm">
                      {tabContent}
                      <button onClick={handleCopy} className="group-hover:block block sm:hidden text-black hover:bg-[#ffffff] px-2 rounded-md">{copied ? "Copied" : "Copy"} {copied ? (<CheckCheck className="inline w-3 h-4 text-[#1ca25a]" strokeWidth={2} />) : (<Copy className="inline w-3 h-4" strokeWidth={2} />)}</button>
                    </div>
                  );
                case "02":
                    return (
                    <div className="bg-[#f9fafb] hover:bg-[#ebebeb] flex justify-between group cursor-pointer text-[#ea6365] p-4 rounded-lg font-mono text-sm">
                      {tabContent}
                      <button onClick={handleCopy} className="group-hover:block block sm:hidden text-black hover:bg-[#ffffff] px-2 rounded-md">{copied ? "Copied" : "Copy"} {copied ? (<CheckCheck className="inline w-3 h-4 text-[#1ca25a]" strokeWidth={2} />) : (<Copy className="inline w-3 h-4" strokeWidth={2} />)}</button>
                    </div>
                  );
                case "03":
                    return (
                    <div className="bg-[#f9fafb] hover:bg-[#ebebeb] flex justify-between group cursor-pointer text-[#ea6365] p-4 rounded-lg font-mono text-sm">
                      {tabContent}
                      <button onClick={handleCopy} className="group-hover:block block sm:hidden text-black hover:bg-[#ffffff] px-2 rounded-md">{copied ? "Copied" : "Copy"} {copied ? (<CheckCheck className="inline w-3 h-4 text-[#1ca25a]" strokeWidth={2} />) : (<Copy className="inline w-3 h-4" strokeWidth={2} />)}</button>
                    </div>
                  );
                default:
                  return null;
              }
            })()}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InstallExamples;
