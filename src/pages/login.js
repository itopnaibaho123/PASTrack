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
                  const res = await axios.post("http://localhost:8080/api/login", formData);

                  const {
                    data: { token, username, role },
                    status,
                  } = res;
                  console.log(res.data.role)
                  if (status === 200) {
                    setCookie("token", token) 
                    setCookie("username", username)
                    setCookie("role", role)

                    router.push("/");
                  }
                } catch (err) {
                    console.log(err)
                } finally {
                  setFormData({});
                }
              }}
            >
              <Input label={"Username"} name={"username"} placeholder="Type your username" required />
              <PasswordInput label={"Password"} name={"password"} placeholder="Type your password" required />
            </LoginForm>
          </FormModalContextProvider>
        {/* <form >
          <H3>Login Here</H3>
          <div className="py-14 ">
            <div className="">
              <Input
                placeholder="username"
                name="username"
                label="username"
                variant="secondary"
                helper=""
              />
              <Input
                placeholder="password"
                name="password"
                label="password"
                variant="secondary"
                helper=""
                type="password"
              />
            </div>
          </div>
        </form> */}
      </div>
    </>
  );
}
