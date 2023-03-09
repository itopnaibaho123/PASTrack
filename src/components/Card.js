import { B } from "./Typography";

export default function Card({ Title, Date, Body }) {
    return <>

        <div>
            <div className="min-w-[230px] bg-main-color-navy mt-3 w-fit flex rounded-xl justify-between">
                <div className="flex gap-2">
                    <div className="px-5 py-9 ">

                        <img src="assets/poin icon.svg"></img>
                    </div>
                    <div className="text-white px-21 py-5">
                        <B>{Title}</B>
                        <div className="opacity-30">
                            <B>{Date}</B>
                        </div>
                        <B>{Body}</B>
                    </div>
                </div>
                <div className="py-5 pl-60 pr-2">
                    <img src="assets/Frame 16189.svg"></img>
                </div>



            </div>

        </div>
    </>
}