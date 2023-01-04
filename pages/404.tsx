import Head from "next/head";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Page Not Found | THC</title>
      </Head>
      <Nav />
      <div className="flex flex-col flex-1 gap-4 justify-center items-center font-euclid">
        <span className="text-6xl">404</span>
        <span className="">Page not found</span>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
