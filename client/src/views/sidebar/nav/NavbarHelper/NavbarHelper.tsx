import { RiProfileLine } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { LuLogOut } from "react-icons/lu";

import { clearState, logout } from "../../../../store/reducers/auth";

export const NavbarHelper = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const handleLogout = () => {
    logout();
    dispatch(clearState());
  }
  return (
    <ul
      className="py-2 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="dropdownHoverButton"
    >
      <li className="cursor-pointer flex items-center justify-between pl-4 pr-6 hover:bg-borderColor">
        <span className="text-base block py-2 text-lightPurple">
          Profile
        </span>
        <RiProfileLine className="w-5 h-5 text-lightPurple" />
      </li>
      <li className="cursor-pointer flex items-center justify-between pl-4 pr-6 hover:bg-borderColor">
        <span className="text-base block py-2 text-lightPurple">
          Settings
        </span>
        <IoIosSettings className="w-5 h-5 text-lightPurple" />
      </li>
      <li className="cursor-pointer flex items-center justify-between pl-4 pr-6 hover:bg-borderColor" onClick={handleLogout}>
        <span className="text-base block py-2 text-lightPurple">
          Log out
        </span>
        <LuLogOut className="w-5 h-5 text-lightPurple" />
      </li>
    </ul>
  );
};
