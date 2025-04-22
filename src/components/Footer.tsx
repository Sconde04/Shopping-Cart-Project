// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[rgb(60,60,60)] text-md text-center text-white py-8 border-t">
      &copy; {new Date().getFullYear()} Shopping Cart. All rights reserved.
    </footer>
  );
};
  
export default Footer;