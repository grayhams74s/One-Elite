"use client"

import { useState } from "react";
import { LogOut, Settings, User } from "lucide-react";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  return (
    <div className="flex items-center p-4 relative">
      {/** Mobile Sidebar */}
      <div className="flex w-full justify-end">
        <div className="flex items-center justify-center gap-x-4 relative">
          Felix Angcot Jr.
          <div
            className="bg-black p-2 rounded-full cursor-pointer"
            onClick={toggleModal}
          >
            <User className="text-white" />
          </div>

          {isModalVisible && (
            <div className="absolute top-full right-0 mt-2 bg-white p-4 px-8 shadow-md rounded-md z-50">
               <div className="justify-start items-center flex flex-col gap-y-5 w-full cursor-pointer">
                   <h1 className="font-extrabold flex gap-x-2 hover:text-black/70"><User />Account</h1>
                   <h1 className="font-extrabold flex gap-x-2 hover:text-black/70"><Settings />Settings</h1>
                   <h1 
                     onClick={() => signOut({ callbackUrl: "/" })} 
                     className="font-extrabold flex gap-x-2 hover:text-black/70"
                   >
                     <LogOut />Logout
                   </h1>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
