import React from "react";
import FormModalContextProvider from "@/components/context/FormModalContext";
import FormKomponen from "@/components/Form/FormKomponen";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";
import { useRouter } from "next/router";
export default function detailKomponen() {
  const router = useRouter()
  return (
    <div>
      <Button onClick={router.back}>Back</Button>
      <FormModalContextProvider>
        <FormKomponen>
          <Input
            type="text"
            label={"Title"}
            name={"title"}
            placeholder={"TItle Komponen"}
            inputvalue={"tsetset"}
            required
          />
          <Textarea
            type="text"
            label={"Description"}
            name={"description"}
            placeholder={"Description"}
            inputvalue={"tsetset"}
            required
          />
          <Input
            type="date"
            label={"Tanggal Tenggat"}
            name={"dueDate"}
            placeholder={"Tanggal Tenggat"}
            inputvalue={"tsetset"}
            required
          />
          <Input
            type="number"
            label={"Bobot"}
            name={"bobot"}
            placeholder={"Bobot"}
            inputvalue={"tsetset"}
            required
          />
        </FormKomponen>
      </FormModalContextProvider>
    </div>
  );
}
