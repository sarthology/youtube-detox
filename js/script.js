let keyword = document.getElementById("keyword");
let searchSuggestion = document.getElementById("search-suggestion");
let suggestion = document.querySelector(".suggestion");

keyword.onkeyup = e => {
  searchSuggestion.innerHTML = ""
  if(keyword.value.trim() === "") return
  else{
    searchSuggestion.innerHTML = ""
    if (e.keyCode === 13) {
      saveQuery(keyword.value) 
      searchYoutube(keyword.value);
    }
    else{
      let history = JSON.parse(localStorage.getItem("history"));
      let seachString =  new RegExp(keyword.value,"gi");
      renderSuggestions( history.filter(query => query.match(seachString)));     
    };
  }
};

keyword.onfocus = e => { 
  let history = JSON.parse(localStorage.getItem("history"));
  searchSuggestion.innerHTML = ""
  if(history){
    renderSuggestions(history);
  }
};

const saveQuery = query => {
  if(localStorage.getItem("history")){
    let oldHistory = JSON.parse(localStorage.getItem("history"))
    if(oldHistory.includes(query)) return
    oldHistory.push(query);
    let history = JSON.stringify(oldHistory);
    localStorage.setItem("history",history)
  }
  else{
    let history = JSON.stringify([query])
    localStorage.setItem("history",history);
  }
}

const renderSuggestions = history =>{
  history.forEach(query => {
    searchSuggestion.style = "display:block";
    var newElement = document.createElement('div');
    newElement.className = "suggestion";
    newElement.onclick = ()=>{clickOnSuggestion(query)}
    newElement.innerHTML = `<p>${query}</p>`;
    searchSuggestion.appendChild(newElement);
  });
}

clickOnSuggestion = query => {
  searchYoutube(query);
}

const searchYoutube = query =>{
  searchSuggestion.innerHTML = ""
  window.location =
        "https://www.youtube.com/results?search_query=" +
        query.split(" ").join("+");
}