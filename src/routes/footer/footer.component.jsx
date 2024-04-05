import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./footer.styles.scss";

function Footer() {
  const [contentEnough, setContentEnough] = useState(false);
  const footerRef = useRef();
  const location = useLocation();

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const windowHeight = window.innerHeight;
    const contentHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );


    setContentEnough(contentHeight > windowHeight);
  }, [location.pathname]);

  return (
    <div
      className={`footer-container ${!contentEnough && "lower-footer"}`}
      ref={footerRef}
    >
      <span>&#169; The Olden {currentYear}. No Rights Reserved</span>
    </div>
  );
}

export default Footer;