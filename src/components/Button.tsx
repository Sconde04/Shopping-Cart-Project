type ButtonProps = {
  label: React.ReactNode; // Use ReactNode to allow icons and text
  onClick: () => void;
  className?: string;
};

export const Button = ({ label, onClick, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 bg-[rgb(60,60,60)] text-white text-sm font-semibold rounded-lg hover:bg-black cursor-pointer transition ${className}`}
    >
      {label}
    </button>
  );
};
