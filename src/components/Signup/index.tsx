"use client";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import Link from "next/link";
import React, { useState } from "react";
import { BsEye } from "react-icons/bs";
import { TbEyeClosed } from "react-icons/tb";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/shared/formSchema";
import ButtonLoader from "../common/buttonLoader";
import Axios from "@/utils/axios";
import { message, notification } from "antd";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: toFormikValidationSchema(signUpSchema),
    validateOnMount: false,
    onSubmit: async (values, { resetForm }) => {
      console.log("data", values);
      try {
        setLoading(true);

        const res = await Axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}users/register`,
          {
            name: values.name,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
          }
        );

        const { token, user } = res.data;
        console.log(res.data);
        // Save token in localStorage
        localStorage.setItem("authToken", token);

        setLoading(false);
        resetForm();
        router.push("/");

        toast.success("Signup successful");
      } catch (error: any) {
        console.error("Signup error:", error.message);
        toast.error(error.response?.data?.message || "Signup failed");
        setLoading(false);
      }
    },
  });

  return (
    <>
      <section className="overflow-hidden py-20 bg-[#a199f7]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Create an Account
              </h2>
              <p>Enter your detail below</p>
            </div>

            <div className="mb-1.5">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-5">
                  <label htmlFor="name" className="block mb-2.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your full name"
                    className="rounded-lg border border-gray-300  placeholder:text-gray-500 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue-500"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-red-500 text-sm">{formik.errors.name}</p>
                  )}
                </div>

                <div className="mb-5">
                  <label htmlFor="email" className="block mb-2.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your email address"
                    className="rounded-lg border border-gray-300  placeholder:text-gray-500 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue-500"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                <div className="mb-5">
                  <label htmlFor="password" className="block mb-2.5">
                    Password <span className="text-red-500">*</span>
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
                      autoComplete="on"
                      className="rounded-lg border border-gray-300  placeholder:text-gray-500 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue-500 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black hover:text-dark-3"
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

                <div className="mb-5.5">
                  <label htmlFor="confirmPassword" className="block mb-2.5">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "password" : "text"}
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Confirm  password"
                      // autoComplete="on"
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                      onBlur={formik.handleBlur}
                      className="rounded-lg border border-gray-300  placeholder:text-gray-500 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black hover:text-dark-3"
                    >
                      {showConfirmPassword ? (
                        <TbEyeClosed size={20} />
                      ) : (
                        <BsEye size={20} />
                      )}
                    </button>
                  </div>
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.confirmPassword}
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
                  Create Account {loading && <ButtonLoader />}
                </button>
              </form>
            </div>

            <p className="text-center mt-4">
              Already have an account?
              <Link
                href="/sign-in"
                className="text-black ease-out duration-200 hover:text-blue-500 pl-2"
              >
                Sign in Now
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
