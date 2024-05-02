import { useEffect, useState, useContext } from "react";

import { ReactComponent as LoadingIcon } from "../../assets/loading.svg";
import { ReactComponent as SuccessIcon } from "../../assets/tick.svg";
import { ReactComponent as FailureIcon } from "../../assets/X.svg";

import { LoadingFeedbackContext } from "../../contexts/loadingFeedback.context";

import "./loadingFeedback.styles.scss";

function LoadingFeedback() {
  const [moreInfoOpened, setMoreInfoOpened] = useState(false);
  const { isLoading, isSuccessful, setIsSuccessful } = useContext(
    LoadingFeedbackContext
  );

  useEffect(() => {
    if (isLoading || typeof isSuccessful === "string") {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isLoading, isSuccessful]);

  const handleMoreInfoClick = (e) => {
    e.stopPropagation();
    setMoreInfoOpened(!moreInfoOpened);
  };

  return isLoading || typeof isSuccessful === "string" ? (
    <div
      className="loading-feedback-container"
      onClick={() => setIsSuccessful(null)}
    >
      {isLoading && <LoadingIcon />}
      <div
        className={`feedback-container ${
          typeof isSuccessful === "string" ? "visible" : ""
        }`}
      >
        {isSuccessful === "" ? (
          <>
            <SuccessIcon />
            <p className="feedback-text">Operation Successful!</p>
          </>
        ) : (
          <>
            <FailureIcon />
            <p className="feedback-text red-text">Operation Failure!</p>
            <p className="more-info" onClick={handleMoreInfoClick}>
              More Info{" "}
              <span className={moreInfoOpened ? "opened" : ""}>&#8964;</span>
            </p>
            {moreInfoOpened && <p className="feedback-info">{isSuccessful}</p>}
          </>
        )}
      </div>
    </div>
  ) : null;
}

export default LoadingFeedback;
