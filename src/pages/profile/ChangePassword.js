import FormModalContextProvider from "@/components/context/FormModalContext";
import FormGantiPassword from "@/components/Form/FormGantiPassword";
import React from "react";
import Input from "@/components/Input";
import { clearCookie, getCookie } from "@/components/Helper/cookies";
import { B } from "@/components/Typography";
import { H1, H2, H3 } from "@/components/Typography";
import { useRouter } from "next/router";
import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import { toast } from "react-hot-toast";
export default function () {
  const router = useRouter();
  return (
    <div>
      <div className="h-full flex flex-col">
        <Breadcrumb
          links={[
            { label: "Home", href: "/" },
            { label: "profile", href: "/profile" },
            { label: "Ganti Password", href: "/ChangePassword" },
          ]}
          active={"Ganti Password"}
        />
      </div>
      <Head>
        <title>{`Change Password`}</title>
      </Head>
      <div className="ml-6 py-4">
        <H2>Ganti Password</H2>
      </div>
      <div className="float-left ml-5">
        <FormModalContextProvider>
          <FormGantiPassword
            handleSubmit={async (formData, setFormData) => {
              // setIsError(false);
              if (formData["passwordBaru"] !== formData["ulangiPasswordBaru"]) {
                formData["passwordLama"] = "";
                formData["passwordBaru"] = "";
                formData["ulangiPasswordBaru"] = "";
              } else {
                try {
                  const res = await fetch(
                    `${
                      process.env.NEXT_PUBLIC_API_ROUTE
                    }api/user/changePassword/${getCookie("username")}`,
                    {
                      method: "PUT",
                      body: JSON.stringify(formData),
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getCookie("token")}`,
                      },
                    }
                  );
                  console.log(res);
                  if (res.ok) {
                    toast.success("Password Berhasil Diganti")
                    clearCookie();
                    router.push("/");
                  } else if (res.status === 406) {
                    toast.error("Password Lama Salah")
                  }
                } catch (err) {
                  // console.log(err)
                  toast.error("Password Gagal Diganti")
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
      </div>
  );
}