import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.isAuthenticated);

  const navLinks = [
    {
      name: "Home",
      slug: "/home",
      active: true,
    },
    {
      name: "Your Posts",
      slug: "/your-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },

    {
      name: "About",
      slug: "/about",
      active: true,
    },

    {
      name: "Contact",
      slug: "/contact",
      active: true,
    },
  ];

  return (
    <header className="relative w-full border-b bg-white pb-2">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        
          
          <Link to={"/"} className=" font-bold flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="none"
            viewBox="0 0 24 24"
            id="blogger"
          >
            
            <path
              fill="#000"
              fillRule="evenodd"
              d="M3 1C1.89543 1 1 1.89543 1 3V21C1 22.1046 1.89543 23 3 23H21C22.1046 23 23 22.1046 23 21V3C23 1.89543 22.1046 1 21 1H3ZM8.5 11H12.5C13.0523 11 13.5 10.5523 13.5 10C13.5 8.89543 12.6046 8 11.5 8H10.5C9.39543 8 8.5 8.89543 8.5 10V11ZM15.3293 11C15.4398 10.6872 15.5 10.3506 15.5 10C15.5 7.79086 13.7091 6 11.5 6H10.5C8.29086 6 6.5 7.79086 6.5 10V12V14C6.5 16.2091 8.29086 18 10.5 18H13.5C15.7091 18 17.5 16.2091 17.5 14V12C17.5 11.4477 17.0523 11 16.5 11H15.3293ZM12.5 13H8.5V14C8.5 15.1046 9.39543 16 10.5 16H13.5C14.6046 16 15.5 15.1046 15.5 14V13H12.5Z"
              clipRule="evenodd"
            ></path>
          </svg>
            log
          </Link>
        
        <div className="hidden sm:block">
          <ul className="inline-flex space-x-8">
            {navLinks.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
          </ul>
        </div>
        <div className="hidden sm:block ">
          <div className="flex justify-center items-center">
            {!authStatus && (
              <Link
                to={"/login"}
                type="button"
                className="mr-5 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Login
              </Link>
            )}

            {authStatus && (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className=" menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a className="justify-between">Profile</a>
                  </li>

                  <li>
                    <LogoutBtn />
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
