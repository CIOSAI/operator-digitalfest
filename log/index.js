const loadingHint = document.getElementById("loading-hint");
const loadingFailed = document.getElementById("loading-failed");
const loadingSucceeded = document.getElementById("loading-succeeded");

const href_matcher = window.location.href.match(/(ciosai\.github\.io\/operator-digitalfest|localhost:[0-9]{4}|operatorparty\.cc)(\/?[a-z-]*)(\?.+=.+)?/);
const domain = href_matcher[1];
const protocol = domain.match("localhost")?"http://":"https://";
const EVENT_DATA_BASE_URL = protocol + domain + "/log/";

function markAsFail() {
	loadingHint.style.display = "none";
	loadingFailed.style.display = "";
}

function initialize() {
	const is_zh = document.documentElement.hasAttribute("lang") &&
	    document.documentElement.getAttribute("lang")==="zh_TW";
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
			let title = data[is_zh?"title":"title_en"];
			let content = data[is_zh?"content":"content_en"];
			if (!title || !content) {
				throw new Error(`no content in ${logId}.json?`);
			}
			loadingHint.style.display = "none";
			let titleElement = document.createElement("h1");
			titleElement.id = "log-title";
			titleElement.innerText = title;
			loadingSucceeded.appendChild(titleElement);
			let contentDiv = document.createElement("div");
			contentDiv.id = "log-content";
			contentDiv.innerHTML = content;
			loadingSucceeded.appendChild(contentDiv);
		})
		.catch((fail)=>{});
}
initialize();
