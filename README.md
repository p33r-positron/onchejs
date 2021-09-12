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

		var msg = await getMsg(config.topic, config.auth, config.sess);
		var args = msg.split(" ");
		var cmd = args.shift();

		switch(cmd)
		{
			case "!echo":
				console.log("[Echo]");
				await postMsg(args.join(" "), config.topic, config.auth, config.sess);
				break;

			case "!date":
				console.log("[Date]");
				await postMsg(Date().toString(), config.topic, config.auth, config.sess);
				break;

			default:
				if(cmd.startsWith("!"))
				{
					console.log("[PATH-ERROR]");
					await postMsg("Commande non reconnue :(", config.topic, config.auth, config.sess);
				};
		};

		console.log("Fin du check !");
	}, 10000);
};

main();
```

Bonne chance :)
