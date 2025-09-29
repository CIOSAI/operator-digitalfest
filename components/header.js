class Header extends HTMLElement {
  const list = ["", "timetable", "compo-rules", "about", "contact"];
  const listEN = ["Home", "Timetable", "Categories & Rules", "About", "Contact us"];
  const listZH = ["主畫面", "活動流程", "徵稿類別及規範", "關於", "聯絡我們"];

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

    const shadow = this.attachShadow({ mode: "open" });

    const styleSheet = document.createElement("style");
    styleSheet.textContent = `.currentPage::before { content:">"; }`;

    const main = document.createElement("div");
    main.id = "head";
    main.style.display = "flex";
    
    const logoImg = document.createElement("img");
    logoImg.src = `${hrefBegin}asset/icon/logo.svg`;
    const logo = document.createElement("a");
    logo.id = "logo";
    logoImg.style.height = "100%";
    logoImg.style.width = "min-content";
    logo.style.height = "100%";
    logo.style.width = "min-content";
    logo.appendChild(logoImg);
    main.appendChild(logo);

    const gap = document.createElement("div");
    gap.style.width = "1em";
    main.appendChild(gap);

    for (let i=0; i<list.length; i++) {
      let a = document.createElement("a");
      if (currentPage===list[i]) {
	a.classList.append("currentPage");
      }
      else {
	if (list[i]!=="") {
	  logo.href = `${hrefBegin}${list[i]}${hrefEnd}`;
	}
	a.href = `${hrefBegin}${list[i]}${hrefEnd}`;
      }
      a.innerText = (lang==="zh"?listZH:listEN)[i];
      main.appendChild(a);
    }

    /*
	<div id="head">
		<a id="logo"><img src="asset/icon/logo.svg"></a>
		<div style="width: 1em;"></div>
		<a class="currentPage">主畫面</a>
		<a href="./timetable">活動流程</a>
		<a href="./compo-rules">徵稿類別及規範</a>
		<a href="./about">關於</a>
		<a href="./contact">聯絡我們</a>
	</div>
		<a id="logo"><img src="../asset/icon/logo.svg"></a>
		<div style="width: 1em;"></div>
		<a class="currentPage">Home</a>
		<a href="../timetable/en">Timetable</a>
		<a href="../compo-rules/en">Categories & Rules</a>
		<a href="../about/en">About</a>
		<a href="../contact/en">Contact us</a>
#head {
	height: var(--size-big);
	padding: var(--size-mid);
	display: flex;
	column-gap: var(--size-mid);
	background: color-mix(in srgb, var(--col-bg) var(--opacity-lightmode-textbackground), transparent);
}

#logo, #logo svg, #logo img {
	height: 100%;
	width: min-content;
}

#head .currentPage::before {
	content: ">";
}
		*/
    shadow.appendChild(style);
    shadow.appendChild(main);
  }
}

export { Header }
