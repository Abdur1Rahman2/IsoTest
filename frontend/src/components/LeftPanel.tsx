import { Cpu, Orbit } from "lucide-react";

export function LeftPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F4D] via-[#1B4DFF] to-[#00A0B0]"></div>
      
      {/* Animated Overlay Rings */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border-2 border-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border-2 border-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center px-16 text-white">
        {/* Logo */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <Cpu className="w-12 h-12" strokeWidth={1.5} />
              <Orbit className="w-6 h-6 absolute -top-1 -right-1 text-[#00A0B0]" strokeWidth={2} />
            </div>
            <div>
              <h1 className="tracking-tight">IsoTest AI</h1>
              <p className="text-sm text-white/70">Isolated AI-Powered .NET API Tester</p>
            </div>
          </div>
        </div>
        
        {/* Headline */}
        <div className="space-y-4">
          <h2 className="text-5xl leading-tight">
            Smart & Isolated<br />API Testing.
          </h2>
          <p className="text-lg text-white/80 max-w-md leading-relaxed">
            Welcome to IsoTest AI – an AI-driven automation platform for faster, smarter, and isolated API testing.
          </p>
        </div>
        
        {/* Decorative Element */}
        <div className="mt-16 flex gap-2">
          <div className="w-16 h-1 bg-white/60 rounded-full"></div>
          <div className="w-8 h-1 bg-white/40 rounded-full"></div>
          <div className="w-4 h-1 bg-white/20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
