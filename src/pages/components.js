import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { H1, H3, H2, B, P } from "@/components/Typography";
import Button from "@/components/Button";

import Toast from "@/components/Toast";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Input from "@/components/Input";
import Sidebar from "@/components/Sidebar";
import CardSubject from "@/components/CardSubject";
import StudentCard from "@/components/StudentCard";


const test = () => {
  console.log("Hello World");
};

const inter = Inter({ subsets: ["latin"] });

export default function components() {
  return (
    <>
      <div className="ml-10 mt-4">
        <StudentCard />
      </div>
      <div className="mt-4">
        <CardSubject />
      </div>
      <div className="px-4 py-4">
        <div>
          <H1>Page Title</H1>
          <H2>Sub Title</H2>
          <H3>Sub Sections</H3>
          <B>Body Title</B>
          <P>Body Title</P>
        </div>
        <br />
        <div className="flex gap-2">
          <Button variant="primary">Button</Button>

          <Button variant="secondary">Button</Button>

          <Button variant="disabled">Button</Button>

          <Button variant="ghost">Button</Button>
        </div>
      </div>
      <div className="ml-4">
      
      </div>
      <div className="mt-4">
        {/* <Toast variant="success">Success message</Toast> */}
      </div>
      <div className="mt-4">
        {/* <Toast variant="error">Error message</Toast> */}
      </div>
      <div className="ml-4">
        <Card
          Title="Title"
          Date="Lorem Ipsum Dolor"
          Body="Lorem Ipsum Dolor"
        ></Card>
      </div>
      <div className="mt-4">
        <Footer></Footer>
      </div>
      <div className="mt-4">
        <Sidebar></Sidebar>
      </div>
      <div className="flex flex-col h-full transition duration-300 overflow-x-hidden relative bg-white z-40">
        <div className="max-w-[375px] w-full flex-1 flex flex-col justify-center mx-auto">
          <div className="px-2">test</div>
          <div className="px-2">
            <Button full variant="primary">
              Register
            </Button>
          </div>
        </div>
      </div>
      <div className="max-w-[364px]">
        {/* <Input 
        placeholder="placeholder" 
        name="input" 
        label="label"
        variant= "secondary"
        helper="patut diisi"
        /> */}
      </div>
    </>
  );
}

// alt + atas/bawah --> drag kata bareng\
// shift + Alt + F ==> ngerapiin
