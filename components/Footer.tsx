import Router from "next/router";
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import { IconContext } from "react-icons";
import useWindowWidth from "../hooks/useWindowWidth";

const Footer = () => {
  const width = useWindowWidth();

  return (
    <div className="flex flex-col gap-4 justify-between items-center px-10 py-10 mt-auto border-t-2 border-gray-800 md:flex-row md:py-16">
      <div className="md:w-40">
        <span
          className="text-4xl font-bold cursor-pointer font-logo"
          onClick={() => Router.push("/")}
        >
          thc
        </span>
      </div>
      <span className="text-sm font-barlow md:text-base">
        Made with &lt;3 by devs @thc
      </span>
      {width >= 768 ? (
        <IconContext.Provider value={{ size: "1.6rem" }}>
          <div className="flex gap-5 justify-end items-center w-40 cursor-pointer">
            <FiFacebook className="opacity-70 transition-opacity hover:opacity-100" />
            <FiInstagram className="opacity-70 transition-opacity hover:opacity-100" />
            <FiYoutube className="opacity-70 transition-opacity hover:opacity-100" />
          </div>
        </IconContext.Provider>
      ) : null}
    </div>
  );
};

export default Footer;
