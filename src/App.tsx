/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./App.css";
import { ReactComponent as Polaroid } from "./assets/polaroid.svg";
import { ReactComponent as Social } from "./assets/social.svg";
import { ReactComponent as Video } from "./assets/video.svg";
import { convertToBase64 } from "./utils/logic";

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
  const editorRef: any = useRef(null);
  const [value, setValue] = useState<any>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [video, setVideo] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [preview, setPreview] = useState<any>();

  const onChange = (e: any) => {
    setValue(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const Change = e.target.value;
    setVideo(Change);
  };

  const wordCount = editorRef?.current?.selection?.index || 0;

  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    const base64: any = await convertToBase64(file);
    setValue((prev: any) => {
      return `<p>
          <img src=${base64} />
        </p>`;
    });
    setIsOpen(false);
  };

  return (
    <div className="container">
      <div className="parent">
        <div className="quill-box">
          <div className="top-div" />
          <div className="title-container">
            {/* <h4 className="title">Title</h4> */}
            <input
              className="title-container-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter title"
            />
          </div>
          <div className="quill-parent">
            <ReactQuill
              theme="snow"
              value={value}
              onChange={(e: any) => onChange(e)}
              className="quill-container"
              modules={modules}
              ref={editorRef}
            />
            <div className="plus" onClick={() => setIsOpen(true)}>
              <span className="plus-sign">+</span>
            </div>
            {isOpen && (
              <div className="embed-card">
                <h6 className="embed-title">EMBEDS</h6>
                <div className="embed-option">
                  <Polaroid />
                  <div className="embed-stack">
                    <label className="span-1" htmlFor="upload">
                      Picture
                    </label>
                    <input
                      type={"file"}
                      accept="image/*"
                      placeholder=""
                      id="upload"
                      name="upload"
                      hidden
                      onChange={(e: any) => {
                        handleImageChange(e);
                      }}
                    />
                    <span className="span-2">Jpeg, png</span>
                  </div>
                </div>

                <div
                  className="embed-option"
                  onClick={() => {
                    setShow(true);
                    setIsOpen(false);
                  }}
                >
                  <Video />
                  <div className="embed-stack">
                    <span className="span-1">Video</span>
                    <span className="span-2">Embed a YouTube video</span>
                  </div>
                </div>

                <div className="embed-option" onClick={() => setIsOpen(false)}>
                  <Social />
                  <div className="embed-stack">
                    <span className="span-1">Social</span>
                    <span className="span-2">Embed a Facebook link</span>
                  </div>
                </div>
              </div>
            )}

            {show && (
              <div className="embed-link-card">
                <span className="embed-video">Enter Video:</span>
                <input
                  placeholder="EMBED URL"
                  onChange={handleChange}
                  className=""
                  type={"text"}
                />
                <span
                  className="embed-save"
                  onClick={() => {
                    setShow(false);
                    setValue(
                      `<iframe class="ql-video" frameborder="0" allowfullscreen="true" src=${video}/><p><br></p>`
                    );
                  }}
                >
                  SAVE
                </span>
              </div>
            )}
          </div>
          <div className="word-count">
            <span className="words">{wordCount}/1000 words</span>
          </div>
        </div>

        <div className="post-btn-container">
          <button
            className="post-btn"
            onClick={() => {
              setPreview(value);
            }}
          >
            post
          </button>
        </div>
      </div>

      <div className="divider" />
      <div className="preview" dangerouslySetInnerHTML={{ __html: preview }}></div>
    </div>
  );
}

export default App;

//left: -138.5px; top: 28px;
