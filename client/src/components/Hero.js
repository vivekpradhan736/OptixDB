import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      <div className="absolute inset-0 bg-[#333b4c]"></div>
      <div className="relative max-w-6xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 bg-white bg-clip-text text-transparent">
            Get Started with OptixDB
          </h1>
          <p className="text-sm md:text-xl text-[#d5d1d1] max-w-xl mx-auto leading-relaxed">
            Transform your media workflow with powerful image and video optimization, 
            transformation, and delivery capabilities.
          </p>
        </div>
        
        <div className="flex justify-center">
          <img 
            src="https://res.cloudinary.com/prod/image/upload/v1713248857/developer-getting-started/gs-horz-steps.svg"
            alt="Cloudinary workflow: Upload, Optimize, Transform"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;