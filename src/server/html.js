import React, { PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';

const Html = props => {
  const { markup, state } = props;
  return (
    <html lang="en" className="no-js">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1"
        />
        {DocumentMeta.renderAsReact()}
        <link
          type="image/x-icon"
          rel="shortcut icon"
          href="/favicon.ico"
          sizes="16x16 32x32 64x64 128x128 256x256"
        />
        {process.env.NODE_ENV === 'production' &&
          <link rel="stylesheet" type="text/css" href="/css/style.css" />}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: markup }} />

        <script
          dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_STATE__=${state};`,
          }}
        />
        <script src="/js/bundle.js" />
      </body>
    </html>
  );
};

Html.propTypes = {
  markup: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
};

export default Html;
