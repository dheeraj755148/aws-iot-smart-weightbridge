import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as AWS from "aws-sdk";

AWS.config.update({
  region: "ap-south-1",
  endpoint: "dynamodb.ap-south-1.amazonaws.com",
  accessKeyId: "AKIAQCQCGYXPAO2MD5XS",
  secretAccessKey: "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",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/* Access: AKIAQCQCGYXPAO2MD5XS */
/* Secret : POIdX+ml1Vq+nQVc+zT1+5+tp+I2gkrfQ33XVvnq */
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
