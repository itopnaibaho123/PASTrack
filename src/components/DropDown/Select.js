import React, { useContext } from "react";
import { FormModalContext } from "../context/FormModalContext";
export default function Select({ label, children, name, placeholder, semester = false }) {
  const { setFormData, formData } = useContext(FormModalContext);
  if(semester){
    
    function getSemester(item){
     
      var tanggalBuka = new Date(item['awalTahunAjaran'])
      var tanggalTutup = new Date(item['akhirTahunAjaran'])
      var stringTanggalBuka = tanggalBuka.getDate() + "/" +tanggalBuka.getMonth() + "/" + tanggalBuka.getFullYear() + " - "
      var stringTanggalTutup = tanggalTutup.getDate() + "/" +tanggalTutup.getMonth() + "/" + tanggalTutup.getFullYear()
      if(item['semester'] === false){
        return "Genap " + String(stringTanggalBuka) + String(stringTanggalTutup)
      } else{
        return "Ganjil " + String(stringTanggalBuka)  + String(stringTanggalTutup)
      
      }
    }

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
                ...previous,
                [name]: e.target.value,
              }));
            }}
          >
            {children.map((item, index) => {
             
              return <option value={item[placeholder]} key={index}>{getSemester(item)}</option>;
            })}
          </select>
        </div>
      </div>
    );

  }
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
              ...previous,
              [name]: e.target.value,
            }));
          }}
        >
          {children.map((item, index) => {
     
            return <option value={item[placeholder]} key={index}>{item[name]}</option>;
          })}
        </select>
      </div>
    </div>
  );
}
