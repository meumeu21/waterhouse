function showTableVersion(version) {
    const table = document.querySelector("table");
    const rows = table.rows;

    const firstRow = table.rows[0];  
    const cellCount = firstRow.cells.length;  
    const toggle2 = document.getElementById('toggle2');  
    const toggle3 = document.getElementById('toggle3'); 
    const toggle4 = document.getElementById('toggle4'); 

    if (cellCount === 2) {
        toggle2.style.display = 'none';  
    }

    const allPElements = document.querySelectorAll('p');
    const translationCredit = allPElements[2].textContent;

    if (translationCredit.includes('english translation')) {
        toggle3.textContent = 'english translation';
    } else if (translationCredit.includes('official lyrics')) {
        toggle3.textContent = 'original text';
    }

    const cyrillicRegex = /[\u0400-\u04FF]/;
    const heading = document.querySelector('h3').textContent;
    const headingParts = heading.split('|')
    const cyrillicHeading = headingParts[0].trim()
    if (cyrillicRegex.test(cyrillicHeading)) {
        toggle4.textContent = 'english translation';
    }

    // Reset all columns to be visible
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].cells.length; j++) {
            rows[i].cells[j].style.display = '';
        }
    }

    if (version === 'full') {
        table.style.width = '100%';
    } else {
        // Hide columns based on the version
        table.style.width = '60%';
        table.style.marginLeft = 'auto';
        table.style.marginRight = 'auto';
        if (version === 'version1') {
            for (let i = 0; i < rows.length; i++) {
                rows[i].cells[1].style.display = 'none';
                rows[i].cells[2].style.display = 'none';
            }
        } else if (version === 'version2') {
            for (let i = 0; i < rows.length; i++) {
                if (cellCount === 2) {
                    rows[i].cells[1].style.display = 'none';
                } else if (cellCount === 3) {
                    rows[i].cells[0].style.display = 'none';
                    rows[i].cells[2].style.display = 'none';
                }
            }
        } else if (version === 'version3') {
            for (let i = 0; i < rows.length; i++) {
                if (cellCount === 2) {
                    rows[i].cells[0].style.display = 'none';
                } else if (cellCount === 3) {
                    rows[i].cells[0].style.display = 'none';
                    rows[i].cells[1].style.display = 'none';
                }
            }
        } 
    }

}

showTableVersion('full');