# OncheJS

Faîtes des bots pour onche.org (onche.party v3) !

# Documentation

## Exemple basique

```js
const {postMsg, getMsg} = require("onchejs");

const config = {
	"auth": "<auth_cookie>",
	"sess": "<sess_cookie>",
	"topic": "<topic_url>"
}; //Utilisez un fichier config.json, c'est mieux.

async function main()
{
	setInterval(async()=>{
		console.log("Check du dernier message...");

		var msg = await getMsg(config.topic);
		var args = msg.split(" ");
		var cmd = args.shift();

		switch(cmd)
		{
			case "!echo":
				console.log("[Echo]");
				await postMsg(args.join(" "));
				break;

			case "!date":
				console.log("[Date]");
				await postMsg(Date().toString());
				break;

			default:
				console.log("[PATH-ERROR]");
				if(cmd.startsWith("!"))
					await postMsg("Commande non reconnue :(");
		};

		console.log("Fin du check !");
	});
};

main();
```

Bonne chance :)
