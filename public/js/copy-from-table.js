document.getElementById('myTable').addEventListener('copy', function(e) {
    e.preventDefault();
    let textToCopy = '';
    let rows = this.querySelectorAll('tr');
    rows.forEach(function(row) {
        textToCopy += row.innerText + '\n';
    });
    e.clipboardData.setData('text/plain', textToCopy);
});