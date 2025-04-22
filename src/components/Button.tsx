type ButtonProps = {
  label: React.ReactNode; // Ahora acepta ReactNode para permitir iconos y texto
  onClick: () => void;
  className?: string;
};

export const Button = ({ label, onClick, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 bg-[rgb(60,60,60)] text-white text-sm font-semibold rounded-lg hover:bg-black transition ${className}`}
    >
      {label}
    </button>
  );
};