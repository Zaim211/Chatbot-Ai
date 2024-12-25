import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
            <p className="font-bold text-black lg:text-3xl text-xl">
              <span className="text-[#77be89]">Leads</span>Generation.
              <span className="text-[#77be89]">AI</span>
            </p>
          </div>
          
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-[#86ad86] lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-0 flex flex-col items-center lg:mt-0 mt-4 justify-start m-auto lg:flex-row">
            <Button
              onClick={handleRedirect}
              className="bg-[#5ba85b] mb-2 text-white font-bold text-sm rounded-lg flex items-center hover:bg-[#e6ece6] transition lg:hidden"
            >
              Planifier une Réunion
              <FontAwesomeIcon
                icon={faCalendarAlt}
                style={{
                  fontSize: "20px",
                }}
                className="ml-2"
              />
            </Button>
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-bold text-xl uppercase text-black transition-colors  ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-2 md:py-8 lg:-mr-0.25 lg:text-sm text-lg lg:font-semibold ${
                  item.url === pathname.hash
                    ? "z-0 lg:text-black py-0"
                    : "lg:text-black"
                } lg:leading-0 xl:text-sm  xl:px-3`}
              >
                <span className="inline-block space-x-6 gap-6 text-sm relative">
                  <span className="underline mb-4 lg:mb-0">{item.title}</span>
                </span>
              </a>
            ))}
          </div>

          <HamburgerMenu />
        </nav>

        <Button
          onClick={handleRedirect}
          className="bg-[#77be89] text-white font-bold hover:text-black text-md rounded-lg mr-4 items-center hover:bg-[#5ea76c] transition hidden lg:flex"
        >
          Planifier un rendez-vous
          <FontAwesomeIcon
            icon={faCalendarAlt}
            style={{ fontSize: "20px" }}
            className="ml-2" // Adds space to the left of the icon
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
