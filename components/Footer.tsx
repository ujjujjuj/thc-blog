import Router from "next/router";
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import { IconContext } from "react-icons";
import useWindowWidth from "../hooks/useWindowWidth";

const Footer = () => {
  const width = useWindowWidth();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-10 py-10 md:py-16 border-t-2 border-gray-800 gap-4 mt-auto">
      <div className="md:w-40">
        <span
          className="font-logo text-4xl font-bold cursor-pointer"
          onClick={() => Router.push("/")}
        >
          thc
        </span>
      </div>
      <span className="font-euclid text-sm md:text-base">
        Made with &lt;3 by devs @thc
      </span>
      {width >= 768 ? (
        <IconContext.Provider value={{ size: "1.6rem" }}>
          <div className="flex items-center justify-end gap-5 cursor-pointer w-40">
            <FiFacebook className="transition-opacity opacity-70 hover:opacity-100" />
            <FiInstagram className="transition-opacity opacity-70 hover:opacity-100" />
            <FiYoutube className="transition-opacity opacity-70 hover:opacity-100" />
          </div>
        </IconContext.Provider>
      ) : null}
    </div>
  );
};

export default Footer;
