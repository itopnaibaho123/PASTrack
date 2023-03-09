import React from 'react'

const variants = {
	primary: "bg-main-color-navy text-background",
	secondary: "bg-main-color-yellow text-main-color-navy",
	disabled: "bg-background text-main-color-navy",
	ghost: "bg-white text-main-color-navy ring-1 ring-main-color-navy",
    delete: "bg-red-500 text-white"
};


export default function Button({
    isLoading = false,
    children,
    type= "submit",
    variant = "primary",
    onClick,
    disabled,
    notButton = false,
    full = false

}) {
    return (
        <>
        <div>
            <button className={`relative group bg-gradient-to-r ${variants[variant]} ${
					(disabled || isLoading) && "cursor-not-allowed"
				} rounded-[4px] px-4 py-[6px] font-medium`} onClick={onClick} type={type}>{children}</button>
        </div>
    </>
    )
    
}

// export default function Button({children, onClick}) {
//   return (
//     <button onClick={onClick} className= {}>{children}</button>
//   )
  
// }

// RFC biar cepet
// Shift + Alt + down key - > copy paste cepat 