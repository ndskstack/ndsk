// src/pages/hello.js
export default (props) => {
    return (
      <html lang="en">
        <head>
          <title>Simple NDSK.js Route</title>
        </head>
        <body>
          <h1>{props.message}</h1>
        </body>
      </html>
    );
  };