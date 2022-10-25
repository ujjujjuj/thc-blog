import Footer from "../components/Footer";
import Nav from "../components/Nav";

const About = () => {
  return (
    <>
      <Nav />
      <div className="flex justify-center items-center flex-col gap-4 flex-1 font-euclid">
        <h1 className="text-5xl">About</h1>
      </div>
      <Footer />
    </>
  );
};

export default About;
