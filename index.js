import { Header } from "components/header.js";

const DISCORD_INVITE = "https://discord.gg/HSwYqDc8Na"

function initialize() {
customElements.define("header", Header);

const wips = document.getElementsByClassName("WIP");
for (let wip of wips) {
	wip.title = "🙇 未完工/WIP 🙇";
}

const invite_anchor = document.getElementById("discord-invite");
if (invite_anchor) { 
	invite_anchor.href = DISCORD_INVITE;
	invite_anchor.innerText = DISCORD_INVITE;
}

const change_language = document.createElement("a");
change_language.appendChild(document.createTextNode("中/Eng"));
change_language.id = "change-language";
const at_page = window.location.href.match(/operator-digitalfest(\/?.*)/)[1];
const is_en = /\/en/g.test(at_page);
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
else {
	change_language.href = "https://ciosai.github.io/operator-digitalfest" + (is_en?"":"/en");
}
document.body.appendChild(change_language);
}

initialize();
