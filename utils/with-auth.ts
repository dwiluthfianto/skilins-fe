import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const withAuth = (WrappedComponent) => {
  return (props: any) => {
    const router = useRouter();
    const accessToken = Cookies.get("accessToken");

    useEffect(() => {
      if (!accessToken) {
        // Redirect to login if not authenticated
        router.push("/login");
      }
    }, [accessToken, router]);

    return accessToken ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
