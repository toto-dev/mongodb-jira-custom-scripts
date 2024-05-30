// ==UserScript==
// @name        New script mongodb.org
// @namespace   Violentmonkey Scripts
// @match       https://jira.mongodb.org/browse/SERVER-*
// @grant       none
// @version     1.0
// @author      -
// @description 5/29/2024, 11:50:56 PM
// @grant GM_xmlhttpRequest
// ==/UserScript==

let impactFieldName = "customfield_23577"

let apiEndpoint = "https://jira.mongodb.org/rest/api/2"
let customFieldsListSelector = "#customfield-panel-1 > ul:nth-child(1)"

function createImpactFieldElem(impact) {
  let elem = document.createElement('li');
  elem.setAttribute('id', impactFieldName);
  elem.setAttribute('class', "item")
  elem.innerHTML = `
  <div class="wrap">
    <strong class="name">
      <label for=${impactFieldName}>CAR Impact:</label>
    </strong>
    <div id="${impactFieldName}-val" class="value inactive">
      <div class="shorten" id="${
      impactFieldName}-field" resolved="" style="height: auto;">
        <span>${impact.value}</span>
      </div>
  </div>
  `;
  return elem;
}

function addImpactField(impact) {
  console.log(`XOXO1 ${JSON.stringify(impact)}`)
  let impactField = createImpactFieldElem(impact);
  document.querySelector(customFieldsListSelector).prepend(impactField);
}

function getImpactObject(ticketId) {
  let url = `${apiEndpoint}/issue/${ticketId}?fields=${impactFieldName}`
  return GM_xmlhttpRequest({
    url : url,
    mehtod : 'GET',
    responseType : 'json',
    onload : function(response) {
      addImpactField(response.response['fields']["customfield_23577"]);
    },
    onerror : function(error) { console.error('Error fetching JSON:', error); }
  });
}

console.log(`XOXO start`)
let ticketId = document.URL.match(/SERVER-\d+/)[0]
getImpactObject(ticketId)
