import Router from "next/router";
import { FiFacebook, FiInstagram, FiYoutube, FiMail } from "react-icons/fi";
import { IconContext } from "react-icons";
import useWindowWidth from "../hooks/useWindowWidth";

const Footer = () => {
  const width = useWindowWidth();

  return (
    <div className="flex flex-col gap-4 justify-between items-center px-10 py-10 mt-auto border-t-2 border-gray-800 md:flex-row md:py-16">
      <div className="md:w-40">
        <span
          className="relative text-3xl font-bold cursor-pointer font-logo"
          onClick={() => Router.push("/")}
        >
          thc
          <span className="absolute top-0 right-0 text-2xl translate-x-3/4 -translate-y-1/3">
            +
          </span>
        </span>
      </div>
      <span className="text-sm font-poppins font-bold text-gray-200 md:text-base">
        Made with &lt;3 by devs @thc
      </span>
      {width >= 768 ? (
        <IconContext.Provider value={{ size: "1.6rem" }}>
          <div className="flex gap-5 justify-end items-center w-40 cursor-pointer">
            <a
              target="_blank"
              rel="noreferrer"
              href="mailto: thcclubnsut@gmail.com"
            >
              <FiMail className="opacity-70 transition-opacity hover:opacity-100" />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.instagram.com/thc.nsut/"
            >
              <FiInstagram className="opacity-70 transition-opacity hover:opacity-100" />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.youtube.com/channel/UCHhz9XGrUHrN8w3Hq6-2Cmw"
            >
              <FiYoutube className="opacity-70 transition-opacity hover:opacity-100" />
            </a>
          </div>
        </IconContext.Provider>
      ) : null}
    </div>
  );
};

export default Footer;
