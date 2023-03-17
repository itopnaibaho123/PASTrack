import FormModalContextProvider from "@/components/context/FormModalContext";
import FormGantiPassword from "@/components/Form/FormGantiPassword";
import React from "react";
import Input from "@/components/Input";
import { clearCookie, getCookie } from "@/components/Helper/cookies";
import { B } from "@/components/Typography";
import { useRouter } from "next/router";

export default function () {
  const router = useRouter()
  return (
    <>
      <div>
        <B>Ganti Password</B>
        <FormModalContextProvider>
          <FormGantiPassword
            handleSubmit={async (formData, setFormData) => {
              // setIsError(false);
              if (formData["passwordBaru"] !== formData["ulangiPasswordBaru"]) {
                formData["passwordLama"] = ""
                formData["passwordBaru"] = ""
                formData["ulangiPasswordBaru"] = ""
              } else {
                try {
                  const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_ROUTE}api/user/changePassword/${getCookie('username')}`,
                    {
                      method: "PUT",
                      body: JSON.stringify(formData),
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getCookie('token')}`,
                      },
                    }
                  );
                  console.log(res)
                  if (res.ok) {
                    console.log("Sukses")
                    clearCookie();
                    router.push("/");
                  } else if(res.status=== 406){
                    console.log("Password Lama Salah")
                  }
                } catch (err) {
                  // console.log(err)
                } finally {
                  setFormData({});
                }
              }
            }}
          >
            <Input
              label={"password lama"}
              name={"passwordLama"}
              placeholder="Ketik Password Lama"
              required
              type="password"
            />
            <Input
              label={"password baru"}
              name={"passwordBaru"}
              placeholder="Ketik Password Baru"
              required
              type="password"
            />
            <Input
              label={"ulangi password baru"}
              name={"ulangiPasswordBaru"}
              placeholder="Ketik Ulang Password Baru"
              required
              type="password"
            />
          </FormGantiPassword>
        </FormModalContextProvider>
      </div>
    </>
  );
}
