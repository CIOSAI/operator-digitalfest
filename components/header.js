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
    if (currentPage!=="") {
      logo.href = `${hrefBegin}${hrefEnd}`;
    }

    this.appendChild(styleSheet);
  }
}

export { Header }
