import { redirect } from "next/dist/server/api-utils";
import { useState } from "react";
import { getCookie } from "./cookies";

export default async function checkRole(ctx, allowedRoles = []) {
  const { role, token } = ctx.req.cookies;
  
  const tokenTrue = false;
  const rolesTrue = false;

  if(token) {
    tokenTrue = true;
    if (allowedRoles.includes(role) || allowedRoles.length === 0) {
        rolesTrue = true;
      }
  }
  
  return [tokenTrue, rolesTrue];
}
