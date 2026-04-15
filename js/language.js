// let current_lang = "en";
let page = "";

window.onload = function() {
    page = document.body.getAttribute("data-page");

    if(localStorage.getItem("language") == null){
        localStorage.setItem("language", "nl");
    }

    if(localStorage.getItem("language")){
        import(`./lang/${localStorage.getItem("language")}.js`).then(module => { 
            const language = module.default;
            applyLanguage(language);
        });
    }
}

function applyLanguage(language) {
    if(page === "menu"){
        document.querySelector(".play").textContent = language.menu.play_btn;
        document.querySelector(".how").textContent = language.menu.guide_btn;
        document.querySelector(".settings").textContent = language.menu.settings_btn;
        document.querySelector(".quit").textContent = language.menu.quit_btn;
    } else if(page === "guides") {
        document.querySelector(".guide-title").textContent = language.guide.page_title;
        document.querySelector(".guide-instructions").textContent = language.guide.instructions;
        document.querySelector(".back-btn").textContent = language.guide.back_btn;
    } else if(page === "play") {
        document.querySelector(".victory-title").textContent = language.play.victory.title;
        document.querySelector(".victory-message").textContent = language.play.victory.message;
        document.querySelector(".victory-time").textContent = language.play.victory.time;
        document.querySelector("#playAgainBtn").textContent = language.play.victory.play_again_btn;
        document.querySelector(".defeat-title").textContent = language.play.defeat.title;
        document.querySelector(".defeat-message").textContent = language.play.defeat.message;
        document.querySelector(".defeat-time").textContent = language.play.defeat.time;
        document.querySelector("#playAgainLoseBtn").textContent = language.play.defeat.play_again_btn;
    }
}

function changeLanguage(lang) {
    localStorage.setItem("language", lang);
    location.reload();
}

function getCurrentLanguage() {
    return localStorage.getItem("language") || "en";
}

export default { getCurrentLanguage, applyLanguage, changeLanguage };