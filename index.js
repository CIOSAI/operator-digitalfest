const DISCORD_INVITE = "https://discord.gg/HSwYqDc8Na"

function initialize() {
const wips = document.getElementsByClassName("WIP");
for (let wip of wips) {
	wip.title = "🙇 未完工/WIP 🙇";
}

const invite_anchor = document.getElementById("discord-invite");
if (invite_anchor) { 
	invite_anchor.href = DISCORD_INVITE;
	invite_anchor.innerText = DISCORD_INVITE;
}
}

initialize();
