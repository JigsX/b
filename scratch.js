
function suggestLocation(inputID){
  const suggestions = ["S123", "S214", "S215", "S216", "S217", "S218", "S219", "S220"];

  if(inputID==="currentLocation"){
    inputID = "currentLocation";
    faciDiv = "suggestions-container-current";
  }else if(inputID==="destinationLocation"){
    inputID = "destinationLocation";
    faciDiv = "suggestions-container-destination";
  }
  
  const currentLocation = document.getElementById(inputID);
  const listOfFacilities = document.getElementById(faciDiv);

  currentLocation.addEventListener("input", updateSuggestions);
  currentLocation.addEventListener("focus", updateSuggestions);
  currentLocation.addEventListener("blur", () => {
    // Hide suggestions when the search box loses focus
    setTimeout(() => {
      listOfFacilities.style.display = "none";
    }, 200);
  });

  function updateSuggestions() {
    const inputValue = currentLocation.value.toLowerCase();
    const matchingSuggestions = suggestions.filter(suggestion => suggestion.toLowerCase().includes(inputValue));

    // Clear previous suggestions
    listOfFacilities.innerHTML = "";
    
    // Display matching suggestions
    matchingSuggestions.forEach(suggestion => {
      const suggestionElement = document.createElement("div");
      suggestionElement.classList.add("suggestion");
      suggestionElement.textContent = suggestion;
      
      suggestionElement.style.backgroundColor = "#9FE2BF";
      suggestionElement.addEventListener("click", () => {
        // Set the selected suggestion as the search box value
        currentLocation.value = suggestion;
        // Clear suggestions
        listOfFacilities.style.display = "none";
      });
      listOfFacilities.appendChild(suggestionElement);
    });

    // Show suggestions container
    if (matchingSuggestions.length > 0) {
      listOfFacilities.style.display = "block";
    } else {
      listOfFacilities.style.display = "none";
    }
  }


}



