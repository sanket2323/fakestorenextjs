import React from "react";
import { Menu } from "lucide-react";

const page = () => {
  return (
    <div>
      <div className="min-h-screen bg-white text-[#727272] ">
        {/* Header */}
        <div className="bg-green-600 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Menu className="text-white mr-2" />
            <h1 className="text-white text-lg">Buy Now</h1>
          </div>
        </div>

        {/* Order Summary */}
        <div className="flex justify-center mt-7">
          <div className="p-4 justify-center w-full md:w-auto max-w-xl  flex-grow ">
            <div className=" p-4 text-center">
              <p className="text-[20px] font-medium">Credit Balance: 2500</p>
            </div>

            <div className="bg-[#F9F9F9] shadow-sm rounded-lg mt-4 p-[10px]">
              <h2 className="text-[20px] font-medium  mb-4">Order Summary</h2>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Survey No</span>
                  <span className="">A12</span>
                </div>
                <div className="flex justify-between">
                  <span>Village</span>
                  <span className="">Ratnagiri</span>
                </div>
                <div className="flex justify-between">
                  <span>Taluka</span>
                  <span className="">Chiplun</span>
                </div>
                <div className="flex justify-between">
                  <span>District</span>
                  <span className="">Ratnagiri</span>
                </div>
                <div className="flex justify-between">
                  <span>State</span>
                  <span className="">Maharashtra</span>
                </div>
              </div>
            </div>

            <div className="bg-[#F9F9F9] shadow-sm rounded-lg p-[10px] mt-[20px]">
              <div className=" flex justify-between items-center">
                <span className="text-[20px] font-medium">Land Map</span>
                <span className="">$499</span>
              </div>

              <div className="pt-[10px] flex justify-between items-center">
                <span className="">Postion and Surrounding land</span>
                <form action="">
                  <input
                    type="checkbox"
                    className="accent-green-600 w-5 h-5"
                    name="landmap"
                    id="landmap"
                  />
                </form>
              </div>
            </div>

            <div className="bg-[#F9F9F9] shadow-sm rounded-lg p-[10px] mt-[20px]">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[20px]">Total </span>

                <div className="flex flex-col">
                  <span className="text-[20px] font-medium text-[#727272]">
                    750
                  </span>
                  <span className="text-[12px]">Credits</span>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className=" h-auto  px-2 py-2 text-white font-bold my-2 
                 bg-green-600 
                 hover:bg-green-700 
                 transition-colors 
                 duration-300 
                 ease-in-out
                 text-base md:text-sm" // Reduced text size on mobile
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

{
  /* <div className=" bg-green-600 group hover:bg-green-700 transition-colors duration-300 ease-in-out">
              <div className="max-w-2xl mx-auto px-4 flex md:justify-end">
                <button
                  className="w-full h-auto py-2 text-white font-bold my-2 
                 bg-green-600 
                 group-hover:bg-green-700 
                 transition-colors 
                 duration-300 
                 ease-in-out
                 text-base md:text-sm" // Reduced text size on mobile
                >
                  Purchase
                </button>
              </div>
            </div> */
}

{
  /* <div className="border-t pt-4 flex justify-between items-center">
                <span className="font-bold">Total Credits</span>
                <span className="text-lg font-bold text-green-600">
                  750,000
                </span>
              </div> */
}
