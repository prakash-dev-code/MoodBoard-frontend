import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Montserrat } from "next/font/google";
import BackTop from "antd/es/float-button/BackTop";
import { ArrowUpOutlined } from "@ant-design/icons";
import { child } from "@/types/common";
import Loader from "@/shared/loader";
import toast, { Toaster } from "react-hot-toast";
import { Button, Modal } from "antd";

const montserratConfig = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const Layout: React.FC<child> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const router = useRouter();

  const PUBLIC_ROUTES = ["/sign-in", "/sign-up"];
  const PROTECTED_ROUTE = "/";

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    setAuthToken(token);

    const currentPath = window.location.pathname;
    const isPublicRoute = PUBLIC_ROUTES.includes(currentPath);
    const isProtectedRoute = currentPath === PROTECTED_ROUTE;

    if (token) {
      if (isPublicRoute) {
        router.replace(PROTECTED_ROUTE);
      }
    } else {
      if (isProtectedRoute) {
        router.replace("/sign-in");
      }
    }

    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    setAuthToken(null);
    router.push("/sign-in");
    toast.success("Logout successful");
    setIsModalOpen(false);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="max-w-[1920px] m-auto flex flex-col">
        <div className="text-center pt-4">
          <h1 className="text-3xl font-semibold">MoodBoard</h1>
        </div>

        {authToken && (
          <div className="w-full flex justify-end pr-4">
            <Button onClick={() => setIsModalOpen(true)}>Logout</Button>
          </div>
        )}

        <main className={`overflow-hidden ${montserratConfig.className}`}>
          {children}
        </main>

        <BackTop
          style={{ bottom: "5.5rem", right: "1rem" }}
          icon={<ArrowUpOutlined />}
        />

        <div className="text-center mt-2 text-sm font-normal">
          © {new Date().getFullYear()} MoodBoard
        </div>

        <Toaster reverseOrder={false} position="top-center" />
      </div>

      <Modal
        title={<div className="text-xl font-semibold">Logout</div>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        centered
        zIndex={1000}
        footer={
          <div className="flex justify-end">
            <Button className="border" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-500 text-white ml-4"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        }
        className="custom-modal"
      >
        <div className="text-left mt-3 mb-4">
          <span className="text-sm sm:text-base font-normal">
            Are you sure you want to logout?
          </span>
        </div>
      </Modal>
    </>
  );
};

export default Layout;
