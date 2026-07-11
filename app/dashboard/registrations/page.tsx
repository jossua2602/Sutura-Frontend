"use client";

import { useState, useEffect } from "react";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

interface Shop {
  shop_id: number;
  shop_name: string;
  address: string;
  verification_status: string;
  created_at: string;
}

export default function RegistrationsPage() {
  const [allShops, setAllShops] = useState<Shop[]>([]);
  const [activeTab, setActiveTab] = useState<string>("Pending");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all shops from the new API endpoint
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/admin/registrations");
        const data = await response.json();
        
        if (data.status === 'success') {
          setAllShops(data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShops();
  }, []);

  // Filter shops based on the selected tab
  const filteredShops = allShops.filter(shop => shop.verification_status === activeTab);

  const handleStatusUpdate = async (shopId: number, newStatus: string) => {
    if (!confirm(`Are you sure you want to mark this application as ${newStatus}?`)) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/registrations/${shopId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        alert(data.message);
        // I-update ang status ng shop sa loob ng React state para lumipat ito ng tab
        setAllShops(prevShops => 
          prevShops.map(shop => 
            shop.shop_id === shopId ? { ...shop, verification_status: newStatus } : shop
          )
        );
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className={`max-w-7xl mx-auto space-y-8 ${inter.className}`}>
      
      {/* Page Header */}
      <div>
        <h1 className={`${playfair.className} text-3xl text-[#4A3F3A] mb-2`}>
          Manage Registrations
        </h1>
        <p className="text-[#8A7F78] text-sm">
          Review, approve, or reject incoming shop applications to the SUTURA platform.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-[#FFFFFF] p-1 rounded-xl border border-[#D8CDC5] w-fit shadow-sm">
        {['Pending', 'Approved', 'Rejected'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === tab
                ? 'bg-[#A88A7B] text-white shadow-sm'
                : 'text-[#8A7F78] hover:text-[#4A3F3A] hover:bg-[#F6F1ED]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Data Table */}
      <div className="bg-[#FFFFFF] rounded-[24px] border border-[#D8CDC5] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F6F1ED]/50 border-b border-[#D8CDC5]">
                <th className="px-6 py-4 text-xs font-semibold text-[#8A7F78] uppercase tracking-wider">Shop Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#8A7F78] uppercase tracking-wider">Address</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#8A7F78] uppercase tracking-wider">Date Applied</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#8A7F78] uppercase tracking-wider">Status</th>
                {/* Ipapakita lang natin ang Actions column kung nasa Pending tab tayo */}
                {activeTab === 'Pending' && (
                  <th className="px-6 py-4 text-xs font-semibold text-[#8A7F78] uppercase tracking-wider text-right">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8CDC5]">
              
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-[#8A7F78] text-sm animate-pulse">
                    Loading applications...
                  </td>
                </tr>
              ) : filteredShops.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-[#8A7F78] text-sm">
                    No {activeTab.toLowerCase()} shop registrations found.
                  </td>
                </tr>
              ) : (
                filteredShops.map((shop) => (
                  <tr key={shop.shop_id} className="hover:bg-[#F6F1ED]/30 transition-colors">
                    <td className="px-6 py-5 text-sm font-medium text-[#4A3F3A]">
                      {shop.shop_name}
                    </td>
                    <td className="px-6 py-5 text-sm text-[#8A7F78] max-w-xs truncate">
                      {shop.address}
                    </td>
                    <td className="px-6 py-5 text-sm text-[#8A7F78]">
                      {formatDate(shop.created_at)}
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        shop.verification_status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                        shop.verification_status === 'Rejected' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {shop.verification_status}
                      </span>
                    </td>
                    {/* Ipapakita lang natin ang buttons kung nasa Pending tab tayo */}
                    {activeTab === 'Pending' && (
                      <td className="px-6 py-5 text-right space-x-3">
                        <button 
                          onClick={() => handleStatusUpdate(shop.shop_id, 'Approved')}
                          className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(shop.shop_id, 'Rejected')}
                          className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                        >
                          Reject
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}