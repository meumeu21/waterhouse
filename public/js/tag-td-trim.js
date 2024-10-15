document.addEventListener("lyricsChanged", function() {
    const tds = document.querySelectorAll('td');

    tds.forEach(td => {
        if (td.textContent.trim() === "") {
            td.classList.add('empty');
        }
    });
});