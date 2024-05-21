import React from "react";
import Image from "next/image";
const Header = () => {
  return (
    <div className="flex justify-center items-center h-20 bg-black">
      <Image
        alt="logo"
        src="/logo-jeep.png"
        height={1500}
        width={1500}
        className="w-20"
      />
    </div>
  );
};

export default Header;
