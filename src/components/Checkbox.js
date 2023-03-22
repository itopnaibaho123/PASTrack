import { useRouter } from "next/router";
import React from "react";
import Button from "./Button";
import { B, H2, H3, P } from "./Typography";
import { POSTINGAN_TUGAS } from "@/components/Hooks/Tugas";
import { deleteTugas } from "@/components/Hooks/Tugas";
import { getCookie } from "@/components/Helper/cookies";
// import FormModalContextProvider from "./context/FormModalContext";
import { FormCheckboxContext } from "./context/FormCheckboxContext";

export default function Checkbox({

}) {

    // bikin function delete 

    const [isDisabled, setIsDisabled] = usestate(false);
    function onCheck(e) {
        const checked = e.target.checked
        return checked
        
    }
    // nnti map nya diapus
    
    const router = useRouter()
    const { setFormData, formData } = useContext(FormCheckboxContext);

    return (
        <div className="mb-4">
            <div className="flex flex-col">
                {subjects.map((subject) => (
                    <label className="flex items-center" key={subject}>
                        <input
                            className="mr-2 accent-blue-500 w-4 h-4"
                            type="checkbox"
                            name="subject"
                            value={subject}
                            onChange={() => {
                                const isCheck = onCheck()
                                const data = formData;
                                if(!isCheck){
                                    data = data.filter((x) => x != {"subject": subject})
                                    setFormData(data)
                                }else{
                                    data.push({"subject":subject})
                                    setFormData(data)
                                }
                            }}
                        />
                        <span className="text-gray-700">{subject}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}
