const fetch = require("node-fetch");

async function postMsg(msg, topic, auth, sess)
{
	let f = await fetch(topic, {
		"credentials": "include",
		"headers": {
			"Cookie": "auth=".concat(auth).concat("; sess=").concat(sess),
			"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0 Waterfox/78.13.0",
			"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*\/*;q=0.8",
			"Accept-Language": "en-US,en;q=0.5",
			"Upgrade-Insecure-Requests": "1",
			"Cache-Control": "max-age=0"
		},
		"referrer": "https://onche.org/topic/10886/topic-test-posibot/1",
		"method": "GET",
		"mode": "cors"
	});
	let g = await f.text();
	let csrf = g.replace(/<\/textarea><input type=\"hidden\" name=\"token\" value=\"([a-z0-9-]*)\">/, "[CHUILA]$1[CHUILA]").match(/\[CHUILA\](.*?)\[CHUILA\]/)[0].replace("[CHUILA]", "").replace("[CHUILA]", "");
	await fetch(topic, {
		"credentials": "include",
		"headers": {
			"Cookie": "auth=".concat(auth).concat("; sess=").concat(sess),
			"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0 Waterfox/78.13.0",
			"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*\/*;q=0.8",
			"Accept-Language": "en-US,en;q=0.5",
			"Content-Type": "application/x-www-form-urlencoded",
			"Upgrade-Insecure-Requests": "1"
		},
		"referrer": topic,
		"body": "message=".concat(encodeURI(msg)).concat("&token=".concat(csrf)),
		"method": "POST",
		"mode": "cors"
	});
};

async function getMsg(topic)
{
	let f = await fetch(topic, {
		"credentials": "include",
		"headers": {
			"Cookie": "auth=".concat(params.auth).concat("; sess=").concat(params.sess),
			"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0 Waterfox/78.13.0",
			"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*\/*;q=0.8",
			"Accept-Language": "en-US,en;q=0.5",
			"Upgrade-Insecure-Requests": "1",
			"Cache-Control": "max-age=0"
		},
		"referrer": "https://onche.org/topic/10886/topic-test-posibot/1",
		"method": "GET",
		"mode": "cors"
	});
	let g = await f.text();
	let last = g.match(/<div class="message-content">(.*?)<\/div>/g);
	return last[last.length-1].replace(/<div class="message-content">(.*)<\/div>/, "$1");
};

exports.postMsg = postMsg;
exports.getMsg = getMsg;