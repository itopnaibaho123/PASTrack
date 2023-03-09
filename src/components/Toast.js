import { B } from "./Typography";

const variants = {
	success: "bg-green-800 text-white px-4 py-4 w-fit rounded-xl ml-4",
	error: "bg-red-500 text-white px-4 py-4 w-fit rounded-xl ml-4",
};
const logos = {
    success: "assets/bxs-check-circle.svg",
    error:  "assets/bxs-error-circle.svg",
}



export default function Toast({variant, children}) {
    return <>
        <div>
            <div className={variants[variant]}>
                <div className="flex gap-2 min-w-[312px]">
                    <img src={logos[variant]}></img>
                    <B>{children}</B>
                </div>
                
            </div>
        </div>
    </>
}