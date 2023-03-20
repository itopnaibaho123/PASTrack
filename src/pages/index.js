
import checkRole from "@/components/Helper/CheckRole";


export default function index(props) {
  const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE;
  console.log(API_ROUTE);
  return (
    <div className="ml-auto mr-auto px-56">
      <img width={1400} height={1400} src="/assets/PASTrack.svg"></img>
    </div>
  );
}

export async function getServerSideProps(context) {
  // context.req.query
  const authentications = checkRole(context);
  if (!authentications.tokenTrue) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const { role } = context.req.cookies;
  return {
    props: {
      role: role,
    },
  };
}
