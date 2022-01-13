import React from "react";
import Image from "next/image";
import FormLogin from "../components/FormLogin";
import login from "../public/undraw_login.svg";
import { getSession } from "next-auth/react";
import { motion } from "framer-motion";

let easing = [0.6, -0.05, 0.01, 0.99];

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

export default function Login() {
  return (
    <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <div className="flex flex-col items-center min-h-screen w-full justify-center">
        {/* <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="" /> */}
        <div className="flex flex-row shadow-2xl rounded-lg shadow-gray-700 w-4/5 h-3/5 absolute">
          <div className="flex flex-col p-4 justify-between rounded-l-lg w-[60%] bg-white">
            <div className=" text-slate-500 font-bold">Name Company</div>
            <motion.div variants={fadeInUp}>
              <div className="flex flex-col items-center ">
                <div className="block w-2/4 ">
                  <Image
                    src={login}
                    alt="Texto alternativo"
                    width={800}
                    height={600}
                    layout="responsive"
                    priority={false}
                  />
                </div>
              </div>
            </motion.div>
            <div className="text-slate-500 flex flex-col items-center ">
              Success is never given, it's earned.
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-r-lg w-[40%] bg-slate-800">
            <FormLogin />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: session,
    },
  };
}
// { providers }

// export async function getServerSideProps() {
//   const providers = await getProviders();

//   return {
//     props: {
//       providers,
//     },
//   };
// }

// {
/* <h1 className="text-white text-4xl">LOGIN</h1> */
// }
// {Object.values(providers).map((provider) => (
//   <div key={provider.name}>
//     <button
//       onClick={() => signIn(provider.id, { callbackUrl: "/" })}
//       className="bg-[#18D860] text-white p-5 rounded-full"
//     >
//       Login with {provider.name}
//     </button>
//   </div>
// ))}
