import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="text-white bg-dark">
      <div className="flex overflow-hidden flex-col mx-auto w-screen min-h-screen max-w-screen-3xl">
        <Component {...pageProps} />
      </div>
      <ToastContainer />
    </div>
  );
}

export default MyApp;
