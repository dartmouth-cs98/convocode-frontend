import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import like from "../../resources/likes-empty.svg"
import './community.css'
import Iframe from 'react-iframe';
import { getProject } from "../../services/projects";

const Post = (props) => {

  console.log(props.width, props.height)
  const [src, setSrc] = useState(null);
  const [isIframe, setIsIframe] = useState(false);
  const [classname, setClassname] = useState("");

  const colors = ["postUnicorn", "postEasyA", "postGrape", "postSky", "postSage", "postBus", "postPumpkin"];
  const colorInt = Math.floor(Math.random() * 7);
  const postClass = colors[colorInt];

  const backgroundcolors = ["var(--unicorn)", "var(--easyA)", "var(--grape)", "var(--sky)", "var(--sage)", "var(--bus)", "var(--pumpkin)"];
  const iFrameClass = backgroundcolors[colorInt];

  const getGeneratedPageURL = ({ html, css, js }) => {
    const getBlobURL = (code, type) => {
      const blob = new Blob([code], { type });
      return URL.createObjectURL(blob);
    };

    const cssURL = getBlobURL(css, 'text/css')
    const jsURL = getBlobURL(js, 'text/javascript')
    const source = `
    <html>
      <head>
        ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
      </head>
      <body>
        ${html || ''}
        ${js && `<script src="${jsURL}"></script>`}
      </body>
    </html>`;

    return getBlobURL(source, 'text/html');
  }



  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const data = await getProject(props.item._id);
      console.log(data);
      console.log(data.htmlCode);
      // convert the data to json
      if (data.htmlCode === '') {
        console.log("no HTML");
        setIsIframe(false);
        setClassname(postClass);
        console.log(classname);
      } else {
        // set state with the result
        const url = getGeneratedPageURL({
          html: data.htmlCode,
          css: data.cssCode,
          js: data.cleanedCode,
        });
        setSrc(url);
        setIsIframe(true);
        setClassname("iFramePost");

      }
    }
    fetchData().catch(console.error);;
  }, []);





  const navigate = useNavigate();
  let tag = props.item.tags.length > 0 ? props.item.tags[0].toString().toLowerCase() : "undefined"

  return (
    <div id="post-card-container" key={props.key} className={classname} onClick={() => navigate(`/project/${props.item.id}`)}>
      {isIframe ?
        <>
          <div className="pc-iframe-container" style={{ "background-color": iFrameClass }}>
            <Iframe url={src} className="post-card-iframe" styles={{ borderWidth: 0, margin: 0, display: 'block' }} />
          </div>
          <div className="body">
            <div>
              <h3 className="if-post-title">{props.item.title}</h3>
              <span className="username">@{props.item.username}</span>
            </div>
            <div className="if-likes">
              <img src={like} />
              <span>{props.item.likes}</span>
            </div>
          </div>
        </>
        :
        <div>
          <div className="titles">
            {/* <h3 className="post-title">{props.item.title}</h3>
            <span className="username">@{props.item.username}</span> */}
          </div>
          <div className="footer">
            <div>
              <h3 className="post-title">{props.item.title}</h3>
              <span className="username">@{props.item.username}</span>
            </div>
            {/* <div className="tag" id={tag}>
              <span>#{tag}</span>
            </div> */}
            <div className="likes">
              <img src={like} />
              <span>{props.item.likes}</span>
            </div>
          </div>
        </div>
      }
    </div >
  );
};

export default Post;