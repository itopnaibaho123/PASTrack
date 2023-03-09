import Navbar from "./navbar";
import Whitespace from "./Whitespace";


export default function Layout({children}){
    <div className="h-screen overflow-hidden max-w-[100rem] mx-auto shadow-md">
      <Navbar />
      <Whitespace />
      <div className="flex h-full overflow-auto">
        <Sidebar />
        <div className="layout bg-gray/10 overflow-auto h-[calc(100vh-55px)]">{children}</div>
      </div>
    </div>
}