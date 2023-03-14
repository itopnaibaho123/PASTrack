import React, { useState, useEffect, useContext } from "react";
import checkRole from "@/components/Helper/CheckRole";
import FormModalContextProvider from "@/components/context/FormModalContext";
import EditProfileForm from "@/components/Form/EditProfileForm";
import { useRouter } from "next/router";
import Input from "@/components/Input";
import { getCookie } from "@/components/Helper/cookies";
import axios from "axios";
import { FormModalContext } from "@/components/context/FormModalContext";

export default function EditProfile(props) {
  const router = useRouter();
  // const [ formData, setFormData ] = useContext(FormModalContext);
  const [dataObject, setDataObject] = useState({});
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
        setDataObject(data.data)
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
                    Authorization: `Bearer ${getCookie('token')}`,
                  },
                }
              );
              console.log("MASUK SINI BOSSSS");
              if (res.ok) {
                router.back();
              }
            } catch (err) {
              // console.log(err)
              console.log(err)
            } finally {
              setFormData({});
            }
          }}
        >
          <Input
            label="nama"
            name= "nama"
            placeholder="Type New Name"
            required
            inputvalue={dataObject.nama}
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
