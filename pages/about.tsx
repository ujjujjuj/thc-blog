import Head from "next/head";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

const About = () => {
  return (
    <>
      <Head>
        <title>About | THC</title>
      </Head>
      <Nav />
      <div className="flex flex-col flex-1 gap-4 justify-center items-center font-euclid">
        <h1 className="text-5xl">About</h1>
      </div>
      <Footer />
    </>
  );
};

export default About;
