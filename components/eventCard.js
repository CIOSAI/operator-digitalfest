class EventCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let href = "";
    let caption = "";
    let img = "";
    if (this.hasAttribute("href")) {
      href = this.getAttribute("href");
    }
    if (this.hasAttribute("caption")) {
      caption = this.getAttribute("caption");
    }
    if (this.hasAttribute("img")) {
      img = this.getAttribute("img");
    }

    const styleSheet = document.createElement("style");
    styleSheet.textContent = ``;

    this.classList.add("event-card");
    this.style.display = "block";
    this.style.position = "relative"

    const main = document.createElement("a");
    main.href = href;
    main.height = "100%";

    const bgImg = document.createElement("img");
    bgImg.src = img;
    bgImg.style.position = "absolute";
    bgImg.style.zIndex = "-1";
    bgImg.style.width = "100%";
    bgImg.style.height = "100%";
    bgImg.style.objectFit = "cover";
    main.appendChild(bgImg);

    const textBox = document.createElement("div");
    textBox.style.height = "calc(100% - 2*var(--size-smol))";
    textBox.style.padding = "var(--size-smol)";
    textBox.style.margin = "0";
    textBox.style.backgroundImage = "linear-gradient(to bottom, var(--col-bg), transparent)";
    const captionText = document.createElement("p");
    captionText.innerText = caption;
    captionText.style.padding = "0";
    captionText.style.margin = "0";
    textBox.appendChild(captionText);
    main.appendChild(textBox);

    this.appendChild(main);

    this.appendChild(styleSheet);
  }
}

export { EventCard }
