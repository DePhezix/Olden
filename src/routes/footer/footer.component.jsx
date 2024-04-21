import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./footer.styles.scss";

function Footer() {
  const [contentEnough, setContentEnough] = useState(false);
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
  }, [
    location.pathname,
    window.innerHeight,
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight,
  ]);

  return (
    <div
      className={`footer-container ${!contentEnough && "lower-footer"}`}
    >
      <span>&#169; The Olden {currentYear}. No Rights Reserved</span>
    </div>
  );
}

export default Footer;