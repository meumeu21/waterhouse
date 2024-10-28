function toggleTheme() {
    const body = document.body;
    const isDarkTheme = body.classList.contains('dark-theme');

    if (isDarkTheme) {
        body.classList.remove('dark-theme');
        document.querySelector('.toggleButton').value = "𖤓";
        document.getElementById('stawer1').innerHTML = "❀";
        document.getElementById('stawer2').innerHTML = "❀";
        localStorage.setItem('theme', 'light'); 
    } else {
        body.classList.add('dark-theme');
        document.querySelector('.toggleButton').value = "☾";
        document.getElementById('stawer1').innerHTML = "✦";
        document.getElementById('stawer2').innerHTML = "✦";
        localStorage.setItem('theme', 'dark');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            document.querySelector('.toggleButton').value = "☾";
            document.getElementById('stawer1').innerHTML = "✦";
            document.getElementById('stawer2').innerHTML = "✦";
        } else {
            document.querySelector('.toggleButton').value = "𖤓";
            document.getElementById('stawer1').innerHTML = "❀";
            document.getElementById('stawer2').innerHTML = "❀";
        }
    } else {
        const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isSystemDark) {
            document.body.classList.add('dark-theme');
            document.querySelector('.toggleButton').value = "☾";
            document.getElementById('stawer1').innerHTML = "✦";
            document.getElementById('stawer2').innerHTML = "✦";
        } else {
            document.querySelector('.toggleButton').value = "𖤓";
            document.getElementById('stawer1').innerHTML = "❀";
            document.getElementById('stawer2').innerHTML = "❀";
        }
    }
}

document.addEventListener("DOMContentLoaded", loadTheme);