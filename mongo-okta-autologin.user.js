// ==UserScript==
// @name        Employee autologin mongodbcorp
// @namespace   MongoDB Jira custom scripts
// @match       https://corp.mongodb.com/app/mongodb_mongodbjira_1/*
// @grant       none
// @version     1.0
// @author      -
// @description 5/27/2024, 3:29:32 PM
// @require		https://cdn.jsdelivr.net/gh/CoeJoder/waitForKeyElements.js@v1.2/waitForKeyElements.js
// ==/UserScript==

const buttonSelector =
    "html body div#okta-login-container main#okta-sign-in.auth-container.main-container.no-beacon div.auth-content div.auth-content-inner div.siw-main-view.identify.primary-auth div.siw-main-body form#form19.ion-form.o-form.o-form-edit-mode div.o-form-button-bar input.button.button-primary";

waitForKeyElements(buttonSelector, (button) => {
  console.log("XOXO | Started custom script");
  button.click();
});

