import Footer from "../components/Footer";
import Nav from "../components/Nav";

const Trips = () => {
  return (
    <>
      <Nav />
      <div className="flex justify-center items-center flex-col gap-4 flex-1 font-euclid">
        <h1 className="text-5xl">Trips</h1>
      </div>
      <Footer />
    </>
  );
};

export default Trips;
