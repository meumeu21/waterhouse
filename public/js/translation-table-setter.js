document.addEventListener("DOMContentLoaded", function () {

    const tableCount = document.querySelectorAll("table").length;
    const table = document.getElementById('tr-table');

    if (tableCount > 1) {
        table.style.display = 'none';
    } else {
        // Функция для переноса строк из div в таблицу
        function moveDivContentToColumn(divId, columnIndex) {
            const columnDiv = document.getElementById(divId);
            if (!columnDiv) return; // Если div не найден, выйти из функции

            const lines = columnDiv.innerText.split('\n'); // Разделить текст по переносам строк
            const rows = table.querySelectorAll('tbody tr');
            
            // Переносим первую строку в th (заголовок столбца)
            const th = table.querySelectorAll('thead th')[columnIndex];
            th.textContent = lines[0] || ''; // Первая строка идет в th
            
            // Переносим остальные строки в соответствующие ячейки td
            lines.slice(1).forEach((line, index) => {
                // Если строки в таблице меньше, чем количество строк в div, добавляем новые строки
                if (index >= rows.length) {
                    const newRow = table.querySelector('tbody').insertRow();
                    for (let i = 0; i < table.querySelectorAll('thead th').length; i++) {
                        newRow.insertCell(); // Добавляем td
                    }
                }
                // Получаем строку таблицы
                const currentRow = table.querySelectorAll('tbody tr')[index];
                // Заполняем ячейку в соответствующем столбике
                currentRow.cells[columnIndex].textContent = line || ''; // Пустые строки также добавляются
            });
        }

        // Перенос строк из div в столбцы таблицы
        moveDivContentToColumn('column1', 1); // Строки из column1 во второй столбик
        moveDivContentToColumn('column2', 2); // Строки из column2 в третий столбик

        // Проверить наличие div с id="column0"
        const column0 = document.getElementById('column0');
        // Если div с id="column0" отсутствует, скрыть первый столбик
        if (!column0) {
            const firstColumnCells = table.querySelectorAll('tr > td:first-child, th:first-child');
            firstColumnCells.forEach(cell => {
                cell.style.display = 'none';
            });
        }
        moveDivContentToColumn('column0', 0); // Строки из column0 в первый столбик
    }
    
    
});
