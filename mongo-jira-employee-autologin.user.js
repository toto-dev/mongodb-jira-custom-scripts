// ==UserScript==
// @name        Employee autologin
// @namespace   MongoDB Jira custom scripts
// @match       https://jira.mongodb.org/plugins/servlet/samlsso*
// @grant       none
// @version     1.0
// @author      -
// @description 5/27/2024, 3:29:32 PM
// @require		https://cdn.jsdelivr.net/gh/CoeJoder/waitForKeyElements.js@v1.2/waitForKeyElements.js
// ==/UserScript==

const buttonSelector =
    "div.gadget-menu:nth-child(1) > p:nth-child(3) > a:nth-child(1)";

waitForKeyElements(buttonSelector, (button) => {
  console.log("XOXO | Started custom script");
  button.click();
});
