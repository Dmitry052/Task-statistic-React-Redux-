/* @flow */
const html = (data: Object, preloadedState: Object): string => `
<!DOCTYPE html>
    <html>
      <head>
        <title>${data.title}</title>
        <link rel="stylesheet", href="/css/font-awesome/css/font-awesome.min.css" >
        <link rel="stylesheet" href="css/bootstrap.css" >
        <style type="text/css">
        ${data.styles.map((style: Object): Object => style.cssText)}
        </style>
      </head>
      <body>
        <div id="root">${data.body}</div>
        <script>
        // WARNING: See the following for security issues around embedding JSON in HTML:
        // http://redux.js.org/recipes/ServerRendering.html#security-considerations
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
          /</g,
          '\\u003c'
        )}
      </script>
      <script src="js/client.ssr.js"></script>
      </body>
    </html>
`;

module.exports = html;
