import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Montserrat } from "next/font/google";
import BackTop from "antd/es/float-button/BackTop";
import { ArrowUpOutlined } from "@ant-design/icons";
import { child } from "@/types/common";
import Loader from "@/shared/loader";

const montserratConfig = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const Layout: React.FC<child> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Route configuration
  const PUBLIC_ROUTES = ["/sign-in", "/sign-up"];
  const PROTECTED_ROUTE = "/moods";
  const currentPath = router.pathname;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const authToken = localStorage.getItem("authToken");
    const isPublicRoute = PUBLIC_ROUTES.includes(currentPath);
    const isProtectedRoute = currentPath === PROTECTED_ROUTE;

    const handleAuthCheck = () => {
      if (authToken) {
        // Redirect authenticated users from public routes to moods
        if (isPublicRoute) {
          router.replace(PROTECTED_ROUTE);
        }
      } else {
        // Redirect unauthenticated users from protected route to sign-in
        if (isProtectedRoute) {
          router.replace("/sign-in");
        }
      }
    };

    // handleAuthCheck();
    setIsLoading(false);
  }, [currentPath, router]);

  // Determine UI visibility
  //   const isPublicRoute = PUBLIC_ROUTES.includes(currentPath);
  //   const showNavFooter = !isPublicRoute && currentPath === PROTECTED_ROUTE;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-[1920px] m-auto flex flex-col">
      <div className="text-center py-4  ">
        <h1 className="text-3xl font-semibold">MoodBoard</h1>
      </div>

      <main className={`overflow-hidden ${montserratConfig.className}`}>
        {children}
      </main>

      <div className="BackToTopButton">
        <BackTop
          style={{
            bottom: "5.5rem",
            right: "1rem",
          }}
          icon={<ArrowUpOutlined />}
        />
      </div>

      <div className="text-center text-sm font-normal ">
        © {new Date().getFullYear()} MoodBoard
      </div>
    </div>
  );
};

export default Layout;
