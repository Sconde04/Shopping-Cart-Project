import React, { useState } from "react";
import { FaPaypal, FaApplePay } from "react-icons/fa6";

const paymentMethods = [
  {
    id: "paypal",
    label: "PayPal",
    icon: <span className="bg-gray-500 text-white rounded px-3 py-1 flex items-center text-xs font-semibold"><FaPaypal className="mr-1" />PayPal</span>,
  },
  {
    id: "applepay",
    label: "ApplePay",
    icon: <span className="bg-gray-500 text-white rounded px-3 py-1 flex items-center text-xs font-semibold"><FaApplePay className="mr-1" />Pay</span>,
  },
];

const PaymentMethodSelector: React.FC = () => {
  const [selected, setSelected] = useState("paypal");

  return (
    <div className="mb-8">
      <div className="text-xl font-semibold mb-4">Payment</div>
      <div className="bg-white rounded-xl shadow divide-y divide-gray-200">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className="flex items-center justify-between px-6 py-8 cursor-pointer hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                checked={selected === method.id}
                onChange={() => setSelected(method.id)}
                className="form-radio h-4 w-4 text-blue-600 bg-white border-gray-300"
              />
              <span className="font-medium text-base select-none">
                {method.label}
              </span>
            </div>
            {method.icon}
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;