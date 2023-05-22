import { useContext, useEffect } from "react";
import { FormModalContext } from "../context/FormModalContext";
export default function SelectDashboard({ label, children, name, placeholder, handleOnchange }) {
    const { setFormData, formData } = useContext(FormModalContext);

    useEffect( () => {
        setFormData(() => ({
            [name]: children[0].id
        }))
    }, [])

    return (
      <div className='className={`flex flex-col gap-2 py-1.5 ${full && "w-full"} mb-2`'>
        <label>{label}</label>
        <div className="flex ring-gray/50 ring-[1.5px] rounded-sm items-stretch">
          <select
            placeholder="test"
            className="px-3 py-1.5 flex-1 !outline-none"
            value={formData[name]}
            onChange={(e) => {
              setFormData((previous) => ({
                [name]: e.target.value,
              }));
            }}
          >
            {children.map((item, index) => {
              return (
                <option value={item[placeholder]} key={index}>
                  {item[name]}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }