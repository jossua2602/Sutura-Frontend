"use client";

import { useState, useEffect } from "react";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

interface UserAccount {
  user_id: number;
  username: string;
  email: string;
  role: string;
  status: string;
  created_at?: string;
}

export default function ManageAccountsPage() {
  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "", // Opsyonal kapag Edit mode
    role: "System Admin",
    status: "Active"
  });

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/admin/accounts");
        const data = await response.json();
        if (data.status === 'success') {
          setAccounts(data.data);
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // TATAWAGIN KAPAG BERDE O EDIT BUTTON ANG PININDOT
  const openEditModal = (account: UserAccount) => {
    setIsEditMode(true);
    setEditingUserId(account.user_id);
    setFormData({
      username: account.username,
      email: account.email,
      password: "", // Iwang blanko, papalitan lang kung mag-iinput si admin
      role: account.role,
      status: account.status
    });
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setEditingUserId(null);
    setFormData({ username: "", email: "", password: "", role: "System Admin", status: "Active" });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Alamin natin kung POST (Add) o PUT (Edit) ang gagamitin natin base sa mode
    const url = isEditMode 
      ? `http://127.0.0.1:8000/api/admin/accounts/${editingUserId}`
      : "http://127.0.0.1:8000/api/admin/accounts";
      
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        alert(isEditMode ? "Account updated successfully!" : "Success! User created.");
        
        if (isEditMode) {
          // I-update ang partikular na row sa state
          setAccounts(accounts.map(acc => acc.user_id === editingUserId ? result.data : acc));
        } else {
          // I-add ang bago sa pinakataas ng table
          setAccounts([result.data, ...accounts]);
        }
        
        setIsModalOpen(false);
      } else {
        alert("Error: " + (result.message || "Failed to save user."));
      }
    } catch (error) {
      alert("Something went wrong with the server.");
    }
  };

  const handleStatusToggle = async (userId: number, currentStatus: string) => {
    const isActive = currentStatus.trim().toLowerCase() === 'active';
    const newStatus = isActive ? 'Suspended' : 'Active';
    const actionText = isActive ? 'suspend' : 'reactivate';

    if (!confirm(`Are you sure you want to ${actionText} this account?`)) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/accounts/${userId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        alert(result.message);
        setAccounts(accounts.map(acc => acc.user_id === userId ? { ...acc, status: newStatus } : acc));
      } else {
        alert("Failed to update status.");
      }
    } catch (error) {
      alert("Something went wrong.");
    }
  };

  return (
    <div className={`max-w-7xl mx-auto space-y-8 ${inter.className} relative`}>
      
      <div className="flex justify-between items-end">
        <div>
          <h1 className={`${playfair.className} text-3xl text-[#4A3F3A] mb-2`}>
            Manage Accounts
          </h1>
          <p className="text-[#8A7F78] text-sm">
            Control platform-level user profiles, roles, and access across the SUTURA system.
          </p>
        </div>
        
        <button 
          onClick={openAddModal}
          className="px-5 py-2.5 bg-[#A88A7B] text-white text-sm font-medium rounded-xl hover:bg-[#8E7265] transition-colors shadow-sm"
        >
          + Add New User
        </button>
      </div>

      <div className="bg-[#FFFFFF] rounded-[24px] border border-[#D8CDC5] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F6F1ED]/50 border-b border-[#D8CDC5]">
                <th className="px-6 py-4 text-xs font-semibold text-[#8A7F78] uppercase tracking-wider">Username</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#8A7F78] uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#8A7F78] uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#8A7F78] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#8A7F78] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8CDC5]">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-[#8A7F78] text-sm animate-pulse">
                    Loading accounts...
                  </td>
                </tr>
              ) : accounts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-[#8A7F78] text-sm">
                    No accounts found in the system.
                  </td>
                </tr>
              ) : (
                accounts.map((account) => (
                  <tr key={account.user_id} className="hover:bg-[#F6F1ED]/30 transition-colors">
                    <td className="px-6 py-5 text-sm font-medium text-[#4A3F3A]">
                      {account.username}
                    </td>
                    <td className="px-6 py-5 text-sm text-[#8A7F78]">
                      {account.email}
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                        {account.role}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        account.status.trim().toLowerCase() === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {account.status.charAt(0).toUpperCase() + account.status.slice(1).toLowerCase()}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right space-x-4">
                      {/* BINUHAY NA EDIT BUTTON */}
                      <button 
                        onClick={() => openEditModal(account)}
                        className="text-sm font-medium text-[#A88A7B] hover:text-[#8E7265] transition-colors"
                      >
                        Edit
                      </button>
                      
                      <button 
                        onClick={() => handleStatusToggle(account.user_id, account.status)}
                        className={`text-sm font-medium transition-colors ${
                          account.status.trim().toLowerCase() === 'active' ? 'text-red-600 hover:text-red-700' : 'text-emerald-600 hover:text-emerald-700'
                        }`}
                      >
                        {account.status.trim().toLowerCase() === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl border border-[#D8CDC5] overflow-hidden">
            <div className="bg-[#F6F1ED] px-6 py-4 border-b border-[#D8CDC5] flex justify-between items-center">
              {/* Dynamic Title depende kung Add o Edit */}
              <h3 className={`${playfair.className} text-xl text-[#4A3F3A]`}>
                {isEditMode ? "Edit User Account" : "Add New User"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#8A7F78] hover:text-red-500 font-bold">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#8A7F78] mb-1">Username</label>
                <input required type="text" name="username" value={formData.username} onChange={handleInputChange} 
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-[#4A3F3A] focus:outline-none focus:border-[#A88A7B] focus:ring-1 focus:ring-[#A88A7B]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#8A7F78] mb-1">Email Address</label>
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} 
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-[#4A3F3A] focus:outline-none focus:border-[#A88A7B] focus:ring-1 focus:ring-[#A88A7B]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#8A7F78] mb-1">
                  Password {isEditMode && <span className="text-gray-400 font-normal">(Leave blank to keep current)</span>}
                </label>
                <input required={!isEditMode} type="password" name="password" value={formData.password} onChange={handleInputChange} 
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-[#4A3F3A] focus:outline-none focus:border-[#A88A7B] focus:ring-1 focus:ring-[#A88A7B]" placeholder={isEditMode ? "••••••••" : ""} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#8A7F78] mb-1">Role</label>
                  <select name="role" value={formData.role} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-[#4A3F3A] focus:outline-none focus:border-[#A88A7B] focus:ring-1 focus:ring-[#A88A7B]">
                    <option value="System Admin">System Admin</option>
                    <option value="Shop Owner">Shop Owner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#8A7F78] mb-1">Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-[#4A3F3A] focus:outline-none focus:border-[#A88A7B] focus:ring-1 focus:ring-[#A88A7B]">
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 text-sm font-medium text-[#8A7F78] bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#A88A7B] rounded-lg hover:bg-[#8E7265] transition-colors shadow-sm">
                  {isEditMode ? "Update User" : "Save User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}