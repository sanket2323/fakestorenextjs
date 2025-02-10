"use client";

import { useState } from "react";
import Script from "next/script";

export default function Home() {
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const createOrder = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amount * 100 }),
      });

      if (!res.ok) {
        throw new Error("Failed to create order");
      }

      const data = await res.json();

      if (!data.order) {
        throw new Error("No order data received");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: data.order.id,
        handler: async function (response: any) {

          //verify payment
          try {
            // You can make an API call here to verify the payment
            const res = await fetch("/api/order/verifyOrder", {
              method: "POST",
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            
          } catch (err) {
            console.error("Payment verification failed", err);
          }
        },
        prefill: {
          name: "Test User",
          email: "test.user@example.com",
        },
        theme: {
          color: "#3B82F6",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="beforeInteractive"
      />

      <div className="flex flex-col gap-4 items-center">
        <input
          type="string"
          className="px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          min="0"
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
          onClick={createOrder}
          disabled={loading || amount <= 0}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}

// 'use client'
// import React, { useState, useEffect } from "react";
// import Script from "next/script";

// export default function Home() {
//   const [amount, setAmount] = useState<number>(0);
//   const [loading, setLoading] = useState(false);
//   const [alert, setAlert] = useState<{
//     show: boolean;
//     type: "success" | "error";
//     message: string;
//   }>({ show: false, type: "success", message: "" });

//   // Auto-hide alert after 5 seconds
//   useEffect(() => {
//     if (alert.show) {
//       const timer = setTimeout(() => {
//         setAlert({ ...alert, show: false });
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [alert]);

//   const createOrder = async () => {
//     try {
//       setLoading(true);
//       setAlert({ show: false, type: "success", message: "" });

//       const res = await fetch("/api/order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ amount: amount * 100 }),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to create order");
//       }

//       const data = await res.json();

//       if (!data.order) {
//         throw new Error("No order data received");
//       }

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount: data.order.amount,
//         currency: data.order.currency,
//         name: "Your Company Name",
//         description: "Test Transaction",
//         order_id: data.order.id,
//         handler: async function (response: any) {
//           try {
//             const verifyRes = await fetch("/api/order/verifyOrder", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 orderId: response.razorpay_order_id,
//                 razorpayPaymentId: response.razorpay_payment_id,
//                 razorpaySignature: response.razorpay_signature,
//               }),
//             });

//             if (verifyRes.ok) {
//               setAlert({
//                 show: true,
//                 type: "success",
//                 message: `Payment Successful! Payment ID: ${response.razorpay_payment_id}`,
//               });
//               setAmount(0); // Reset amount after successful payment
//             } else {
//               setAlert({
//                 show: true,
//                 type: "error",
//                 message: "Payment verification failed. Please try again.",
//               });
//             }
//           } catch (err) {
//             setAlert({
//               show: true,
//               type: "error",
//               message: "Payment verification failed. Please try again.",
//             });
//           }
//         },
//         prefill: {
//           name: "Test User",
//           email: "test.user@example.com",
//         },
//         theme: {
//           color: "#3B82F6",
//         },
//         modal: {
//           ondismiss: function () {
//             setAlert({
//               show: true,
//               type: "error",
//               message: "Payment cancelled. Please try again.",
//             });
//           },
//         },
//       };

//       const paymentObject = new (window as any).Razorpay(options);
//       paymentObject.open();
//     } catch (error) {
//       console.error("Error:", error);
//       setAlert({
//         show: true,
//         type: "error",
//         message: "Something went wrong! Please try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 gap-8">
//       <Script
//         src="https://checkout.razorpay.com/v1/checkout.js"
//         strategy="beforeInteractive"
//       />

//       {/* Alert Component */}
//       {alert.show && (
//         <div
//           className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg max-w-md transition-all duration-500 ${
//             alert.type === "success"
//               ? "bg-green-100 border border-green-400 text-green-700"
//               : "bg-red-100 border border-red-400 text-red-700"
//           }`}
//         >
//           <div className="flex items-center justify-between">
//             <p className="font-medium">{alert.message}</p>
//             <button
//               onClick={() => setAlert({ ...alert, show: false })}
//               className="ml-4 text-gray-500 hover:text-gray-700"
//             >
//               ×
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="flex flex-col gap-4 items-center">
//         <input
//           type="string"
//           className="px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Enter amount"
//           value={amount}
//           onChange={(e) => setAmount(Number(e.target.value))}
//           min="0"
//         />

//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
//           onClick={createOrder}
//           disabled={loading || amount <= 0}
//         >
//           {loading ? "Processing..." : "Pay Now"}
//         </button>
//       </div>
//     </div>
//   );
// }