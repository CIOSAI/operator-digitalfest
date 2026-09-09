class Header extends HTMLElement {
  static list = ["", "timetable", "compo-rules", "about", "contact"];
  static listEN = ["Home", "Timetable", "Categories & Rules", "About", "Contact us"];
  static listZH = ["主畫面", "活動流程", "徵稿類別及規範", "關於", "聯絡我們"];

  constructor() {
    super();
  }

  createChangeTheme(lang) {
    const change_theme = document.createElement("a");
    change_theme.appendChild(document.createTextNode("☀️/🌙"));
    change_theme.id = "change-theme";
    change_theme.title = lang==="en"?"toggle color scheme":"切換亮/暗色模式";
    const media_query_dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const overriding = !!localStorage.theme;
    let is_dark = overriding?(localStorage.theme==="dark"):media_query_dark;
    function set_theme(to_dark) {
      if (to_dark) {
	document.documentElement.classList.add("dark");
      }
      else {
	document.documentElement.classList.remove("dark");
      }
      if (overriding &&
	(localStorage.theme==="dark")===media_query_dark) {
	localStorage.removeItem("theme");
      }
    }
    set_theme(is_dark);
    change_theme.addEventListener("click", ()=>{
      is_dark = !is_dark;
      localStorage.theme = is_dark?"dark":"light";
      set_theme(is_dark);
    });
    return change_theme;
  }

  createChangeLanguage(lang) {
    const change_language = document.createElement("a");
    change_language.appendChild(document.createTextNode("中/Eng"));
    change_language.id = "change-language";
    const at_page = window.location.href.match(/(operator-digitalfest|localhost:[0-9]{4})(\/?.*)(\?.+=.+)?/)[2];
    const is_en = lang==="en";
    if (at_page.match("timetable")) {
	    change_language.href = "https://ciosai.github.io/operator-digitalfest/timetable" + (is_en?"":"/en");
    }
    else if (at_page.match("compo-rules")) {
	    change_language.href = "https://ciosai.github.io/operator-digitalfest/compo-rules" + (is_en?"":"/en");
    }
    else if (at_page.match("about")) {
	    change_language.href = "https://ciosai.github.io/operator-digitalfest/about" + (is_en?"":"/en");
    }
    else if (at_page.match("contact")) {
	    change_language.href = "https://ciosai.github.io/operator-digitalfest/contact" + (is_en?"":"/en");
    }
    else if (at_page.match("submit")) {
	    change_language.href = "https://ciosai.github.io/operator-digitalfest/submit" + (is_en?"":"/en");
    }
    else {
	    change_language.href = "https://ciosai.github.io/operator-digitalfest" + (is_en?"":"/en");
    }
    return change_language;
  }

  connectedCallback() {
    let lang = "en";
    let currentPage = "";
    let hrefBegin = "./";
    let hrefEnd = "";
    if (this.hasAttribute("lang") && this.getAttribute("lang")==="zh") {
      lang = "zh";
    }
    if (this.hasAttribute("current-page")) {
      currentPage = this.getAttribute("current-page");
    }
    if (this.hasAttribute("href-begin")) {
      hrefBegin = this.getAttribute("href-begin");
    }
    if (this.hasAttribute("href-end")) {
      hrefEnd = this.getAttribute("href-end");
    }

    const styleSheet = document.createElement("style");
    styleSheet.textContent = `.currentPage::before { content:">"; }`;

    this.id = "head";
    this.style.display = "flex";

    const nav = document.createElement("div");
    nav.id = "nav";
    nav.style.display = "flex";
    
    const logoImg = document.createElement("img");
    logoImg.src = `${hrefBegin}asset/icon/logo.svg`;
    const logo = document.createElement("a");
    logo.id = "logo";
    logoImg.style.height = "100%";
    logoImg.style.width = "min-content";
    logo.style.height = "100%";
    logo.style.width = "min-content";
    logo.appendChild(logoImg);
    nav.appendChild(logo);

    const gap = document.createElement("div");
    gap.style.width = "1em";
    nav.appendChild(gap);

    for (let i=0; i<Header.list.length; i++) {
      let a = document.createElement("a");
      if (currentPage===Header.list[i]) {
	a.classList.add("currentPage");
      }
      else {
	a.href = `${hrefBegin}${Header.list[i]}${hrefEnd}`;
      }
      a.innerText = (lang==="zh"?Header.listZH:Header.listEN)[i];
      nav.appendChild(a);
    }

    this.appendChild(nav);

    const expander = document.createElement("div");
    expander.style.width = "100%";
    this.appendChild(expander);

    const settings = document.createElement("div");
    settings.id = "settings";
    settings.style.display = "flex";

    settings.appendChild(this.createChangeTheme(lang));
    settings.appendChild(this.createChangeLanguage(lang));

    this.appendChild(settings);

    if (currentPage!=="") {
      logo.href = `${hrefBegin}${hrefEnd}`;
    }

    this.appendChild(styleSheet);
  }
}

export { Header }
