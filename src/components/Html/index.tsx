import * as React from 'react';


export function Html({ locals, children }) {
  const { path, assets, webpackStats } = locals;
  return ( // :off
    <html lang="en">
      <head>
        <meta
          httpEquiv="Content-Type"
          content="text/html;charset=UTF-8"
        />
        <link
          rel="stylesheet"
          href="./main.css"
        />
        <script src={assets.bundle}></script>
      </head>

      <body>
        <div id="app">
          {children}
        </div>
      </body>
    </html>
  ); // :on
}
