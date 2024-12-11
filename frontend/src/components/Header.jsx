import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { curve } from "../assets";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  const handleRedirect = () => {
    window.open("https://app.iclosed.io/e/Amar/rendez-vous", "_blank");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8" href="/">
          <div className="flex items-center ">
            {/* <img src={bot} width={32} height={32} alt="Chat AI" /> */}
            <p className="font-bold text-black text-3xl">
              <span className="text-[#77be89]">Bot</span>Generation.
              <span className="text-[#77be89]">Ai</span>
            </p>
          </div>
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-[#86ad86] lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center gap-0 justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-bold text-2xl uppercase text-black transition-colors hover:text-[#228B22] ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-sm lg:font-semibold ${
                  item.url === pathname.hash
                    ? "z-2 lg:text-black"
                    : "lg:text-black underline"
                } lg:leading-5 xl:text-md lg:hover:text-n-1 xl:px-6`}
              >
                <span className="inline-block relative">
                  {item.title}
                  <img
                    src={curve}
                    className="absolute top-full left-0 w-full xl:-mb-4"
                    alt="Curve"
                  />
                </span>
              </a>
            ))}
          </div>

          <HamburgerMenu />
        </nav>

        {/*         
        <Button
        onClick={handleRedirect}
         className="bg-green-500 text-white font-bold text-md rounded-lg flex items-center  hover:bg-green-300 transition"
        >
          Planifier une Réunion
        </Button> */}
        <Button 
  onClick={handleRedirect} 
  className="bg-[#5ba85b] text-white font-bold hover:text-black text-md rounded-lg flex items-center hover:bg-[#e6ece6] transition"
>
  Planifier une Réunion
  <FontAwesomeIcon 
    icon={faCalendarAlt} 
    style={{ fontSize: "20px" }} 
    className="ml-2"  // Adds space to the left of the icon
  />
</Button>


        <Button
          className="ml-auto lg:hidden bg-black rounded-md"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
