define(function (require) {
	function replacePlaceholders(str, map) {
		return str.replace(/%[^%]+?%/g, function (m) {
			if (map[m] === undefined) {
				return m;
			}
			return map[m];
		});
	}

	chrome.storage.sync.get('cfg', function (storage) {
		var Hyperiums7 = require('classes/Hyperiums7'),
			$ = require('extlibs/jquery/jquery'),
			cfg = storage.cfg;
		Hyperiums7.getSession().
			done(function (session) {
				var ul = $('<ul>').append($('<li>').append(
					$('<a target="_blank">Home</a>').
						attr('href', Hyperiums7.getServletUrl('Home'))
				));

				if (cfg.external.isEnabled) {
					ul.append($('<li>').append(
						$('<a target="_blank">Send session to external website</a>').
							attr('href', 
								replacePlaceholders(cfg.external.urlPattern, {
									'%PLAYER_ID%': session.playerId,
									'%AUTH_KEY%': session.authKey,
									'%GAME_ID%': session.gameId
								})
							)
					));
				}
				ul.append([
					$('<li><a href="/pages/options.html" target="_blank">Options</a></li>'),
					$('<li>').append(
						$('<a target="_blank">Logout</a>').
							attr('href', Hyperiums7.getLogoutUrl())
					)
				]);
				$('nav').append(ul);
			}).
			fail(function (error) {
				throw error;
			});
	});
});

