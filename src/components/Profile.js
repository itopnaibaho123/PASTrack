import * as React from "react";
// import { clearCookie } from "../../helper/cookies";
import { useRouter } from "next/router";
import { clearCookie, getCookie, getRoles } from "@/components/Helper/cookies";
import Button from "@/components/Button";

export default function Profile({ isVisible, setIsVisible }) {
  const router = useRouter();

  const profile = () => {

    router.push(`/profile/${getCookie("username")}`);
  };



  return (
    <div
    >
        <Button onClick={profile}>
            profile
        </Button>

    </div>
  );
}