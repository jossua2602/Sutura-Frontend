import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600"] });

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Dashboard Welcome Box */}
      <div className="bg-[#FFFFFF] p-8 rounded-[24px] border border-[#D8CDC5] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <h1 className={`${playfair.className} text-3xl text-[#4A3F3A] mb-2`}>
          Welcome to your Dashboard
        </h1>
        <p className="text-[#8A7F78]">
          Manage your tailoring workflows, track active orders, and monitor your inventory all in one place.
        </p>
      </div>

      {/* Placeholder for Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-32 bg-[#FFFFFF] rounded-2xl border border-[#D8CDC5] flex items-center justify-center text-[#8A7F78]">Stats Card 1</div>
        <div className="h-32 bg-[#FFFFFF] rounded-2xl border border-[#D8CDC5] flex items-center justify-center text-[#8A7F78]">Stats Card 2</div>
        <div className="h-32 bg-[#FFFFFF] rounded-2xl border border-[#D8CDC5] flex items-center justify-center text-[#8A7F78]">Stats Card 3</div>
      </div>

    </div>
  );
}