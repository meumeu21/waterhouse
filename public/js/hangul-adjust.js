function adjustHangulFontSize() {
    // Regular expression to match Hangul characters (Korean)
    const hangulRegex = /([\u1100-\u11FF\uAC00-\uD7AF]+)/g;

    // Store nodes that need modification
    const nodesToModify = [];

    // Function to traverse all text nodes and collect Hangul text nodes
    function walkTextNodes(node) {
        if (node.nodeType === 3) { // Node type 3 is a text node
            const text = node.nodeValue;

            // Check if there are any Hangul characters
            if (hangulRegex.test(text)) {
                // Store the node for later modification
                nodesToModify.push(node);
            }
        } else {
            // Traverse into child nodes if the current node is not a text node
            let child = node.firstChild;
            while (child) {
                const nextSibling = child.nextSibling; // Save the next sibling, because the current child might be replaced
                walkTextNodes(child);
                child = nextSibling;
            }
        }
    }

    // Perform the actual replacement after all nodes have been collected
    function modifyNodes() {
        nodesToModify.forEach(node => {
            const text = node.nodeValue;
            const fragments = text.split(hangulRegex);

            // Create a document fragment to hold the new structure
            const docFragment = document.createDocumentFragment();

            fragments.forEach(fragment => {
                if (hangulRegex.test(fragment)) {
                    // If the fragment is Hangul, wrap it in a span
                    const span = document.createElement('span');
                    span.style.fontSize = '0.8em';  // Adjust the size as needed
                    span.textContent = fragment;
                    docFragment.appendChild(span);
                } else {
                    // If it's not Hangul, just append the text node directly
                    docFragment.appendChild(document.createTextNode(fragment));
                }
            });

            // Replace the original text node with the new content
            node.parentNode.replaceChild(docFragment, node);
        });
    }

    // Start traversal from the body element and collect nodes
    walkTextNodes(document.body);

    // Modify nodes in one batch
    modifyNodes();
}

// Run the function when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", adjustHangulFontSize);
