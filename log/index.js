const loadingHint = document.getElementById("loading-hint");
const loadingFailed = document.getElementById("loading-failed");
const loadingSucceeded = document.getElementById("loading-succeeded");

const EVENT_DATA_BASE_URL = "https://ciosai.github.io/operator-digitalfest/log/";

function markAsFail() {
	loadingHint.style.display = "none";
	loadingFailed.style.display = "";
}

function initialize() {
	const at_page = window.location.href.match(/(operator-digitalfest|localhost:[0-9]{4})(\/?.*)(\?.+=.+)?/)[2];
	const is_en = /\/en/g.test(at_page);
	const urlParams = new URLSearchParams(window.location.search);
	const logId = urlParams.get("id");

	if (!logId) { markAsFail(); return; }
	if (!/^[0-9]{8}$/.test(logId)) { markAsFail(); return; }

	fetch(`${EVENT_DATA_BASE_URL}${logId}.json`)
		.then((response)=>{
			if (!response.ok) {
				throw new Error(`http fucky wucky ${response.status}`);
			}
			return response.json();
		})
		.then((data)=>{
			let title = data[is_en?"title_en":"title"];
			let content = data[is_en?"content_en":"content"];
			if (!title || !content) {
				throw new Error(`no content in ${logId}.json?`);
			}
			let titleElement = document.createElement("h1");
			titleElement.innerText = title;
			loadingSucceeded.appendChild(titleElement);
			let contentFragment = document.createDocumentFragment();
			contentFragment.innerHTML = content;
			loadingSucceeded.appendChild(contentFragment);
		})
		.catch((fail)=>{});
}
initialize();
