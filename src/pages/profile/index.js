import React, { useState, useEffect } from "react";
import { B, H3, P } from "@/components/Typography";
import { getCookie } from "@/components/Helper/cookies";
import { useRouter } from "next/router";
import axios from "axios";
import checkRole from "@/components/Helper/CheckRole";
import Button from "@/components/Button";
import { Card, CardContent, CardHeader, Grid, Avatar } from "@material-ui/core";
import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
export default function Profile({ id, role }) {
  const router = useRouter();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ROUTE}api/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        );

        setProfile(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [id]);

  if (!profile) {
    return null; // Tampilkan loading spinner atau placeholder jika profil masih sedang dimuat
  }

  return (
    <div>
      <div className="h-full flex flex-col">
        <Breadcrumb
          links={[
            { label: "Home", href: "/" },
            { label: profile["nama"], href: router.asPath },
          ]}
          active={profile["nama"]}
        />
      </div>
      <div className="flex justify-center">
      <div className="w-1/2 p-8 mb-1 bg-blue-800 rounded-2xl shadow-lg border-4 border-yellow-400 my-1 py-4">
        <Head>
          <title>Detail User</title>
        </Head>
        <div className="flex  justify-center items-center gap-4 my-5">
          <Avatar
            src="http://www.clker.com/cliparts/f/a/0/c/1434020125875430376profile.png"
            alt="Profile Image"
          />
          <h1 className="text-white font-bold text-3xl">Detail User</h1>
        </div>
        
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <P>
                  <B>Username:</B> {profile.username}
                </P>
              </Grid>
              <Grid item xs={12} sm={6}>
                <P>
                  <B>Nama:</B> {profile.nama}
                </P>
              </Grid>
              <Grid item xs={12} sm={6}>
                <P>
                  <B>Role:</B> {role}
                </P>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <div className="flex gap-4 py-4">
          <Button
            variant="secondary"
            onClick={() => router.push("/profile/ChangePassword")}
          >
            Ganti Password
          </Button>
          <Button onClick={() => router.back()}>Go back</Button>
        </div>
      </div>
    </div>
    </div>
  );
}


export async function getServerSideProps(context) {
  const authentications = checkRole(context);
  if (!authentications.tokenTrue) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const { role, username } = context.req.cookies;
  return {
    props: {
      id: username,
      role: role,
    },
  };
}
