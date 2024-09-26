document.getElementById("search").addEventListener("input", function() {
    let inputValue = this.value.toLowerCase().trim(); 
    let ul = document.getElementById("search-list"); 
    let searchListElements = document.getElementsByClassName('post-title')
    
    if (inputValue.trim() === "") {
        ul.style.display = "none"; 
    } else {
        ul.style.display = "block"; 
        Array.from(searchListElements).forEach(function (elem) {
            let linkElement = elem.querySelector("a");
            let linkText = linkElement.innerText.toLowerCase();
            if (linkText.search(inputValue) == -1) {
                elem.classList.add('hide');
                linkElement.innerHTML = linkElement.innerText;
            }
            else {
                elem.classList.remove('hide');
                let startIndex = linkText.indexOf(inputValue);
                let endIndex = startIndex + inputValue.length;

                let originalText = linkElement.innerText;
                let highlightedText = 
                    originalText.substring(0, startIndex) + 
                    "<span class='highlight'>" + 
                    originalText.substring(startIndex, endIndex) + 
                    "</span>" + 
                    originalText.substring(endIndex);

                linkElement.innerHTML = highlightedText; 
            }
        });
    }
});

document.getElementById("search-list").style.display = "none";
