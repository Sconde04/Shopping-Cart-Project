type CartIconProps = {
  itemCount?: number;
  className?: string; // Añadimos className para aceptar clases de estilo
};

const CartIcon = ({ itemCount = 0, className }: CartIconProps) => {
  return (
    <div className={`relative ${className}`}> {/* Aplicamos className aquí */}
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          d="M3 3h2l.4 2M7 13h10l4-8H5.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute top-[-8px] right-[-8px] text-xs bg-[rgb(60,60,60)] text-white rounded-full px-1">
          {itemCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;