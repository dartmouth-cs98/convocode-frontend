import React, {useEffect, useState} from "react";
import './index.css'
import { connect } from 'react-redux';
import { addJavascriptCode, addHTMLCode, addCSSCode } from "../../state/actions";
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


    return getBlobURL(source, 'text/html');
  }

  useEffect(() => {
    const url = getGeneratedPageURL({
        html: props.htmlCode,
        css: props.cssCode,
        js: props.javascriptCode
      });
    setIframeSrc(url);

  }, [props.htmlCode, props.cssCode, props.javascriptCode]);


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
      javascriptCode: reduxstate.project.javascript,
      htmlCode: reduxstate.project.html,
      cssCode: reduxstate.project.css,
    };
  };
  
export default connect(mapStateToProps, { addJavascriptCode, addHTMLCode, addCSSCode })(WebOutput);
