import CartIcon from "./CartIcon";
 
export const Header = () => {
  return (
    <header className="w-full">
      <div className="bg-[rgb(60,60,60)] text-white text-sm text-center py-2">
        Free shipping on all orders over $200! For a limited time only.
      </div>
      <div className="relative flex justify-end items-center px-12 py-12 border-b">
        {/* Title centered absolutely */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold">
          @Shopping Cart
        </h1>

        {/* Cart icon aligned to the right */}
        <div className="relative">
          <CartIcon itemCount={0}/>
          <span className="absolute top-[-8px] right-[-8px] text-xs bg-[rgb(60,60,60)] text-white rounded-full px-1">
            2
          </span>
        </div>
      </div>
    </header>
  );
};