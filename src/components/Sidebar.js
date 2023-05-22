import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { clearCookie, getCookie, getRoles } from "@/components/Helper/cookies";
import { useCookie } from "./Hooks/useCookie";

export default function Sidebar() {
  const router = useRouter();
  const logout = () => {
    clearCookie();
    router.push("/login");
  };

  const role = useCookie("role");
  const username = useCookie("username");
  const menuItems = [
    {
      href: "/profile",
      title: "Profile",
      available: ["GURU", "ADMIN", "MURID", "ORANGTUA"],
      submenus: [
        {
          href: `/profile`,
          title: "Profile",
        },
        {
          href: `/profile/${username}/EditProfile`,
          title: "Edit Profile",
        },
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
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
      href: "/kelas",
      title: "Kelas",
      available: ["ADMIN"],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
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
      href: "/pelajaran",
      title: "Mata Pelajaran",
      available: ["GURU"],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
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
      href: "/profile/listuser",
      title: "List All User",
      available: ["ADMIN"],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
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
      href: "/walas-kelas-saya",
      title: "Kelas Saya",
      available: ["GURU"],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
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
      href: "/murid-kelas-saya",
      title: "Kelas Saya",
      available: ["MURID", "ORANGTUA"],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
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
      href: "/tugas",
      title: "Tugas",
      available: ["ADMIN", "GURU", "SISWA"],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
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
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
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
      href: "/dashboard",
      title: "Dashboard",
      available: ["GURU", "MURID"],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
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
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
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
      href: "/registrasi",
      title: "Registrasi User",
      available: ["ADMIN"],
      submenus: [
        {
          href: `/registrasi/Guru`,
          title: "Guru",
        },
        {
          href: `/registrasi/Siswa`,
          title: "Siswa",
        },
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
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
  if (role != "") {
    return (
      <div className="sidebar-container">
        {/* logo */}
        <div className="flex justify-center items-center h-20">
          <img src="/assets/PASTrack.svg" alt="PASTrack" />
        </div>
        <div className="flex flex-col justify-center items-center p-4">
          <h4 className="font-bold">Built by C07 - SandBox</h4>
          <p className="text-sm font-bold text-blue-800 mt-4">{username}</p>
          <button className="bg-blue-800 text-white rounded-full py-1 px-2 mt-4 text-sm font-light">
            {role}
          </button>
          <div className="w-full h-0.5 bg-blue-800 rounded-full mt-4"></div>
        </div>
        {/* logo */}
        {/* menu */}
        <div className="m-4 bg-blue-800 rounded-lg">
          <nav>
            <ul>
              {menuItems.map(
                ({ href, submenus, title, icon, available }) =>
                  available.includes(role) && (
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
                          } items-center p-4 rounded-lg hover:bg-blue-700 cursor-pointer text-white`}
                        >
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
                                activeMenu === href
                                  ? "transform rotate-180"
                                  : ""
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
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
                          } items-center p-4 rounded-lg hover:bg-blue-700 cursor-pointer text-white`}
                        >
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
                                activeMenu === href
                                  ? "transform rotate-180"
                                  : ""
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
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
                        <ul
                          className={`${
                            activeMenu === href ? "block" : "hidden"
                          }`}
                        >
                          {submenus.map(({ href, title }) => (
                            <li key={title}>
                              <Link
                                href={href}
                                className={`flex ${
                                  router.asPath.includes(href)
                                    ? "bg-blue-700"
                                    : ""
                                } items-center px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer text-white`}
                              >
                                {title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  )
              )}
            </ul>
          </nav>
        </div>
        {/* menu */}
        {/* logout button at the bottom */}
        <div className="flex justify-center items-center p-4">
          <button
            className="border w-full border-red-500 text-red-500 hover:text-white hover:bg-red-500 rounded-lg font-bold py-2 px-2 mt-4 text-sm"
            onClick={logout}
          >
            Logout
          </button>
        </div>
        <style jsx>{`
          .sidebar-container {
            width: 320px;
            height: 100vh;
            background: #f2f2f2;
          }
        `}</style>
      </div>
    );
  }
}
