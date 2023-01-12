import React, {useEffect, useState} from "react";
import './index.css'
import { connect } from 'react-redux';
import { addJavascriptCode, addHTMLCode, addCSSCode } from "../../state/actions";


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
        js: props.javascriptCode
      });
    setIframeSrc(url);

  }, [props.htmlCode, props.cssCode, props.javascriptCode]);


  return (
    <div className="output-window" data-theme={props.theme}>
        <iframe className="iframe" src={iframeSrc}></iframe>
    </div>
  );
};

const mapStateToProps = (reduxstate) => {
    return {
      javascriptCode: reduxstate.javascriptCode.string,
      htmlCode: reduxstate.htmlCode.string,
      cssCode: reduxstate.cssCode.string,
    };
  };
  
export default connect(mapStateToProps, { addJavascriptCode, addHTMLCode, addCSSCode })(WebOutput);
