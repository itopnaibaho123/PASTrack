import { redirect } from "next/dist/server/api-utils";
import { getCookie } from "./cookies";

export default async function checkRole(ctx, allowedRoles) {
  const { role } = ctx.req.cookies;
  console.log(accessToken)
  if (!allowedRoles.includes(role)) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}
