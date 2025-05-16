import React from "react";
import { FiUser, FiEdit2 } from "react-icons/fi";

const BuyerInfoCard: React.FC = () => {
  return (
    <div className="mb-6">
      {/* Output the buyer's name and the change address button */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-2xl text-gray-500">
            <FiUser />
          </div>
          <span className="text-lg font-semibold text-gray-800">John Doe</span>
        </div>
        <button
          className="flex items-center text-gray-600 hover:text-blue-600 text-sm mr-6 underline"
          type="button"
        >
          <FiEdit2 className="mr-1" />
          Change address
        </button>
      </div>
      {/* Interior of the card */}
      <div className="bg-white rounded-xl shadow p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div>
            <div className="text-gray-500 text-sm mb-1">Email</div>
            <div>johndoe@gmail.com</div>
            <div className="mt-6 text-gray-500 text-sm mb-1">Mobile phone</div>
            <div>+1 0*******09</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm mb-1">Address</div>
            <div>Ha******** 32<br />***50 IL*******</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerInfoCard;