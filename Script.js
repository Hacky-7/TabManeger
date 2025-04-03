document.addEventListener("DOMContentLoaded", () => {
    const linkInput = document.getElementById("link-input");
    const addLinkButton = document.getElementById("add-link");
    const linksContainer = document.getElementById("links-container");
    const toggleModeButton = document.getElementById("toggle-mode");
    const chatInput = document.getElementById("chat-input");
    const sendChatButton = document.getElementById("send-chat");
    const chatLog = document.getElementById("chat-log");

    // Dark Mode Toggle
    toggleModeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        toggleModeButton.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    });

    // Laad links uit Local Storage
    let links = JSON.parse(localStorage.getItem("links")) || [];
    function saveLinks() {
        localStorage.setItem("links", JSON.stringify(links));
    }

    function renderLinks() {
        linksContainer.innerHTML = "";
        links.forEach((link, index) => {
            const div = document.createElement("div");
            div.classList.add("link-card");

            const a = document.createElement("a");
            a.href = link;
            a.textContent = link;
            a.target = "_blank";

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "❌";
            removeBtn.addEventListener("click", () => {
                links.splice(index, 1);
                saveLinks();
                renderLinks();
            });

            div.appendChild(a);
            div.appendChild(removeBtn);
            linksContainer.appendChild(div);
        });
    }

    addLinkButton.addEventListener("click", () => {
        const link = linkInput.value.trim();
        if (link && !links.includes(link)) {
            links.push(link);
            saveLinks();
            renderLinks();
            linkInput.value = "";
        }
    });

    renderLinks();

    // Eenvoudige AI chatbot
    function aiResponse(input) {
        input = input.toLowerCase();
        if (input.includes("hallo")) return "Hallo! Hoe kan ik helpen? 😊";
        if (input.includes("hoeveel tabs")) return `Je hebt ${links.length} opgeslagen links.`;
        if (input.includes("verwijder alles")) {
            links = [];
            saveLinks();
            renderLinks();
            return "Alle links zijn verwijderd! 🚀";
        }
        return "Ik begrijp je vraag niet helemaal. 🤔";
    }

    sendChatButton.addEventListener("click", () => {
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        const userDiv = document.createElement("div");
        userDiv.textContent = `👤 ${userMessage}`;
        chatLog.appendChild(userDiv);

        setTimeout(() => {
            const botDiv = document.createElement("div");
            botDiv.textContent = `🤖 ${aiResponse(userMessage)}`;
            chatLog.appendChild(botDiv);
        }, 500);

        chatInput.value = "";
        chatLog.scrollTop = chatLog.scrollHeight;
    });
});
