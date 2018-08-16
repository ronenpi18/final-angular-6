/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'final-demo-icons\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-warning': '&#xe904;',
		'icon-graph-area': '&#xe902;',
		'icon-home': '&#xe905;',
		'icon-location': '&#xe947;',
		'icon-map': '&#xe94c;',
		'icon-calendar': '&#xe953;',
		'icon-filter': '&#xe992;',
		'icon-settings': '&#xe994;',
		'icon-cogs': '&#xe995;',
		'icon-stats': '&#xe99c;',
		'icon-speedometer': '&#xe9a6;',
		'icon-bullet-list': '&#xe9ba;',
		'icon-close': '&#xea0f;',
		'icon-check': '&#xea10;',
		'icon-check-filled': '&#xea52;',
		'icon-puzzle': '&#xe906;',
		'icon-add': '&#xe903;',
		'icon-more': '&#xe907;',
		'icon-panels': '&#xe901;',
		'icon-line-graph': '&#xe908;',
		'icon-octologo': '&#xe900;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
