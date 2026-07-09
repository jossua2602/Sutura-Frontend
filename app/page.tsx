import { Playfair_Display, Inter } from "next/font/google";

// Initialize the exact fonts from your design specifications
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["500", "600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function AdminDashboard() {
  return (
    // Background: Warm ivory / beige (#F6F1ED)
    <main className={`min-h-screen bg-[#F6F1ED] flex flex-col items-center justify-center p-4 ${inter.className}`}>
      
      {/* Card / Surface: Pure white (#FFFFFF) with Soft shadow and Light gray border (#D8CDC5) */}
      <div className="w-full max-w-[420px] bg-[#FFFFFF] border border-[#D8CDC5] rounded-[24px] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        
        {/* Brand Logo: Dark espresso (#4A3F3A) in Elegant Serif */}
        <div className="text-center mb-10">
          <h1 className={`${playfair.className} text-4xl text-[#4A3F3A] tracking-tight`}>
            sutura
          </h1>
        </div>

        {/* Headings: Dark espresso (#4A3F3A) */}
        <div className="text-center mb-8">
          <h2 className={`${playfair.className} text-3xl text-[#4A3F3A] font-medium mb-2`}>
            Welcome Back
          </h2>
          {/* Body Text: Muted taupe (#8A7F78) */}
          <p className="text-[#8A7F78] text-sm">
            Please enter your details below.
          </p>
        </div>

        {/* Input Form */}
        <div className="space-y-5">
          
          {/* Email Input */}
          <div>
            <label className="flex items-center gap-2 text-[#8A7F78] text-xs font-medium mb-2">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Address
            </label>
            <input 
              type="email" 
              placeholder="Email address here"
              className="w-full px-4 py-3 rounded-xl border border-[#D8CDC5] focus:outline-none focus:border-[#A88A7B] focus:ring-1 focus:ring-[#A88A7B]/30 text-[#4A3F3A] placeholder-[#8A7F78]/50 text-sm bg-transparent transition-all"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="flex items-center gap-2 text-[#8A7F78] text-xs font-medium mb-2">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Password
            </label>
            <div className="relative">
              <input 
                type="password" 
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl border border-[#D8CDC5] focus:outline-none focus:border-[#A88A7B] focus:ring-1 focus:ring-[#A88A7B]/30 text-[#4A3F3A] placeholder-[#8A7F78]/50 text-sm bg-transparent transition-all"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A7F78] hover:text-[#4A3F3A] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Options: Remember me & Forgot Password */}
          <div className="flex items-center justify-between mt-4">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="w-4 h-4 rounded border border-[#D8CDC5] group-hover:border-[#A88A7B] transition-colors flex items-center justify-center">
                {/* Checkbox implementation would go here */}
              </div>
              <span className="text-xs text-[#8A7F78]">Remember me</span>
            </label>
            <a href="#" className="text-xs text-[#8A7F78] hover:text-[#4A3F3A] transition-colors">
              Forgot password?
            </a>
          </div>

          {/* Primary Button: Dusty mocha (#A88A7B) with Deep mocha hover (#8E7265) */}
          <button className="w-full py-3.5 mt-2 bg-[#A88A7B] hover:bg-[#8E7265] text-white text-sm font-medium rounded-xl transition-colors duration-300">
            Sign In
          </button>
        </div>

        {/* Footer Area */}
        <div className="mt-8 text-center space-y-8">
          <p className="text-xs text-[#8A7F78]">
            Don&apos;t have an account? <a href="#" className="text-[#4A3F3A] font-semibold hover:underline">Sign Up</a>
          </p>
          
          <div className="space-y-2">
            <div className="flex justify-center items-center gap-3 text-[10px] text-[#8A7F78]/80">
              <a href="#" className="hover:text-[#4A3F3A] transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-[#4A3F3A] transition-colors">Terms of Service</a>
            </div>
            <p className="text-[10px] text-[#8A7F78]/60">
              © 2026 Sutura. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
