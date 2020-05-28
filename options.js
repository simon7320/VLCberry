function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    vlcs_adress: document.querySelector("#vlcs_adress").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#vlcs_adress").value = result.vlcs_adress ;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.local.get("vlcs_adress");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
