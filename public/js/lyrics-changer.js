document.addEventListener("DOMContentLoaded", function () {
    showTableVersion('full');
    // После завершения всех изменений вызываем событие "lyricsChanged"
    document.dispatchEvent(new Event('lyricsChanged'));
});

function showTableVersion(version) {

    const smartTable = document.getElementById('tr-table');
    const tableCount = document.querySelectorAll("table").length;
    const table = (tableCount > 1) ? 
        document.querySelectorAll("table")[1] :
        smartTable;
    const rows = table.rows;

    const firstRow = table.rows[0];  
    const cellCount = firstRow.cells.length;  
    const toggle2 = document.getElementById('toggle2');  
    const toggle3 = document.getElementById('toggle3'); 
    const toggle4 = document.getElementById('toggle4'); 

    const allPElements = document.querySelectorAll('p');

    const searchTextEng = "english translation";
    const searchTextOri = "official lyrics";

    let matchingPElement = null;

    allPElements.forEach((pElement) => {
        if (pElement.textContent.trim().includes(searchTextEng) || pElement.textContent.trim().includes(searchTextOri)) {
            matchingPElement = pElement;
        }
    });

    if (matchingPElement.textContent.includes('english translation')) {
        toggle3.textContent = 'english translation';
    } else if (matchingPElement.textContent.includes('official lyrics')) {
        toggle3.textContent = 'original text';
    }

    const cyrillicRegex = /[\u0400-\u04FF]/;
    const heading = document.querySelector('h3').textContent;
    const headingParts = heading.split('|')
    const cyrillicHeading = headingParts[0].trim()
    if (cyrillicRegex.test(cyrillicHeading)) {
        toggle4.textContent = 'english translation';
    }

    if (tableCount === 1) {
        const column0 = document.getElementById('column0');
        const column1 = document.getElementById('column1');
        const column2 = document.getElementById('column2');

        if (!column0) {
            toggle2.style.display = 'none'; // Скрываем toggle2, если column0 отсутствует
        }

        moveDivContentToColumn(column0, 0);
        moveDivContentToColumn(column1, 1);
        moveDivContentToColumn(column2, 2);
    
        if (version === 'full') {
            for (let i = 0; i < rows.length; i++) {
                for (let j = 0; j < rows[i].cells.length; j++) {
                    if (!column0 && j === 0) {
                        rows[i].cells[j].style.display = 'none'; // Скрываем первый столбец, если column0 отсутствует
                    } else {
                        rows[i].cells[j].style.display = ''; // Показываем все остальные столбцы
                    }
                }
            }
            table.style.width = '100%';
            if (column0) column0.style.display = 'none';
            if (column1) column1.style.display = 'none';
            if (column2) column2.style.display = 'none';
        } else {
            // Показываем только выбранные столбцы при нажатии на toggle-кнопки
            table.style.width = '60%';
            table.style.marginLeft = 'auto';
            table.style.marginRight = 'auto';
    
            for (let i = 0; i < rows.length; i++) {
                for (let j = 0; j < rows[i].cells.length; j++) {
                    rows[i].cells[j].style.display = 'none'; // Сначала скрываем все столбцы
                }
            }
    
            if (version === 'version1' && column0) {
                for (let i = 0; i < rows.length; i++) {
                    rows[i].cells[0].style.display = ''; // Показываем первый столбец
                }
            }
            if (version === 'version2') {
                for (let i = 0; i < rows.length; i++) {
                    rows[i].cells[1].style.display = ''; // Показываем второй столбец
                }
            }
            if (version === 'version3') {
                for (let i = 0; i < rows.length; i++) {
                    rows[i].cells[2].style.display = ''; // Показываем третий столбец
                }
            }
        }
    } else {
        smartTable.style.display = 'none';
        if (cellCount === 2) {
            toggle2.style.display = 'none';  
        }
    
        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < rows[i].cells.length; j++) {
                rows[i].cells[j].style.display = '';
            }
        }

        if (version === 'full') {
            table.style.width = '100%';
        } else {
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

}

// Функция для переноса содержимого из div в соответствующий столбец таблицы
function moveDivContentToColumn(columnDiv, columnIndex) {
    if (!columnDiv) return; // Если div не найден, выходим

    const lines = columnDiv.innerHTML.split('\n'); // Разделяем содержимое div по строкам
    const table = document.getElementById('tr-table');
    const rows = table.querySelectorAll('tbody tr');

    // Переносим первую строку в заголовок столбца
    const th = table.querySelectorAll('thead th')[columnIndex];
    th.innerHTML = lines[0] || ''; // Первая строка идет в th

    let sliceStart = 1;
    if (lines[1] === '') {
        sliceStart = 2;
    }

    // Переносим остальные строки в соответствующие ячейки td
    lines.slice(sliceStart, -1).forEach((line, index) => {
        if (index >= rows.length) {
            const newRow = table.querySelector('tbody').insertRow();
            for (let i = 0; i < table.querySelectorAll('thead th').length; i++) {
                newRow.insertCell(); // Добавляем td
            }
        }
        const currentRow = table.querySelectorAll('tbody tr')[index];
        currentRow.cells[columnIndex].innerHTML = line || ''; // Заполняем строки с сохранением HTML
    });
}

// Добавляем обработчики событий на кнопки
document.getElementById('toggle1').addEventListener('click', function () {
    showTableVersion('full'); // Показываем всю таблицу
});
document.getElementById('toggle2').addEventListener('click', function () {
    showTableVersion('version1'); // Показываем только первый столбец
});
document.getElementById('toggle3').addEventListener('click', function () {
    showTableVersion('version2'); // Показываем только второй столбец
});
document.getElementById('toggle4').addEventListener('click', function () {
    showTableVersion('version3'); // Показываем только третий столбец
});