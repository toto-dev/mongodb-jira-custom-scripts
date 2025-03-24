// ==UserScript==
// @name         Add copy buttons to jira ticket web page
// @namespace    MongoDB Jira custom scripts
// @version      1.0
// @description  Adds copy buttons next to the Jira ticket ID
// @match        https://jira.mongodb.org/browse/*
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
'use strict';

/* waitForKeyElements
 * @param {string}   selector    Required: The selector string that specifies
 *     the desired element(s).
 * @param {Function} callback    Required: The code to run when elements are
 *     found. It is passed an element to the matched element.
 * @param {boolean}  bWaitOnce   Optional: If false, will continue to scan for
 *     new elements even after the first match is found (default is true).
 */
function waitForKeyElements(selector, callback, bWaitOnce = true) {
  const elements = document.querySelectorAll(selector);

  if (elements) {
    // if the elements already exist, then call the function passed
    elements.forEach(element => callback(element));
  }

  const observer = new MutationObserver(mutations => {
    mutations
        .filter(({addedNodes}) =>
                    addedNodes.length) // keep only newly added elements
        .forEach(({addedNodes}) => {
          [...addedNodes]
              .filter(element => element?.matches?.(selector))
              .forEach(element => callback(element, observer));

          // respect bWaitOnce
          if (bWaitOnce)
            observer.disconnect();
        });
  });

  observer.observe(document.body, {childList : true, subtree : true});
}

function createCopyButtonElem(tooltipText) {
  // Create button element
  const button = document.createElement("button");
  button.classList.add("custom-edit-button");
  button.style.alignItems = "center";
  button.style.padding = "1px 1px";
  button.style.marginLeft = "5px";
  button.style.border = "none";
  button.style.cursor = "pointer";
  button.style.borderRadius = "3px";

  // Create icon element
  let icon = document.createElement("span");
  icon.classList.add("icon", "aui-icon", "aui-icon-small", "aui-iconfont-copy");
  icon.setAttribute("title", tooltipText);
  icon.style.color = "var(--lt-color-text-light)";

  // Append icon and text to button
  button.appendChild(icon);

  return button;
}

// Callback function to execute when mutations are observed
const ticketIdObserver = (element, observer) => {
  let ticketID = element.innerText;
  let ticketURL = new URL(element.href, window.location.origin);
  let button = createCopyButtonElem("Copy ticket ID");
  // Add click event
  button.addEventListener("click", () => {
    GM_setClipboard(ticketID, 'text');
    // GM_setClipboard(element.outerHTML, 'html');
    let icon = button.querySelector(".icon");
    if (icon) {
      icon.classList.replace("aui-iconfont-copy", "aui-iconfont-check");
      setTimeout(() => icon.classList.replace("aui-iconfont-check",
                                              "aui-iconfont-copy"),
                 2000);
    }
  });
  element.insertAdjacentElement('afterend', button);
};

const titleObserver = (element, observer) => {
  let ticketID = document.querySelector('#key-val').innerText;
  let ticketTitle =
      document.querySelector('#summary-val > h2:nth-child(1)').innerText;
  let textToCopy = `${ticketID} ${ticketTitle}`;

  console.log(`XOXO ${ticketTitle}`);
  let button = createCopyButtonElem("Copy ticket ID and title");
  // Add click event
  button.addEventListener("click", () => {
    GM_setClipboard(textToCopy, 'text');
    // GM_setClipboard(element.outerHTML, 'html');
    let icon = button.querySelector(".icon");
    if (icon) {
      icon.classList.replace("aui-iconfont-copy", "aui-iconfont-check");
      setTimeout(() => icon.classList.replace("aui-iconfont-check",
                                              "aui-iconfont-copy"),
                 2000);
    }
  });
  element.insertAdjacentElement('afterend', button);
};

console.log(`XOXO start script to add copy buttons.`);
// const ticketIdNode = document.getElementById("key-val");
waitForKeyElements("#key-val", titleObserver, true /* waitOnce */);
waitForKeyElements("#key-val", ticketIdObserver, true /* waitOnce */);
})();
