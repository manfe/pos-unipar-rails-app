import { SessionProvider } from "next-auth/react"
import { ToastContainer } from "react-toastify";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.min.css";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import axiosInstance from "../src/utils/axios";
import { useEffect } from "react";
import { AuthProvider } from "../src/contexts/JWTContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </AuthProvider>
    </SessionProvider>
  );
}

export default MyApp;
