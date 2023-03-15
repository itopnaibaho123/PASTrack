import Input from "@/components/Input";
import { B, H2, H3 } from "@/components/Typography";
import axios from "axios";
import FormModalContextProvider from "@/components/context/FormModalContext";
import LoginForm from "@/components/Auth/LoginForm";
import PasswordInput from "@/components/PasswordInput";
import { setCookie } from "@/components/Helper/cookies";
import { useRouter } from "next/router";
export default function login() {
  const router = useRouter();
  return (
    <>
      <div className=" grid place-items-center py-32">
        <FormModalContextProvider>
          <LoginForm
            formLabel={<img src="/assets/logo/LumbaAuth.svg" alt="Lumba" />}
            buttonLabel="Show Modal"
            submitLabel="Save Changes"
            handleSubmit={async (formData, setFormData) => {
              
              // setIsError(false);
              try {
                const res = await fetch(
                  `${process.env.NEXT_PUBLIC_API_ROUTE}api/login`,
                  {
                    method: "POST",
                    body: JSON.stringify(formData),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                if (res.ok) {
                  const json = await res.json();
                  setCookie("token", json.token);
                  setCookie("username", json.username);
                  setCookie("role", json.role);
                  setCookie("type", json.type);
                  router.push("/");
                }
              } catch (err) {
                // console.log(err)
              } finally {
                setFormData({});
              }
            }}
          >
            <Input
              label={"Username"}
              name={"username"}
              placeholder="Type your username"
              required
            />
            <PasswordInput
              label={"Password"}
              name={"password"}
              placeholder="Type your password"
              required
            />
          </LoginForm>
        </FormModalContextProvider>
      </div>
    </>
  );
}