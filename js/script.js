let keyword = document.getElementById("keyword");
let searchSuggestion = document.getElementById("search-suggestion");
let suggestion = document.querySelector(".suggestion");

keyword.onkeyup = e => {
  if(keyword.value.trim() == "") return
  else{
    searchSuggestion.innerHTML = ""
    if (e.keyCode === 13) {
      saveQuery(keyword.value) 
      window.location =
        "https://www.youtube.com/results?search_query=" +
        keyword.value.split(" ").join("+");
    }
    else{
      let history = JSON.parse(localStorage.getItem("history"));
      let seachString =  new RegExp(keyword.value,"gi");
      history.filter(query => query.match(seachString)).forEach(query => {
        var newElement = document.createElement('div');
        newElement.className = "suggestion";
        newElement.onclick = ()=>{clickOnSuggestion(query)}
        newElement.innerHTML = `<p>${query}</p>`;
        searchSuggestion.appendChild(newElement);
      });
    };
  }
  
};

keyword.onblur = e => { 
  searchSuggestion.innerHTML = ""
};

keyword.onfocus = e => { 
  let history = JSON.parse(localStorage.getItem("history"));
  searchSuggestion.innerHTML = ""

  history.forEach(query => {
    var newElement = document.createElement('div');
    newElement.className = "suggestion";
    newElement.onclick = ()=>{clickOnSuggestion(query)}
    newElement.innerHTML = `<p>${query}</p>`;
    searchSuggestion.appendChild(newElement);
  });
};

clickOnSuggestion = query => {
  window.location =
      "https://www.youtube.com/results?search_query=" +
      keyword.value.split(" ").join("+");
}

const saveQuery = query => {
  if(localStorage.getItem("history")){
    let oldHistory = JSON.parse(localStorage.getItem("history"))
    oldHistory.push(query);
    let history = JSON.stringify(oldHistory);
    localStorage.setItem("history",history)
  }
  else{
    let history = JSON.stringify([query])
    localStorage.setItem("history",history);
  }
}