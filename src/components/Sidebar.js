import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { clearCookie, getCookie, getRoles } from "@/components/Helper/cookies";

export default function Sidebar() {
 const router = useRouter();
  const logout = () => {
    clearCookie();
    router.push("/login");
  };

 const menuItems = [
  {
   href: "/profile",
   title: "Profile",
   submenus: [
    {
     href: "/profile",
     title: "Profile",
    },
    {
     href: "/profile/edit",
     title: "Edit Profile",
    },
   ],
   icon: (
    <svg
     xmlns="http://www.w3.org/2000/svg"
     className="h-4 w-4"
     fill="none"
     viewBox="0 0 24 24"
     stroke="currentColor">
     <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
     />
     <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
     />
     <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
     />
    </svg>
   ),
  },
  {
   href: "/classes",
   title: "Kelas",
   icon: (
    <svg
     xmlns="http://www.w3.org/2000/svg"
     className="h-4 w-4"
     fill="none"
     viewBox="0 0 24 24"
     stroke="currentColor">
     <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
     />
     <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
     />
     <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
     />
    </svg>
   ),
  },
  {
   href: "/tasks",
   title: "Tugas",
   icon: (
    <svg
     xmlns="http://www.w3.org/2000/svg"
     className="h-4 w-4"
     fill="none"
     viewBox="0 0 24 24"
     stroke="currentColor">
     <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
     />
     <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
     />
     <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
     />
    </svg>
   ),
  },
 ];

 const [activeMenu, setActiveMenu] = useState("");

 return (
  <aside className="bg-gray-100 w-full md:w-60">
   {/* logo */}
   <div className="flex justify-center items-center h-20">
    <img src="/assets/PASTrack.svg" alt="PASTrack" />
   </div>
   <div className="flex flex-col justify-center items-center p-4">
    <h4 className="font-bold">Built by C07 - SandBox</h4>
    <p className="text-sm font-bold text-blue-800 mt-4">username@gmail.com</p>
    <button className="bg-blue-800 text-white rounded-full py-1 px-2 mt-4 text-sm font-light">
     Admin
    </button>
    <div className="w-full h-0.5 bg-blue-800 rounded-full mt-4"></div>
   </div>
   {/* logo */}
   {/* menu */}
   <div className="m-4 bg-blue-800 rounded-lg">
    <nav>
     <ul>
      {menuItems.map(({ href, submenus, title, icon }) => (
       <li className="p-2" key={title}>
        {submenus && submenus.length > 0 ? (
         <div
          onClick={() => {
           if (activeMenu === href) {
            setActiveMenu("");
           } else {
            setActiveMenu(href);
           }
          }}
          className={`flex ${
           router.asPath.includes(href) ? "bg-blue-700" : ""
          } items-center p-4 rounded-lg hover:bg-blue-700 cursor-pointer text-white`}>
          {/* icon */}
          <div className="flex mr-2 justify-center items-center content-center w-8 h-8 rounded-full bg-white text-blue-800">
           {icon}
          </div>
          {title}
          {/* arrow icon */}
          {submenus && submenus.length > 0 && (
           <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ml-auto ${
             activeMenu === href ? "transform rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth={2}
             d="M19 9l-7 7-7-7"
            />
           </svg>
          )}
         </div>
        ) : (
         <Link
          href={href}
          className={`flex ${
           router.asPath.includes(href) ? "bg-blue-700" : ""
          } items-center p-4 rounded-lg hover:bg-blue-700 cursor-pointer text-white`}>
          {/* icon */}
          <div className="flex mr-2 justify-center items-center content-center w-8 h-8 rounded-full bg-white text-blue-800">
           {icon}
          </div>
          {title}
          {/* arrow icon */}
          {submenus && submenus.length > 0 && (
           <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ml-auto ${
             activeMenu === href ? "transform rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth={2}
             d="M19 9l-7 7-7-7"
            />
           </svg>
          )}
         </Link>
        )}
        {/* expandable submenus, expanded based on active menu */}
        {submenus && submenus.length > 0 && (
         <ul className={`${activeMenu === href ? "block" : "hidden"}`}>
          {submenus.map(({ href, title }) => (
           <li key={title}>
            <Link
             href={href}
             className={`flex ${
              router.asPath.includes(href) ? "bg-blue-700" : ""
             } items-center px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer text-white`}>
             {title}
            </Link>
           </li>
          ))}
         </ul>
        )}
       </li>
      ))}
     </ul>
    </nav>
   </div>
   {/* menu */}
   {/* logout button at the bottom */}
   <div className="flex justify-center items-center p-4">
    <button className="border w-full border-red-500 text-red-500 hover:text-white hover:bg-red-500 rounded-lg font-bold py-2 px-2 mt-4 text-sm" onClick={logout}>
     Logout
    </button>
   </div>
  </aside>
 );
}