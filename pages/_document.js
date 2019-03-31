import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { bg, text } from "../vars";

export default class CustomDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <style
            dangerouslySetInnerHTML={{
              __html: `
                body {
                  margin: 0;
                  font-family: "Lato", sans-serif;
                  background-color: ${bg};
                  color: ${text};
                  box-sizing: border-box;
                  overflow-x: hidden;
                }
                a {
                  color: inherit;
                }

                * {
                  box-sizing: inherit;
                }

                /* latin, normal(400) */
                @font-face {
                  font-family: "Lato";
                  font-style: normal;
                  font-weight: 400;
                  src: local("Lato Regular"), local("Lato-Regular"),
                    url(https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjx4wXg.woff2)
                      format("woff2");
                  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC,
                    U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
                    U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
                }

                /* latin black(900)*/
                @font-face {
                  font-family: "Lato";
                  font-style: normal;
                  font-weight: 900;
                  src: local("Lato Black"), local("Lato-Black"),
                    url(https://fonts.gstatic.com/s/lato/v14/S6u9w4BMUTPHh50XSwiPGQ.woff2)
                      format("woff2");
                  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC,
                    U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
                    U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
                }
              `
            }}
          />
          <meta
            name="viewport"
            content="maximum-scale=1, minimum-scale=1, width=device-width, height=device-height"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
