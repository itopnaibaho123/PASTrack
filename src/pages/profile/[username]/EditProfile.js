import React, { useState, useEffect, useContext } from "react";
import checkRole from "@/components/Helper/CheckRole";
import FormModalContextProvider from "@/components/context/FormModalContext";
import EditProfileForm from "@/components/Form/EditProfileForm";
import { useRouter } from "next/router";
import Input from "@/components/Input";
import { getCookie } from "@/components/Helper/cookies";
import { H1, H2, H3 } from "@/components/Typography";
import axios from "axios";
import { FormModalContext } from "@/components/context/FormModalContext";
import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import { toast } from "react-hot-toast";

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
        setDataObject(data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="h-full flex flex-col">
        <Breadcrumb
          links={[
            { label: "Home", href: "/" },
            { label: "Edit Profile", href: router.asPath },
          ]}
          active={"Edit Profile"}
        />
      </div>
      <Head>
        <title>{`Edit Profile ${props.id}`}</title>
      </Head>
      <div className="ml-7 py-4">
        <H2>Edit Profile</H2>
      </div>
      <img
        src="http://www.clker.com/cliparts/f/a/0/c/1434020125875430376profile.png"
        alt="Profile Image"
        className="h-20 w-20 rounded-full ml-5"
      />

      <div className="float-left ml-5">
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
                      Authorization: `Bearer ${getCookie("token")}`,
                    },
                  }
                );
                console.log("MASUK SINI BOSSSS");
                if (res.ok) {
                  toast.success(`Berhasil Mengedit Profile ${props.id}`);
                  router.back();
                } else {
                  toast.error(`Tidak Berhasil Mengedit Profile ${props.id}`);
                }
              } catch (err) {
                // console.log(err)
                console.log(err);
              } finally {
                setFormData({});
              }
            }}
          >
            <Input
              label="Edit Nama"
              name="nama"
              placeholder="Type New Name"
              required
              inputvalue={dataObject.nama}
            />
          </EditProfileForm>
        </FormModalContextProvider>
      </div>
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
