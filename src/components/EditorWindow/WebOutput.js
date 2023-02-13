import React, {useEffect, useState} from "react";
import './index.css'
import { connect } from 'react-redux';
import { addJavascriptCode, addHTMLCode, addCSSCode, addCleanedJavascript } from "../../state/actions";
import Iframe from 'react-iframe';
import Run from '../../resources/play.png'


const WebOutput = (props) => {
    const [iframeSrc, setIframeSrc] = useState(null);
  
    const getGeneratedPageURL = ({ html, css, js }) => {
    const getBlobURL = (code, type) => {
        const blob = new Blob([code], { type });
        return URL.createObjectURL(blob);
    };
    
    const cssURL = getBlobURL(css, 'text/css')
    const jsURL = getBlobURL(js, 'text/javascript')
    console.log(css);
    const source = `
    <html>
      <head>
        ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
        ${js && `<script src="${jsURL}"></script>`}
      </head>
      <body>
        ${html || ''}
      </body>
    </html>`;

    console.log(source);

    return getBlobURL(source, 'text/html');
  }

  useEffect(() => {
    const url = getGeneratedPageURL({
        html: props.htmlCode,
        css: props.cssCode,
        js: props.cleanedCode,
      });
    setIframeSrc(url);

  }, [props.htmlCode, props.cssCode, props.javascriptCode, props.cleanedCode]);



  return (
    <div className="output-window" >
      <div className="output-header">
        <button className="transparent">
          Run
          <img src={Run} alt="run" />
        </button>
      </div>
      <Iframe url={iframeSrc}
          width="640px"
          height="320px"
          id=""
          className="iframe"
          display="block"
          position="relative"/>
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
