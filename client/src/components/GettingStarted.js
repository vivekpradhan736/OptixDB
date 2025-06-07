import Hero from "./Hero.js";
import SDKSelector from "./SDKSelector.js";
import InstallExamples from "./InstallExamples.js";
import CodeExamples from "./CodeExamples.js";
import ExploreSection from "./ExploreSection.js";
import { useState } from "react";

const GettingStarted = () => {
    const [selectedSDK, setSelectedSDK] = useState("nodejs");
    console.log("selectedSDK",selectedSDK)
  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 max-h-[630px] overflow-y-auto remove-scrollbar">
      <Hero />
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-3">
        <SDKSelector selectedSDK={selectedSDK} setSelectedSDK={setSelectedSDK} />
        <InstallExamples selectedSDK={selectedSDK} />
        <CodeExamples selectedSDK={selectedSDK} />
        <ExploreSection />
      </div>
    </div>
  );
};

export default GettingStarted;