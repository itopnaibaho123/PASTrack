export default function checkRole(ctx, allowedRoles = []) {
  const { role, token } = ctx.req.cookies;
  
  let tokenTrue = false;
  let rolesTrue = false;

  if(token) {
    tokenTrue = true;
    if (allowedRoles.includes(role) || allowedRoles.length === 0) {
        rolesTrue = true;
      }
  }
  
  return {
    tokenTrue: tokenTrue,
    rolesTrue: rolesTrue
  };
}
