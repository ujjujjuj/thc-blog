import Footer from "../components/Footer";
import Nav from "../components/Nav";

const NotFound = () => {
  return (
    <>
      <Nav />
      <div className="flex justify-center items-center flex-col gap-4 flex-1 font-euclid">
        <span className="text-6xl">404</span>
        <span className="">Page not found</span>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
