import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="d-flex flex-wrap justify-content-center align-items-center py-3 my-4 border-top mx-auto"
      style={{ maxWidth: "1200px" }}
    >
      <p className="col-md-4 mb-0 text-muted ps-2">© 2022 Pasta Cookbook</p>

      <Link
        to="/"
        className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none p-2"
      >
        <img src="img/logo.svg" style={{ width: "100px" }} alt="" />
      </Link>

      <ul className="nav col-md-4 justify-content-end">
        <li className="nav-item">
          <Link to="/" className="nav-link px-2 text-muted">
            Domů
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/pridat-recept" className="nav-link px-2 text-muted">
            Přidat recept
          </Link>
        </li>
        <li className="nav-item">
          <Link to="#" className="nav-link px-2 text-muted">
            Pricing
          </Link>
        </li>
        <li className="nav-item">
          <Link to="#" className="nav-link px-2 text-muted">
            FAQs
          </Link>
        </li>
        <li className="nav-item">
          <Link to="#" className="nav-link px-2 text-muted">
            About
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
