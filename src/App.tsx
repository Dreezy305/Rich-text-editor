import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./App.css";
import { ReactComponent as Polaroid } from "./assets/polaroid.svg";
import { ReactComponent as Social } from "./assets/social.svg";
import { ReactComponent as Video } from "./assets/video.svg";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, 7] }],
    ["link", "image", "video"],
    ["align", "direction"],
    ["bold", "italic"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
  ],
};

function App() {
  const [value, setValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // var deltaMethods = Quill.getSelection();
  return (
    <>
      <div className="quill-box">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          className="quill-container"
          modules={modules}
        />
        <div className="plus" onClick={() => setIsOpen(true)}>
          <span className="plus-sign">+</span>
        </div>
        {isOpen && (
          <div className="embed-card" onClick={() => setIsOpen(false)}>
            <h6 className="embed-title">EMBEDS</h6>
            <div className="embed-option">
              <Polaroid />
              <div className="embed-stack">
                <span className="span-1">Picture</span>
                <span className="span-2">Jpeg, png</span>
              </div>
            </div>

            <div className="embed-option">
              <Video />
              <div className="embed-stack">
                <span className="span-1">Video</span>
                <span className="span-2">Embed a YouTube video</span>
              </div>
            </div>

            <div className="embed-option">
              <Social />
              <div className="embed-stack">
                <span className="span-1">Social</span>
                <span className="span-2">Embed a Facebook link</span>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <div className="word-count">
        <span className="count">21/100</span>
      </div> */}
    </>
  );
}

export default App;
