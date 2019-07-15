module.exports = function HideThralls(mod) {
    
	const ProtectionIDs = [
		10235016, //Protection
		10235017  //Protection 2
    ];
	const VengeanceIDs = [
		10237014, //Vengeance
		10237015 //Vengeance 2
	];
	const LifeIDs = [
		10236013, //Life
		10236014 //Life 2
	];
	const WrathIDs = [
		10238007, //Wrath
		10238008 //Wrath 2
	];
	const BlobIDs = [
		10239003  //Lord
	];
    
	mod.hook('S_SPAWN_NPC', 11, (event) => {
		if (!mod.settings.enabled) return true;

		if (mod.settings.hide_protection && ProtectionIDs.includes(event.templateId)) return false;
		if (mod.settings.hide_vengeance  && VengeanceIDs.includes(event.templateId))  return false;
		if (mod.settings.hide_life       && LifeIDs.includes(event.templateId))       return false;
		if (mod.settings.hide_wrath      && WrathIDs.includes(event.templateId))      return false;
		if (mod.settings.hide_lord       && BlobIDs.includes(event.templateId))       return false;
	})
    
	mod.command.add('ht', (cmd)=> {
		switch (cmd) {
			case undefined:
				mod.settings.enabled = !mod.settings.enabled;
				mod.command.message('Module ' + (mod.settings.enabled ? 'enabled' : 'disabled'));
			break;
			case "on" :
				mod.settings.enabled = true;
				mod.command.message("Module enabled");
				break;
			case "off":
				mod.settings.enabled = false;
				mod.command.message("Module disabled");
				break;
			case "top" :
			case "protection":
				mod.settings.hide_protection = !mod.settings.hide_protection;
				mod.command.message("<font color=\"#cccccc\">" + (mod.settings.hide_protection ? "Hiding" : "Showing") + "</font><font>" + " Thrall of Protection</font>");
			break;
			case "tol" :
			case "life":
				mod.settings.hide_life = !mod.settings.hide_life;
				mod.command.message("<font color=\"#cccccc\">" + (mod.settings.hide_life       ? "Hiding" : "Showing") + "</font><font>" + " Thrall of Life</font>");
			break;
			case "tov" :
			case "vengeance":
				mod.settings.hide_vengeance = !mod.settings.hide_vengeance;
				mod.command.message("<font color=\"#cccccc\">" + (mod.settings.hide_vengeance  ? "Hiding" : "Showing") + "</font><font>" + " Thrall of Vengeance</font>");
			break;
			case "tow" :
			case "wrath":
				mod.settings.hide_wrath = !mod.settings.hide_wrath;
				mod.command.message("<font color=\"#cccccc\">" + (mod.settings.hide_wrath      ? "Hiding" : "Showing") + "</font><font>" + " Thrall of Wrath</font>");
			break;
			case "tl":
			case "lord":
			case "blob":
				mod.settings.hide_lord = !mod.settings.hide_lord;
				mod.command.message("<font color=\"#cccccc\">" + (mod.settings.hide_lord       ? "Hiding" : "Showing") + "</font><font>" + " Thrall Lord</font>");
			break;
			case "status":
				mod.command.message(
					"<font color=\"#cccccc\">Module</font> <font>"+ (mod.settings.enabled ? " enabled." : " disabled.") +"</font>" +
					"<font color=\"#cccccc\"> Hidden summons: </font>" + 
					(mod.settings.hide_protection ? "<font>Thrall of Protection,</font>" : "") + 
					(mod.settings.hide_vengeance ? "<font>Thrall of Vengeance,</font>" : "") + 
					(mod.settings.hide_life ? "<font>Thrall of Life,</font>" : "") + 
					(mod.settings.hide_wrath? "<font>Thrall of Wrath,</font>" : "") + 
					(mod.settings.hide_lord? "<font>Thrall Lord,</font>" : "") + "."
					);
			break;
			default:
				mod.command.message("Wrong command specified:" + cmd +" .")
			break;
		}
	});

	this.destructor = function() {
		mod.command.remove('ht');
	};
}
