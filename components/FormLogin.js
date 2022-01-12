import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function FormLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Digite un correo valido")
          .required("Required"),
        password: Yup.string()
          .min(6, "Debe tener al menos 6 caracteres o más")
          .required("Required"),
        // listTracks: Yup.array()
        //   .length(0, "Debe agregar al menos una cancion")
        //   .required("Required"),
      })}
      // onChange={(...e) => {
      //   console.log(e.target.value)
      // }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setLoading(true);
        const email = values.email;
        const password = values.password;

        const res = await signIn("credentials", {
          email,
          password,
          callbackUrl: `${window.location.origin}/`,
          redirect: false,
        });
        if (res?.error) {
          Swal.fire({
            icon: "error",
            title: "Oops....",
            text: res.error,
          });
        }
        if (res.url) router.push(res.url);
        setLoading(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col  items-center text-xs font-comic text-white sm:p-6 shadow overflow-hidden rounded-md">
          <div className="flex flex-col items-center">
            <div className="text-white font-bold  text-4xl">Welcome!</div>
            <div className="text-white ">Sign in to your account</div>
          </div>
          <div className="flex flex-col text-red-300 px-24 py-5 w-full">
            <label
              htmlFor="email"
              className="block text-white text-sm font-medium "
            >
              Email
            </label>
            <Field
              name="email"
              type="text"
              autoComplete="given-name"
              className="mt-1 h-12  text-gray-800 block w-full shadow-md lg:text-lg  rounded-md"
            />
            <ErrorMessage name="email" />

            <label
              htmlFor="password"
              className="block text-sm text-white font-medium mt-5 "
            >
              Password
            </label>
            <Field
              name="password"
              type="password"
              className="mt-1 h-12 text-gray-800 block w-full shadow-md lg:text-lg  border-gray-900 rounded-md"
            />
            <ErrorMessage name="password" />
          </div>

          <div className="flex flex-col px-24 text-xs items-end  w-full">
            <div>Forgot Password?</div>
          </div>

          <div className="flex flex-col px-24 py-5 w-full">
            {!loading ? (
              <button
                type="submit"
                className="mt-5 inline-flex justify-center py-4 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white font-sans bg-[#4ED2DA] hover:bg-[#46c0c7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isSubmitting}
              >
                Sign In
              </button>
            ) : (
              <h3 className="mt-5 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white font-sans bg-[#4ED2DA] hover:bg-[#46c0c7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Enviado...
              </h3>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}
