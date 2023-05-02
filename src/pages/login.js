import Input from "@/components/Input";
import { P, B, H2, H3 } from "@/components/Typography";
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
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-28 w-auto" src="/assets/PASTrack.svg" alt="PASTrack Logo" />
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <FormModalContextProvider>
              <LoginForm
                buttonLabel="Show Modal"
                submitLabel="Save Changes"
                handleSubmit={async (formData, setFormData) => {
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
                  className="mt-1 block w-full"
                />
                <PasswordInput
                  label={"Password"}
                  name={"password"}
                  placeholder="Type your password"
                  required
                  className="mt-4 block w-full"
                />
              </LoginForm>
            </FormModalContextProvider>
          </div>
        </div>
      </div>
    </>
  );
}
