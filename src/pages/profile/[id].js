import React, { useState, useEffect } from 'react'
import { B } from '@/components/Typography'
import { getCookie } from '@/components/Helper/cookies'
import { useRouter } from 'next/router'
import axios from 'axios'
export default function profile() {
    const router = useRouter()
    const { id } = router.query
    const [profile, setProfile] = useState({});

    useEffect(() => {
        async function fetchData() {
      
          try {
            const  data  = await axios.get(
              `${process.env.NEXT_PUBLIC_API_ROUTE}api/user/${id}`,{
                headers:{
                  Authorization: `Token ${getCookie("token")}`
                }
              }
            );
      
            setProfile(data);
          } catch (err) {
            console.log(err);
          }
        }
        fetchData();
      }, []);

      console.log(profile);
  return (
    <div>
        <B>{profile.id}</B>
        <B>{profile.nama}</B>
        <B>{profile.username}</B>
        <B>{profile.password}</B>
        <B>{profile.role}</B>
    </div>
  )
}
