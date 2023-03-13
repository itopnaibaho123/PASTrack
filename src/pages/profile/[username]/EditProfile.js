import React, { useState, useEffect } from "react";
import checkRole from "@/components/Helper/CheckRole";
import FormModalContextProvider from "@/components/context/FormModalContext";
import EditProfileForm from "@/components/EditProfileForm";
import { useRouter } from "next/router";
import Input from "@/components/Input";
import { getCookie } from "@/components/Helper/cookies";
import axios from "axios";

export default function EditProfile(props) {
  const router = useRouter();
  const [nama, setNama] = useState("")
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ROUTE}api/user/${props.id}`,
          {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        );

        setNama(data.data.nama);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      <FormModalContextProvider>
        <EditProfileForm
          handleSubmit={async (formData, setFormData) => {
            // setIsError(false);
            try {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_ROUTE}api/user/${props.id}`,
                {
                  method: "PUT",
                  body: JSON.stringify(formData),
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${context.req.cookies.token}`,
                  },
                }
              );
              if (res.ok) {
                router.back();
              }
            } catch (err) {
              // console.log(err)
            } finally {
              setFormData({});
            }
          }}
        >
          <Input
              label={"nama"}
              name={"nama"}
              placeholder="Type New Name"
              required
              inputvalue= {nama}
            />
        </EditProfileForm>
      </FormModalContextProvider>
    </div>
  );
}

export async function getServerSideProps(context) {
  // context.req.query
  const authentications = checkRole(context, ["ADMIN"]);
  if (!authentications.tokenTrue) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  if (!authentications.rolesTrue) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // const { role, username } = context.req.cookies;
  return {
    props: {
      id: context.params.username,
    },
  };
}
