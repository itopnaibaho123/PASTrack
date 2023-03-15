import Button from "@/components/Button";
import StudentCard from "@/components/StudentCard";
import { B } from "@/components/Typography";
import { useRouter } from "next/router";
import React from "react";

export default function index(props) {
    const router =   useRouter()
    return (
      <>
        <div>
          <div className="flex">
            <Button onClick={()=> router.back()}>Back</Button>
            <B>list murid mata pelajaran Matematika</B>
            <Button variant="secondary" onClick={() => router.push(`${router.asPath}/komponen`)}>Lihat Komponen</Button>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <StudentCard />
            <StudentCard />
            <StudentCard />
            <StudentCard />
            <StudentCard />
          </div>
        </div>
      </>
    );
 
}
