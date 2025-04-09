// src/components/Button.tsx
type ButtonProps = {
  label: string;
  onClick?: () => void;
  className?: string;
};

export const Button = ({ label, onClick, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition ${className}`}
    >
      {label}
    </button>
  );
};