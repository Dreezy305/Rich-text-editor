/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";

type Props = {
  onClose?: () => void;
  title: string;
  children: React.ReactNode;
  open: boolean;
};

function Embed({ onClose, title, children, open }: Props) {
  return (
    <>
      <div
        className={`modal ${open ? "block" : "hidden"} `}
        // role="modal"
        id="modal"
        aria-labelledby="modal"
        aria-modal="true"
        data-testid="modal"
      >
        <div className={`modal-content`} style={{ width: "20%" }}>
          <div className="modal-header relative">
            <span
              className="close-btn absolute cursor-pointer"
              onClick={onClose}
            >
              &times;
            </span>
            <h2 className={`font-bold opacity-100`}>{title}</h2>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Embed;
