class Header extends HTMLElement {
  static list = ["", "timetable", "compo-rules", "about", "contact"];
  static listEN = ["Home", "Timetable", "Categories & Rules", "About", "Contact us"];
  static listZH = ["主畫面", "活動流程", "徵稿類別及規範", "關於", "聯絡我們"];

  constructor() {
    super();
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
    
    const logoImg = document.createElement("img");
    logoImg.src = `${hrefBegin}asset/icon/logo.svg`;
    const logo = document.createElement("a");
    logo.id = "logo";
    logoImg.style.height = "100%";
    logoImg.style.width = "min-content";
    logo.style.height = "100%";
    logo.style.width = "min-content";
    logo.appendChild(logoImg);
    this.appendChild(logo);

    const gap = document.createElement("div");
    gap.style.width = "1em";
    this.appendChild(gap);

    for (let i=0; i<Header.list.length; i++) {
      let a = document.createElement("a");
      if (currentPage===Header.list[i]) {
	a.classList.add("currentPage");
      }
      else {
	a.href = `${hrefBegin}${Header.list[i]}${hrefEnd}`;
      }
      a.innerText = (lang==="zh"?Header.listZH:Header.listEN)[i];
      this.appendChild(a);
    }

    const expander = document.createElement("div");
    expander.style.width = "100%";
    this.appendChild(expander);

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
    this.appendChild(change_language);

    if (currentPage!=="") {
      logo.href = `${hrefBegin}${hrefEnd}`;
    }

    this.appendChild(styleSheet);
  }
}

export { Header }
