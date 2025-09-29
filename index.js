import { Header } from "./components/header.js";
import { EventCard } from "./components/eventCard.js";

const DISCORD_INVITE = "https://discord.gg/HSwYqDc8Na";
const EVENT_LIST_PRELOAD = 3;
const EVENT_LIST = "https://ciosai.github.io/operator-digitalfest/log/meta.json";
const EVENT_DATA_BASE_URL = "https://ciosai.github.io/operator-digitalfest/log/";

function initialize() {
customElements.define("custom-header", Header);
customElements.define("event-card", EventCard);

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
const at_page = window.location.href.match(/(operator-digitalfest|localhost:[0-9]{4})(\/?.*)(\?.+=.+)?/)[2];
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

const events_list = document.getElementById("events-list");
if (events_list) {
	function attemptCreateCard(id) {
		if (!/^[0-9]{8}$/.test(id)) { return; }
		fetch(`${EVENT_DATA_BASE_URL}${id}.json`)
			.then((response)=>{
				if (!response.ok) {
					throw new Error(`http fucky wucky ${response.status}`);
				}
				return response.json();
			})
			.then((data)=>{
				let card = document.createElement("event-card");
				card.setAttribute("href", is_en?`${EVENT_DATA_BASE_URL}/en?id=${id}`:`${EVENT_DATA_BASE_URL}?id=${id}`);
				card.setAttribute("caption", data[is_en?"caption_en":"caption"]);
				card.setAttribute("img", data["thumbnailSource"]);
				events_list.appendChild(card);
			})
			.catch((fail)=>{});
	}

	fetch(EVENT_LIST)
		.then((response)=>{
			if (!response.ok) {
				throw new Error(`http fucky wucky ${response.status}`);
			}
			return response.json();
		})
		.then((data)=>{
			let entries = data["entries"];
			if (!entries) {
				throw new Error(`possibly malformed metadata, 'entries' not found`);
			}
			for (let i=0; i<EVENT_LIST_PRELOAD; i++) {
				if (i>=entries.length) { break; }
				// it should be able to load more as the user swipes, but
				// there aren't even that many yet
				attemptCreateCard(entries[i]);
			}
		})
		.catch((fail)=>{
			let allEvents = document.getElementById("all-events");
			if (allEvents) {
				allEvents.style.display = "none";
			}
		});
}
}

initialize();
