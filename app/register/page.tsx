"use client";



import { useState } from "react";



export default function ShopRegistrationForm() {

  const [formData, setFormData] = useState({

    username: "",

    email: "",

    password: "",

    shop_name: "",

    address: "",

  });

 

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");



const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

  setFormData({

    ...formData,

    [e.target.name]: e.target.value,

  });

};



  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    setLoading(true);

    setMessage("");



    try {

      const response = await fetch("http://127.0.0.1:8000/api/register-shop", {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

          "Accept": "application/json",

        },

        body: JSON.stringify(formData),

      });



      const data = await response.json();



      if (response.ok) {

        setMessage("Success! Your shop application has been submitted and is pending review.");

        setFormData({ username: "", email: "", password: "", shop_name: "", address: "" }); // Reset form

      } else {

        setMessage(data.message || "Something went wrong. Please check your inputs.");

      }

    } catch (error) {

      setMessage("Cannot connect to the server. Please try again later.");

    } finally {

      setLoading(false);

    }

  };



  return (

    <div className="min-h-screen bg-[#F6F1ED] flex items-center justify-center p-6">

      <div className="bg-white max-w-xl w-full p-10 rounded-[32px] shadow-sm border border-[#D8CDC5]">

        <div className="text-center mb-10">

          <h1 className="text-3xl font-bold text-[#4A3F3A] mb-2">Partner with SUTURA</h1>

          <p className="text-[#8A7F78] text-sm">Register your tailoring business and reach more customers.</p>

        </div>



        {message && (

          <div className={`p-4 mb-6 rounded-xl text-sm ${message.includes('Success') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>

            {message}

          </div>

        )}



        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Owner Account Details */}

          <div>

            <h2 className="text-sm font-bold text-[#4A3F3A] uppercase tracking-wider mb-4 border-b border-[#D8CDC5] pb-2">1. Account Details</h2>

            <div className="space-y-4">

              <div>

                <label className="block text-sm font-medium text-[#8A7F78] mb-1">Username</label>

                <input required type="text" name="username" value={formData.username} onChange={handleChange} className="w-full p-3 border border-[#D8CDC5] rounded-xl focus:ring-2 focus:ring-[#A88A7B] focus:outline-none" placeholder="johndoe123" />

              </div>

              <div>

                <label className="block text-sm font-medium text-[#8A7F78] mb-1">Email Address</label>

                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-[#D8CDC5] rounded-xl focus:ring-2 focus:ring-[#A88A7B] focus:outline-none" placeholder="john@example.com" />

              </div>

              <div>

                <label className="block text-sm font-medium text-[#8A7F78] mb-1">Password</label>

                <input required type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-3 border border-[#D8CDC5] rounded-xl focus:ring-2 focus:ring-[#A88A7B] focus:outline-none" placeholder="••••••••" />

              </div>

            </div>

          </div>



          {/* Shop Details */}

          <div className="pt-4">

            <h2 className="text-sm font-bold text-[#4A3F3A] uppercase tracking-wider mb-4 border-b border-[#D8CDC5] pb-2">2. Business Details</h2>

            <div className="space-y-4">

              <div>

                <label className="block text-sm font-medium text-[#8A7F78] mb-1">Shop Name</label>

                <input required type="text" name="shop_name" value={formData.shop_name} onChange={handleChange} className="w-full p-3 border border-[#D8CDC5] rounded-xl focus:ring-2 focus:ring-[#A88A7B] focus:outline-none" placeholder="e.g. Imperial Tailors" />

              </div>

              <div>

                <label className="block text-sm font-medium text-[#8A7F78] mb-1">Shop Address</label>

                <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-3 border border-[#D8CDC5] rounded-xl focus:ring-2 focus:ring-[#A88A7B] focus:outline-none" placeholder="Complete physical address" />

              </div>

            </div>

          </div>



  

{/* Subscription & Billing Selection */}
<div className="grid grid-cols-2 gap-4 mt-4">
  {/* Dropdown: Plan Name */}
  <div>
    <label className="block text-sm font-semibold text-[#8A7F78] mb-2">Plan</label>
    <select 
      name="plan" 
      required 
      defaultValue="" 
      onChange={handleChange} 
      className="w-full p-3 border border-[#D8CDC5] rounded-xl text-sm focus:ring-2 focus:ring-[#A88A7B] focus:outline-none"
    >
      <option value="" disabled>-- Choose Plan --</option>
      <option value="Basic">Basic</option>
      <option value="Pro">Pro</option>
      <option value="Premium">Premium</option>
    </select>
  </div>

  {/* Dropdown: Billing Cycle */}
  <div>
    <label className="block text-sm font-semibold text-[#8A7F78] mb-2">Billing Cycle</label>
    <select 
      name="billing_cycle" 
      required 
      defaultValue="" 
      onChange={handleChange} 
      className="w-full p-3 border border-[#D8CDC5] rounded-xl text-sm focus:ring-2 focus:ring-[#A88A7B] focus:outline-none"
    >
      <option value="" disabled>-- Choose Cycle --</option>
      <option value="Monthly">Monthly</option>
      <option value="Yearly">Yearly</option>
    </select>
  </div>
</div>

          <button

            type="submit"

            disabled={loading}

            className="w-full py-4 mt-4 rounded-xl bg-[#A88A7B] text-white font-semibold hover:bg-[#8e7264] transition-colors disabled:opacity-50"

          >

            {loading ? "Submitting Application..." : "Submit Registration"}

          </button>

        </form>

      </div>

    </div>

  );

}