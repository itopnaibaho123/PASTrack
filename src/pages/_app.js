import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import { getCookie } from "@/components/Helper/cookies";
import { useRouter } from "next/router";
import { useCookie } from "@/components/Hooks/useCookie";

export default function App({ Component, pageProps }) {
  const { pathname } = useRouter();

  /*layouting*/
  return (
    <div className="min-h-screen flex flex-col">
      {pathname !== "/login" && (
        <div className="flex flex-col md:flex-row flex-1">
          <Sidebar />
          <div className="flex-1">
            <Component {...pageProps} />
          </div>
        </div>
      )}
      {pathname === "/login" && <Component {...pageProps} />}
      <Footer />
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
