import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import { getCookie } from "@/components/Helper/cookies";
export default function App({ Component, pageProps }) {
 
  return (
    <div className="h-screen w-screen">
      <div className='"flex h-full w-full'>
        {/* <Sidebar />       */}
        <div className="">
          <Component {...pageProps} />
        </div>
      </div>
      <Footer/>
    </div>
  );
}

{
  /* <div class="h-screen w-screen bg-black">
  <div class="flex h-full w-full">
    <!-- sidebar -->
    <div class="h-full w-[200px] border-2 bg-white"></div>
    <!-- konten -->
    <div class="w-full bg-slate-400">
      <h1>test</h1>
    </div>
  </div>
  <!-- footer -->
  <footer class="h-[100px] w-full bg-yellow-400"></footer>
</div> */
}
