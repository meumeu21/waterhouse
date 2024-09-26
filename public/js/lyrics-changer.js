document.addEventListener("DOMContentLoaded", function() {
    // Step 1: Check if the URL contains "songs-translations"
    if (window.location.href.includes("songs-translations")) {
        // Step 2: Find the <p> tag and check its content for 'official' or 'english'
        const pTag = document.querySelector("p");
        const pText = pTag ? pTag.textContent.toLowerCase() : "";
        console.log(pText);

        // Step 3: Find the table and check the number of <th> tags
        const table = document.querySelector("table");
        if (table) {
            const thElements = table.querySelectorAll("th");
            const thCount = thElements.length;

            // Step 4: Create a container for the buttons
            const buttonContainer = document.createElement("div");
            buttonContainer.style.display = "flex"; // Align buttons horizontally
            buttonContainer.style.gap = "10px";    // Add space between buttons
            buttonContainer.style.marginBottom = "20px"; // Add margin from the table

            // Helper function to check if a string contains only Latin characters
            function isLatin(text) {
                return /^[a-zA-Z\s]+$/.test(text);
            }

            // Helper function to check if a string contains only Cyrillic characters
            function isCyrillic(text) {
                return /^[а-яА-ЯёЁ\s]+$/.test(text);
            }

            for (let i = 1; i <= thCount; i++) {
                const button = document.createElement("button");
                button.textContent = thElements[1].textContent.trim();
                button.textContent = pText;
                if (thCount === 2 && pText.includes("official")) {
                    if (isLatin(thElements[1].textContent.trim())) {
                        if (i === 1) {
                            button.textContent = 'original text';
                        } else if (i === 2) {
                            button.textContent = 'english translation';
                        }
                    } else if (isCyrillic(thElements[1].textContent.trim())) {
                        if (i === 1) {
                            button.textContent = 'original text';
                        } else if (i === 2) {
                            button.textContent = 'russian translation';
                        }
                    }
                } else if (thCount === 2 && pText.includes("english")) {
                    if (i === 1) {
                        button.textContent = 'english translation';
                    } else if (i === 2) {
                        button.textContent = 'russian translation';
                    }
                } else if (thCount === 3) {
                    if (i === 1) {
                        button.textContent = 'original text';
                    } else if (i === 2) {
                        button.textContent = 'english translation';
                    } else {
                        button.textContent = 'russian translation';
                    }
                }
                button.style.padding = "10px";
                button.style.cursor = "pointer";
                buttonContainer.appendChild(button);
            }

            // Step 6: Insert the buttons before the table
            table.insertAdjacentElement("beforebegin", buttonContainer);
        }
    }
});
