import { Card } from "./ui/card";
import { Button } from "./ui/button";

const ExploreSection = () => {
  const examples = [
    {
      title: "Video",
      description: "Advanced video processing and streaming",
      url: "/assets/videos/video-module.webm",
      badge: "NEW"
    },
    {
      title: "Transform and Customize",
      description: "Apply AI-powered transformations",
      url: "/assets/videos/transform-module.webm",
      badge: null
    },
    {
      title: "Optimize and Deliver",
      description: "Automatic format and quality optimization",
      url: "/assets/videos/optimize-module.webm",
      badge: null
    },
    {
      title: "Manage and Analyze",
      description: "Asset management and analytics dashboard",
      url: "/assets/videos/manage-module.webm",
      badge: null
    }
  ];

  const handlePlay = (e) => {
    e.target.play();
  };

  const handlePause = (e) => {
    e.target.pause();
    e.target.currentTime = 0; // optional: reset to start
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 bg-[#fa7275] text-white rounded-full flex items-center justify-center font-bold">
          4
        </div>
        <h2 className="text-lg font-medium text-gray-900">Explore</h2>
      </div>

      <div className="flex items-stretch gap-10">
        <div className=" w-[0.10rem] self-stretch ml-5 border border-dashed border-[#d1d6e0]"></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {examples.map((example, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <div className="flex flex-col px-3">
              {/* <img
                src={example.image}
                alt={example.title}
                className="w-full h-48 object-cover  transition-transform duration-300"
              /> */}
              <video
        className="w-full h-44 object-cover  transition-transform duration-300 rounded-md"
        src={example.url}
        muted
        loop
        onMouseEnter={handlePlay}
        onMouseLeave={handlePause}
      />
              <h1 className="text-center font-semibold pt-2">{example.title}</h1>
            </div>
          </Card>
        ))}
      </div>
      </div>
    </div>
  );
};

export default ExploreSection;