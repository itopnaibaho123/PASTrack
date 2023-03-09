export default function Navbar() {
    const username = useCookie("username");
  
    const [isVisible, setIsVisible] = React.useState(false);
  
    return (
      <nav className="layout mx-auto shadow-sm fixed w-full top-0 left-1/2 -translate-x-1/2 px-8 py-2 bg-white z-10">
        <div className="flex justify-between">
          <Link href="/">
            <img src="/assets/PASTrack.svg" alt="PASTrack" />
          </Link>
          <div className="flex gap-4 items-center">
            <p>{username}</p>
            <div
              onClick={() => setIsVisible((prev) => !prev)}
              className="w-8 h-8 rounded-full bg-gradient-to-r from-lightblue to-blue cursor-pointer relative"
            >
              {/* <Logout isVisible={isVisible} setIsVisible={setIsVisible} /> */}
            </div>
          </div>
        </div>
      </nav>
    );
  }