const tds = document.querySelectorAll('td');

tds.forEach(td => {
    if (td.textContent.trim() === "") {
        td.classList.add('empty');
    }
});