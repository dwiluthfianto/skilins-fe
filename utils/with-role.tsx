"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ComponentType } from "react";

const withRole = <P extends object>(
  WrappedComponent: ComponentType<P>,
  allowedRoles: string[],
  loginRedirectPath: string // Add a parameter for the login redirect path
) => {
  const WithRole: React.FC<P> = (props) => {
    const router = useRouter();
    const userRole = Cookies.get("userRole");

    useEffect(() => {
      if (!userRole) {
        // Redirect to the appropriate login page if userRole is undefined
        router.push(loginRedirectPath);
      } else if (!allowedRoles.includes(userRole)) {
        // Redirect to a forbidden page if the user does not have the required role
        router.push("/403"); // Create a 403 page for forbidden access
      }
    }, [userRole, allowedRoles, router, loginRedirectPath]);

    return userRole && allowedRoles.includes(userRole) ? (
      <WrappedComponent {...props} />
    ) : null;
  };

  return WithRole;
};

export default withRole;
