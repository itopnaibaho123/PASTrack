import { B, P } from "./Typography";



export default function Footer() {
    return <>
        <footer className="bg-main-text-grey rounded-3xl">
            <div className="py-10 px-20 flex justify-between items-center">
                <div>

                    <div className="pb-4 w-fit">
                        <img src="assets/PASTrack.svg"></img>
                    </div>
                    <div className="pb-2">
                        <P>© 2023 PROPENSI C07. All rights reserved.</P>
                    </div>
                    <div>
                        <B>Built By C07 - SandBox</B>
                    </div>
                </div>

                <div className="flex gap-8">
                    <img className= "h-[20px] w-[20px]"src="assets/faceboook-circle.svg"></img>
                    <img className= "h-[20px] w-[20px]"src="assets/twitter.svg"></img>
                    <img className= "h-[20px] w-[20px]"src="assets/youtube.svg"></img>
                    <img className= "h-[20px] w-[20px]"src="assets/instagram.svg"></img>
                    <img className= "h-[20px] w-[20px]"src="assets/bxl-linkedin.svg"></img>
                    <img className= "h-[20px] w-[20px]"src="assets/Line.svg"></img>
                    <img className= "h-[20px] w-[20px]"src="assets/Medium.svg"></img>
                </div>
            </div>
        </footer>
    </>
}