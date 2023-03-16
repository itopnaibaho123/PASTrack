import FormModalContextProvider from "@/components/context/FormModalContext";
import FormKomponen from "@/components/Form/FormKomponen";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import { useRouter } from "next/router";
import React from "react";
import Button from "@/components/Button";
export default function addKomponen() {
    const router = useRouter()
  return (
    <div>
        <Button onClick={() => router.back()}>Back</Button>
      <FormModalContextProvider>
        <FormKomponen>
          <Input
            type="text"
            label={"Title"}
            name={"title"}
            placeholder={"TItle Komponen"}
            required
          />
          <Textarea
            type="text"
            label={"Description"} 
            name={"description"}
            placeholder={"Description"}
            required
          />
          <Input
            type="date"
            label={"Tanggal Tenggat"}
            name={"dueDate"}
            placeholder={"Tanggal Tenggat"}
            required
          />
          <Input
            type="number"
            label={"Bobot"}
            name={"bobot"}
            placeholder={"Bobot"}
            required
          />
        </FormKomponen>
      </FormModalContextProvider>
    </div>
  );
}
