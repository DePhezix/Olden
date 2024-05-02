import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import { LoadingFeedbackContext } from "../../contexts/loadingFeedback.context";

import "./footer.styles.scss";

function Footer() {
  const { isLoading } = useContext(LoadingFeedbackContext)

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
    isLoading
  ]);

  return (
    !isLoading &&  (
      <div className={`footer-container ${!contentEnough && "lower-footer"}`}>
        <span>&#169; The Olden {currentYear}. No Rights Reserved</span>
      </div>
    )
  );
}

export default Footer;