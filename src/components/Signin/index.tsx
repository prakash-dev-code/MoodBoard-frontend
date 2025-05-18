"use client";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import { BsEye } from "react-icons/bs";
import { TbEyeClosed } from "react-icons/tb";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ButtonLoader from "../common/buttonLoader";
import { signInSchema } from "@/shared/formSchema";
import Axios from "@/utils/axios";
type ForgotPasswordResponse = {
  status: "success" | "error"; // or just "success" if you expect only that
  message: string;
};
const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(signInSchema),
    validateOnMount: false,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const res = await Axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}users/login`,
          {
            email: values.email,
            password: values.password,
          }
        );

        const { token, user } = res.data;
        console.log(res.data);
        // Save token in localStorage
        localStorage.setItem("authToken", token);

        setLoading(false);
        resetForm();
        router.push("/");

        toast.success("Signin  successful");
      } catch (error: any) {
        console.error("Signin error:", error.message);
        toast.error(error.response?.data?.message || "Signin failed");
        setLoading(false);
      }
    },
  });

  return (
    <>
      {/* forget password input  */}

      <section className="overflow-hidden py-20 bg-[#a199f7]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-lg p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Sign In to Your Account
              </h2>
              <p>Enter your detail below</p>
            </div>

            <div>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-5">
                  <label htmlFor="email" className="block mb-2.5">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your email"
                    className="rounded-lg border border-gray-100 bg-gray-100 placeholder:text-black w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue-500"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                <div className="mb-5">
                  <label htmlFor="password" className="block mb-2.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "password" : "text"}
                      name="password"
                      id="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      placeholder="Enter your password"
                      // autoComplete="on"
                      className="rounded-lg border border-gray-100 bg-gray-100 placeholder:text-black w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type={"button"}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-dark-5 hover:text-black"
                    >
                      {showPassword ? (
                        <TbEyeClosed size={20} />
                      ) : (
                        <BsEye size={20} />
                      )}
                    </button>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.password}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                  className={`w-full flex justify-center font-medium text-white bg-black py-3 px-6 rounded-lg ease-out duration-200 mt-7.5
    ${
      !formik.isValid || formik.isSubmitting
        ? "opacity-50 cursor-not-allowed"
        : "hover:bg-blue-500 cursor-pointer"
    }`}
                >
                  Sign in to account {loading && <ButtonLoader />}
                </button>
              </form>

              <p className="text-center mt-6">
                Don&apos;t have an account?
                <Link
                  href="/sign-up"
                  className="text-black ease-out duration-200 hover:text-blue pl-2"
                >
                  Sign Up Now!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
