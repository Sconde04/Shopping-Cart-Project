// SafeEasySection.tsx
import React from 'react';
import { GoCreditCard } from "react-icons/go";
import { SlReload } from "react-icons/sl";
import { CiDeliveryTruck } from "react-icons/ci";
import { FiChevronRight } from "react-icons/fi";

const SafeEasySection: React.FC = () => {
  return (
    <div className="rounded-lg w-full max-w-6xl mt-15">
      <h2 className="text-xl font-semibold mb-4">Safe & easy shopping</h2>
      <div className="divide-y divide-gray-200 ml-4">
        <div className="flex items-center py-8">
          <SlReload className="text-gray-500 mr-4 text-xl" />
          <span className="text-base flex-1">Free returns for 30 days</span>
          <FiChevronRight className="text-gray-500 text-lg" />
        </div>
        <div className="flex items-center py-8">
          <GoCreditCard className="text-gray-500 mr-4 text-xl" />
          <span className="text-base flex-1">Convenient payment methods</span>
          <FiChevronRight className="text-gray-500 text-lg" />
        </div>
        <div className="flex items-center py-8">
          <CiDeliveryTruck className="text-gray-500 mr-4 text-xl" />
          <span className="text-base flex-1">Deliver to home or pick-up point</span>
          <FiChevronRight className="text-gray-500 text-lg" />
        </div>
      </div>
    </div>
  );
};

export default SafeEasySection;