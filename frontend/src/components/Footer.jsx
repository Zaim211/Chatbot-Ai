import React from "react";
import Section from "./Section";
import { Link } from "react-router-dom"; // Ensure you have this if using react-router-dom

const Footer = () => {
  return (
    <Section crosses className="!px-0 !py-10">
      <div className="container flex sm:justify-between justify-start flex-col items-center gap-2 max-sm:flex-col">
        <p className="caption text-n-4 lg:block mr-6">
          © {new Date().getFullYear()}. All rights reserved.
        </p>

        <ul className="flex gap-5 mt-2 flex-wrap mr-6">
          <li>
            <Link
              to="/cgu"
              className="text-n-4 underline hover:text-n-6 transition-colors text-sm"
            >
              CGU
            </Link>
          </li>
          <li>
            <Link
              to="/politique-de-confidentialité"
              className="text-n-4 underline hover:text-n-6 transition-colors text-sm"
            >
              Politique de confidentialité
            </Link>
          </li>
        </ul>
      </div>
    </Section>
  );
};

export default Footer;
