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
    var code = props.cleanedCode;
    if (code === "") {
      code = props.javaCode;
    }
    console.log(props.cleanedCode);
    const url = getGeneratedPageURL({
      html: props.htmlCode,
      css: props.cssCode,
      js: code,
    });
    setIframeSrc(url);

  }, [props.htmlCode, props.cssCode, props.javaCode, props.cleanedCode]);



  return (
    <div className="output-window" >
      <iframe src={iframeSrc}
        width={props.width}
        height={props.height}
        id=""
        className="iframe"
        display="block"
        position="relative"
      />
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
