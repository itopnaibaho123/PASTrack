import * as React from "react";
// import { clearCookie } from "../../helper/cookies";
import { useRouter } from "next/router";
import { clearCookie, getCookie, getRoles } from "@/components/Helper/cookies";
import Button from "@/components/Button";

export default function Logout({ isVisible, setIsVisible }) {
  const router = useRouter();

//   const ref = React.useRef(null);

//   const handleClickOutside = () => {
//     setIsVisible(false);
//   };

  const logout = () => {
    // console.log(getCookie("token"))
    console.log(getRoles("token"))
    clearCookie();
    router.push("/login");
  };

//   useOnClickOutside(ref, handleClickOutside);

  return (
    <div
    >
        <Button onClick={logout}>
            
        </Button>
      {/* <button
        ref={ref}
        onClick={logout}
        className="hover:text-white hover:bg-lightpink text-black/60 px-3 py-1 text-[11px]"
      >
        Log out
      </button> */}
    </div>
  );
}