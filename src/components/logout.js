import * as React from "react";
// import { clearCookie } from "../../helper/cookies";
import { useRouter } from "next/router";
import { clearCookie, getCookie, getRoles } from "@/components/Helper/cookies";
import Button from "@/components/Button";

export default function Logout({ isVisible, setIsVisible }) {
  const router = useRouter();
  const logout = () => {
    clearCookie();
    router.push("/login");
  };
  return (
    <div
    >
        <Button onClick={logout}>
            Logout
        </Button>

    </div>
  );
}