import FormModalContextProvider from "@/components/context/FormModalContext";
import FormGantiPassword from "@/components/Form/FormGantiPassword";
import React from "react";
import Input from "@/components/Input";
import { clearCookie, getCookie } from "@/components/Helper/cookies";
import { B } from "@/components/Typography";
import { H1, H3 } from "@/components/Typography";
import { useRouter } from "next/router";

export default function () {
  const router = useRouter()
  return (
    <div className="border border-gray-300 rounded-lg shadow-md p-5 max-w-2xl mx-auto my-5">
      <div className="flex flex-col text-center items-center py-4">
        <H3>Ganti Password</H3>
      </div>
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
              label={"Password Lama"}
              name={"passwordLama"}
              placeholder="Ketik Password Lama"
              required
              type="password"
            />
            <Input
              label={"Password Baru"}
              name={"passwordBaru"}
              placeholder="Ketik Password Baru"
              required
              type="password"
            />
            <Input
              label={"Konfirmasi Password Baru"}
              name={"ulangiPasswordBaru"}
              placeholder="Ketik Ulang Password Baru"
              required
              type="password"
            />
          </FormGantiPassword>
        </FormModalContextProvider>
      </div>
  );
}
