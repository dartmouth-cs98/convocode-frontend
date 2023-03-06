import React, { useEffect, useState } from "react";
import './index.css'
import { connect } from 'react-redux';
import { addJavascriptCode, addHTMLCode, addCSSCode, addCleanedJavascript } from "../../state/actions";
import Iframe from 'react-iframe';

const WebOutput = (props) => {
  const [iframeSrc, setIframeSrc] = useState(null);


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
    const url = getGeneratedPageURL({
      html: props.htmlCode,
      css: props.cssCode,
      js: props.cleanedCode,
    });
    setIframeSrc(url);

  }, [props.htmlCode, props.cssCode, props.javaCode, props.cleanedCode]);



  return (
    <div className="output-window" >
      <Iframe url={iframeSrc}
        // width="640px"
        // height="320px"
        width={props.width}
        height={props.height}
        id=""
        className="iframe"
        display="block"
        position="relative"
        onClick={() => alert("in iframe")} />
    </div>
  );
};

const mapStateToProps = (reduxstate) => {
  return {
    javaCode: reduxstate.project.javaCode,
    htmlCode: reduxstate.project.htmlCode,
    cssCode: reduxstate.project.cssCode,
    cleanedCode: reduxstate.project.cleanedCode,
  };
};

export default connect(mapStateToProps, { addJavascriptCode, addHTMLCode, addCSSCode, addCleanedJavascript })(WebOutput);
