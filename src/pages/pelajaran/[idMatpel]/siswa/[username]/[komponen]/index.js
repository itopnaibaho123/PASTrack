import FormModalContextProvider, { FormModalContext } from '@/components/context/FormModalContext'
import FormKomponen from '@/components/Form/FormKomponen'
import React, { useState } from 'react'
import Input from '@/components/Input'
import { useRouter } from 'next/router'
import Button from '@/components/Button'
export default function index() {

    const [path, setPath] = useState({})

    const router = useRouter()
    

  return (
    <div>
        <Button onClick={() => router.back()}>Back</Button>
        <FormModalContextProvider>
            <FormKomponen handleSubmit={() => console.log("tse")}>
                <Input
                label={"Nilai"}
                nama={"nilai"}
                placeholder={"nilai"}
                inputvalue={30}
                type="number"
                required
                />
            </FormKomponen>
        </FormModalContextProvider>
    </div>
  )
}
