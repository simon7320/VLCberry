//var currentTab;
//var currentBookmark;
var vlcs_adress;

function sendURLtoVLC(tabs) {
  	var url_source=tabs[0].url;
	var url_sink = url_source.replace("=","%3D");	
  	console.log("URL of active tab: "+url_source); 
 	console.log("VLC's_adress: "+ vlcs_adress);
	url_sink = "http://"+vlcs_adress+"/requests/status.xml?command=in_play&input="+url_sink;
	console.log("URL-Sink: "+ url_sink);
	var creating = browser.tabs.create({url:url_sink});
}

function pageactionClicked() {
//called when pageaction icon is clicked
	let querying = browser.tabs.query({currentWindow: true, active: true});
        querying.then(sendURLtoVLC, onError);
}


function tab_listener(tabId,changeInfo) {
//called when a tab changed for whatever reason
	browser.pageAction.show(tabId);
}

function  installListener(details) {
//called from firefox when addon is installed
if (details.reason=="install")
  browser.storage.local.set({vlcs_adress: "raspberrypi:8080" });
}

function onError(error) {
    console.log(`Error: ${error}`);
}

function storageChanged() {
//called from firefox when storage had been changed
  function setCurrentChoice(result) {
    vlcs_adress = result.vlcs_adress ;
  }

    let getting = browser.storage.local.get("vlcs_adress");
    getting.then(setCurrentChoice, onError);
}

browser.tabs.onUpdated.addListener(tab_listener);
browser.pageAction.onClicked.addListener(pageactionClicked);
browser.runtime.onInstalled.addListener(installListener)
browser.storage.onChanged.addListener(storageChanged);
storageChanged();
