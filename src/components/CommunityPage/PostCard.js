import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import like from "../../resources/likes-empty.svg"
import './community.css'
import Iframe from 'react-iframe';
import { getProject } from "../../services/projects";

const Post = (props) => {

  const [src, setSrc] = useState(null);
  const [isIframe, setIsIframe] = useState(false);
  const [classname, setClassname] = useState("");
  const [show, setShow] = useState(false);

  const colors = ["postUnicorn", "postEasyA", "postGrape", "postSky", "postSage", "postBus", "postPumpkin"];
  const colorInt = Math.floor(Math.random() * 7);
  const postClass = colors[colorInt];

  const backgroundcolors = ["var(--unicornLight)", "var(--easyALight)", "var(--grapeLight)", "var(--skyLight)", "var(--sageLight)", "var(--busLight)", "var(--pumpkinLight)"];
  const iFrameClass = backgroundcolors[colorInt];

  const handleIframeLoad = () => {
    const iframe = document.getElementById(props.item._id);
    const iframeWindow = iframe.contentWindow;
    iframeWindow.alert = (message) => {
      doNothing(message);
    };
  };

  function doNothing(message) {
    return 
  }
  
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
    setClassname(postClass);
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const data = await getProject(props.item._id);
      // convert the data to json
      if (data.htmlCode === '') {
        setIsIframe(false);
        setClassname(postClass);
  
      } else {
        // set state with the result
        var code = data.javaCode;
        if (data.cleanedCode !== "") {
          code = data.cleanedCode;
        }
        const url = getGeneratedPageURL({
          html: data.htmlCode,
          css: data.cssCode,
          js: code
        });
          setSrc(url);
          setIsIframe(true);
          setClassname("iFramePost");   

      }
    }
    fetchData().catch(console.error);;
  }, []);


  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true)
    }, 750)
    return () => clearTimeout(timeout)
  }, [show])


  const navigate = useNavigate();
  // let tag = props.item.tags.length > 0 ? props.item.tags[0].toString().toLowerCase() : "undefined"
  let tag = props.item.tags.length > 0 ? props.item.tags[0].toString().toLowerCase() : ""

  if (show) {
    return (
      <div id="post-card-container" key={props.key} className={classname} onClick={() => navigate(`/project/${props.item.id}`)}>
        {isIframe ?
          <>
            <div className="pc-iframe-container" style={{ "background-color": iFrameClass }}>
              <Iframe url={src} className="post-card-iframe" id={props.item._id} styles={{ borderWidth: 0, margin: 0, display: 'block' }} onLoad={handleIframeLoad} />
            </div>
            <div className="body">
              <div className="body-title">
                <h3 className="if-post-title">{props.item.title}</h3>
                <span className="username">@{props.item.username}</span>
              </div>
              <div className="body-footer">
                <div className="tag" id={tag}>
                  <span>#{tag}</span>
                </div>
                <div className="if-likes">
                  <img src={like} alt="likes" />
                  <span>{props.item.likes}</span>
                </div>
              </div>
            </div>
          </>
          :
          <div>
            <div className="titles"></div>
            <div className="footer">
              <div className="post-footer-1">
                <h3 className="post-title">{props.item.title}</h3>
                <span className="username">@{props.item.username}</span>
              </div>
              <div className="post-footer-2">
                <div className="tag" id={tag}>
                  <span>#{tag}</span>
                </div>
                <div className="likes">
                  <img src={like} alt="likes" />
                  <span>{props.item.likes}</span>
                </div>
              </div>
            </div>
          </div>
        }
      </div >
    );
  } else {
    return (<></>);
  }
};

export default Post;