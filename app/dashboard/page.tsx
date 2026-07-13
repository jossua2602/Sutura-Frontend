"use client";

import { useState, useEffect } from "react";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

interface DashboardStats {
  total_users: number;
  active_shops: number;
  pending_shops: number;
  total_revenue: number;
}

export default function AdminDashboardHome() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/admin/dashboard-stats");
        const result = await response.json();
        
        if (result.status === 'success') {
          setStats(result.data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className={`max-w-7xl mx-auto space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 ${inter.className}`}>
      
      {/* Header Section - Responsive Flex */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0">
        <div>
          <h1 className={`${playfair.className} text-2xl sm:text-3xl text-[#4A3F3A] mb-1 sm:mb-2`}>
            Overview Dashboard
          </h1>
          <p className="text-[#8A7F78] text-xs sm:text-sm">
            Welcome back! Here's what's happening across the SUTURA platform today.
          </p>
        </div>
        <button className="w-full sm:w-auto px-5 py-2.5 bg-white border border-[#D8CDC5] text-[#4A3F3A] text-sm font-medium rounded-xl hover:bg-[#F6F1ED] transition-colors shadow-sm">
          Generate Report
        </button>
      </div>

      {/* Analytics Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Card 1 */}
        <div className="bg-white p-5 sm:p-6 rounded-[20px] sm:rounded-[24px] border border-[#D8CDC5] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
          <p className="text-[#8A7F78] text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2">Total Users</p>
          <h2 className={`${playfair.className} text-2xl sm:text-3xl lg:text-4xl text-[#4A3F3A]`}>
            {isLoading ? "..." : stats?.total_users || 0}
          </h2>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 sm:p-6 rounded-[20px] sm:rounded-[24px] border border-[#D8CDC5] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
          <p className="text-[#8A7F78] text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2">Active Shops</p>
          <h2 className={`${playfair.className} text-2xl sm:text-3xl lg:text-4xl text-emerald-600`}>
            {isLoading ? "..." : stats?.active_shops || 0}
          </h2>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 sm:p-6 rounded-[20px] sm:rounded-[24px] border border-[#D8CDC5] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
          <p className="text-[#8A7F78] text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2">Pending Approvals</p>
          <div className="flex items-end gap-3">
            <h2 className={`${playfair.className} text-2xl sm:text-3xl lg:text-4xl text-amber-600`}>
              {isLoading ? "..." : stats?.pending_shops || 0}
            </h2>
            {stats?.pending_shops ? (
              <span className="mb-1 sm:mb-2 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                <span className="animate-ping absolute inline-flex h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-amber-500"></span>
              </span>
            ) : null}
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 sm:p-6 rounded-[20px] sm:rounded-[24px] border border-[#D8CDC5] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
          <p className="text-[#8A7F78] text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2">Platform Revenue</p>
          <h2 className={`${playfair.className} text-2xl sm:text-3xl lg:text-4xl text-blue-600`}>
            {isLoading ? "..." : `₱${stats?.total_revenue || 0}`}
          </h2>
        </div>

      </div>

      {/* Quick Action / Placeholder Section for Chart */}
      <div className="mt-8 bg-[#F6F1ED] rounded-[20px] sm:rounded-[24px] border border-[#D8CDC5] p-6 sm:p-8 flex items-center justify-center min-h-[250px] sm:min-h-[300px]">
         <div className="text-center">
            <h3 className={`${playfair.className} text-xl text-[#4A3F3A] mb-2`}>System Health</h3>
            <p className="text-sm text-[#8A7F78]">Dito natin ilalagay ang graphical chart o graph sa mga susunod na phase!</p>
         </div>
      </div>
      
    </div>
  );
}