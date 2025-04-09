// src/components/Footer.tsx
export const Footer = () => {
    return (
      <footer className="bg-[rgb(60,60,60)] text-md text-center text-white py-8 border-t">
        &copy; {new Date().getFullYear()} Shopping Cart. All rights reserved.
      </footer>
    );
  };  