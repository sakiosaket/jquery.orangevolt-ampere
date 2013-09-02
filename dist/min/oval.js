/*!
 * jQuery Orangevolt Ampere
 *
 * version : 0.2.0
 * created : 2013-09-02
 * source  : https://github.com/lgersman/jquery.orangevolt-ampere
 *
 * author  : Lars Gersmann (lars.gersmann@gmail.com)
 * homepage: http://www.orangevolt.com
 *
 * Copyright (c) 2013 Lars Gersmann; Licensed MIT, GPL
 */

/**
 * Oval is the OrangeVolt Ampere Loader
 * 
 * embed this script in the head of your html page
 * to load all Orangevolt Ampere dependencies automatically 
 */

(function() {
	var scripts = document.getElementsByTagName( 'script');
	for( var i=0; i<scripts.length; i++) {
		var url = scripts[i].src;
		if( scripts[i].type=="text/javascript" && /oval.js/.test( url)) {
			var matches = url.match( /(.+)oval\.js(\?(.+))?/);
			if( !matches) {
				throw new Error( "failed to eval ampere base url");
			}
			var baseUrl = matches[ 1];
			
			var CSS = ["libs/jquery-ui-1.10.3.custom/jquery-ui-1.10.3.custom.min.css","libs/bootstrap-2.3.2/css/bootstrap.min.css","libs/bootstrap-2.3.2/css/bootstrap-responsive.min.css","libs/font-awesome-3.1.1/css/font-awesome.css","libs/datepicker/css/datepicker.css","jquery.orangevolt-ampere.min.css"];
			for( var i in CSS) {
				document.writeln( '<link rel="stylesheet" type="text/css" href="' + baseUrl + CSS[i] + '">');
			}
			
			var LESS = [];
			for( var i in LESS) {
				document.writeln( '<link rel="stylesheet/less" href="' + baseUrl + LESS[i] + '">');
			}
			
			var JS = ["libs/coffeescript-1.3.3.js","libs/lesscss-1.3.3.js","libs/jquery-2.0.2.js","libs/lodash-1.3.1/lodash.min.js","libs/jquery-ui-1.10.3.custom/jquery-ui-1.10.3.custom.min.js","libs/bootstrap-2.3.2/js/bootstrap.min.js","libs/datepicker/js/bootstrap-datepicker.js","libs/cache.js","libs/angular-1.1.5/angular.min.js","libs/angular-1.1.5/angular-cookies.min.js","libs/angular-1.1.5/angular-loader.min.js","libs/angular-1.1.5/angular-mobile.min.js","libs/angular-1.1.5/angular-resource.min.js","jquery.orangevolt-ampere.min.js"];
			for( var i in JS) {
				var defer = (/coffeescript/.test( JS[i]) && 'defer') || '';
				document.writeln( '<script type="text/javascript" ' + defer + ' src="' + baseUrl + JS[i] + '"></script>');
			}
			
			break;
		}
	}
	
	
	document.writeln( 
		'<script type="text/template" id="ampere-crud-list.default.tmpl"><![CDATA[\n' + 
		"<table class=\"crud table\">\n\t<thead ng-show=\"list.headers().length\">\n\t\t<th\n\t\t\tng-repeat=\"header in list.headers()\"\n\t\t\tng-dblclick=\"list.getEditingContext() || header.orderBy && list.sortable( false, list.sortable().reverse)\"\n\t\t\tng-click=\"list.getEditingContext() || header.orderBy && list.sortable( header.orderBy, !list.sortable().reverse) || list.sortable( false, !list.sortable().reverse)\"\n\t\t\tng-ampere-template=\"header.template\"\n\t\t\tng-class=\"header.orderBy && 'sortable'\">\n\t\t\t<i\n\t\t\t\tclass=\"orderby\"\n\t\t\t\tng-class=\"{\n\t\t\t\t'icon-empty' \t\t: header.orderBy!=list.sortable().orderBy,\n\t\t\t\t'icon-caret-up' \t: header.orderBy==list.sortable().orderBy && list.sortable().reverse,\n\t\t\t\t'icon-caret-down'\t: header.orderBy==list.sortable().orderBy && !list.sortable().reverse\n\t\t\t\t}\">\n\t\t\t</i>\n\t\t</th>\n\t</thead>\n\t<tbody>\n\t\t<tr\n\t\t\tng-ampere-template=\"list.addable() && list.addable().item!=undefined && !list.addable().index && { replace : list.addable().template}\"\n\t\t>\n\t\t</tr>\n\t\t<tr\n\t\t\tng-init=\"$.inArray( list.selection(), list.get())!=-1 || list.selection( $window.ov.entity.first( list.get()))\"\n\t\t\tng-repeat=\"item in (list.rows = (list.get() | filter:list.filter() | orderBy:(!list.sortable().delegated) && list.sortable().orderBy:list.sortable().reverse))\"\n\t\t\tnng-mousedown=\"(!list.addable() || list.addable().item==undefined) && (!list.editable() || list.editable().item==undefined) && list.selection( item)\"\n\t\t\tng-ampere-mousedown=\"list.transitions.select\"\n\t\t\tng-class=\"{\n\t\t\t\titem\t\t\t\t\t\t\t: (!list.editable() || list.editable().item!=item) && (!list.addable() || list.addable().item!=item),\n\t\t\t\tactive\t\t\t\t\t\t\t: list.selection()==item,\n\t\t\t\t'ng-ampere-sortable-nohandle'\t: list.editable() && list.editable().item==item\n\t\t\t}\"\n\t\t\tdata-position=\"{{list.get() | indexof:item}}\"\n\t\t\tng-ampere-dblclick=\"list.options('list-item-dblclick').apply( list)\"\n\t\t\tng-ampere-template=\"list.editable() && list.editable().item!=undefined && item==list.selection() && { replace : list.editable().template}\"\n\t\t>\n\t\t\t<td ng-repeat=\"column in list.columns()\" ng-ampere-template=\"column.template\">\n\t\t\t\t<span class=\"pull-right\">\t\n\t\t\t\t\t<span ng-hide=\"list.getEditingContext()\" ng-switch on=\"$last && (list.editable() | type)\">\n\t\t\t\t\t\t<a ng-switch-when=\"object\" class=\"hover\" ng-ampere-transition=\"list.editable().transition\"></a>\n\t\t\t\t\t</span>\n\t\t\t\t\t<span ng-hide=\"list.getEditingContext()\" ng-switch on=\"$last && (list.removable() | type)\">\n\t\t\t\t\t\t<a ng-switch-when=\"object\" class=\"hover\" ng-ampere-transition=\"list.removable().transition\"></a>\n\t\t\t\t\t</span>\n\t\t\t\t</span>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr\n\t\t\tng-ampere-template=\"list.addable() && list.addable().item!=undefined && list.addable().index && { replace : list.addable().template}\"\n\t\t>\n\t\t</tr>\n\t\t<tr class=\"no-items\" ng-hide=\"list.get().length\">\n\t\t\t<td class=\"ng-ampere-sortable-nohandle\" colspan=\"{{list.columns().length}}\">\n\t\t\t\t{{list.options( 'list-empty.message') && ($.isFunction( list.options( 'list-empty.message')) && list.options( 'list-empty.message').call( list)) || list.options( 'list-empty.message')}}\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr class=\"no-matches\" ng-show=\"list.get().length && !list.rows.length\">\n\t\t\t<td class=\"ng-ampere-sortable-nohandle\" colspan=\"{{list.columns().length}}\">\n\t\t\t\t{{list.options( 'list-nomatches.message') && ($.isFunction( list.options( 'list-nomatches.message')) && list.options( 'list-nomatches.message').call( list)) || list.options( 'list-nomatches.message')}}\n\t\t\t</td>\n\t\t</tr>\n\t</tbody>\n</table>" + 
		'\n]]></script>'
	);
	
	document.writeln( 
		'<script type="text/template" id="ampere-crud-paginator.default.tmpl"><![CDATA[\n' + 
		"<div class=\"crud paginator pagination pagination-centered\">\n\t<ul>\n\t\t<li ng-class=\"{disabled : !paginator.gotoFirstPage().enabled()}\">\n\t\t\t<a ng-ampere-transition=\"paginator.gotoFirstPage()\"></a>\n\t\t</li>\n\t\t<li ng-class=\"{disabled : !paginator.gotoPrevPageRange().enabled()}\">\n\t\t\t<a ng-ampere-transition=\"paginator.gotoPrevPageRange()\"></a>\n\t\t</li>\n\t\t<li ng-class=\"{disabled : !paginator.gotoPrevPage().enabled()}\">\n\t\t\t<a ng-ampere-transition=\"paginator.gotoPrevPage()\"></a>\n\t\t</li>\n\t\t<li ng-repeat=\"page in paginator.getPageRange()\" ng-class=\"{active : paginator.currentPageNumber()==page, disabled : !paginator.gotoPage().enabled() && paginator.currentPageNumber()!=page}\">\n\t\t\t<a data-page=\"{{page}}\" ng-ampere-transition=\"paginator.gotoPage()\">{{page}}</a>\n\t\t</li>\n\t\t<li ng-class=\"{disabled : !paginator.gotoNextPage().enabled()}\">\n\t\t\t<a ng-ampere-transition=\"paginator.gotoNextPage()\"></a>\n\t\t</li>\n\t\t<li ng-class=\"{disabled : !paginator.gotoNextPageRange().enabled()}\">\n\t\t\t<a ng-ampere-transition=\"paginator.gotoNextPageRange()\"></a>\n\t\t</li>\n\t\t<li ng-class=\"{disabled : !paginator.gotoLastPage().enabled()}\">\n\t\t\t<a ng-ampere-transition=\"paginator.gotoLastPage()\"></a>\n\t\t</li>\n\t</ul>\n</div>" + 
		'\n]]></script>'
	);
	
	document.writeln( 
		'<script type="text/template" id="ampere-ui-twitterbootstrap.layout.default.tmpl"><![CDATA[\n' + 
		"<div class=\"ng-cloak ampere-module\" nng-app=\"window.ov.ampere.ui.twitterbootstrap\" ng-controller=\"amperetwitterbootstrap\">\n\t<div\n\t\tclass=\"navbar navbar-inverse navbar-fixed-top\"\n\t\tng-show=\"$ampere.ui.getCaption( $ampere.module) || $ampere.module.options( 'ampere.ui.about.caption') || $ampere.ui.getTransitions({ 'ampere.ui.type':'global'}).length\"\n\t>\n\n    \t<div class=\"navbar-inner\">\n       \t\t<div class=\"container\">\n         \t\t<a\n         \t\t\tclass=\"btn btn-navbar\"\n         \t\t\tdata-toggle=\"collapse\"\n         \t\t\tdata-target=\".nav-collapse\"\n         \t\t\tng-show=\"$ampere.ui.getTransitions({ 'ampere.ui.type':'global'}).length\"\n         \t\t>\n           \t\t\t<span class=\"icon-bar\"></span>\n           \t\t\t<span class=\"icon-bar\"></span>\n           \t\t\t<span class=\"icon-bar\"></span>\n         \t\t</a>\n\n         \t\t<div class=\"brand-append\" ng-ampere-template=\"$ampere.view.state().options( 'ampere.ui.brand.append') || $ampere.module.options( 'ampere.ui.brand.append')\"></div>\n\t         \t<span ng-switch on=\"$ampere.module.options( 'ampere.ui.about.url') | type\">\n         \t\t\t<a ng-switch-when=\"transition\" class=\"brand\" ng-ampere-transition=\"$ampere.module.options( 'ampere.ui.about.url')\"></a>\n\n\t\t\t        <a ng-switch-default class=\"brand\" href=\"{{$ampere.module.options( 'ampere.ui.about.url')}}\" target=\"_blank\">\n\t\t\t        \t{{$ampere.ui.getCaption( $ampere.module) || $window.ov.ampere.util.ucwords( $ampere.module.options( 'ampere.ui.about.caption'))}}\n\t\t\t        </a>\n\t\t\t\t</span>\n\t\t\t\t<div class=\"brand-prepend\" ng-ampere-template=\"$ampere.view.state().options( 'ampere.ui.brand.prepend') || $ampere.module.options( 'ampere.ui.brand.prepend')\"></div>\n\t\t\t\t\t\n\n       \t\t \t<div class=\"nav-collapse\">\n       \t\t \t\t<div ng-ampere-template=\"$ampere.view.state().options( 'ampere.ui.global.prepend') || $ampere.module.options( 'ampere.ui.global.prepend')\"></div>\n\t           \t\t<ul class=\"nav\">\n\t           \t\t\t<li ng-class=\"{disabled : !transition.enabled(), active : transition.active()}\"\n\t           \t\t\t\tng-repeat=\"transition in $ampere.ui.getTransitions({ 'ampere.ui.type':'global'})\">\n\t           \t\t\t\t<a ng-ampere-transition=\"transition\"></a>\n\t           \t\t\t</li>\n\t           \t\t</ul>\n\t           \t\t<div ng-ampere-template=\"$ampere.view.state().options( 'ampere.ui.global.append') || $ampere.module.options( 'ampere.ui.global.append')\"></div>\n\t         \t</div>\n    \t   </div>\n\t\t</div>\n\t</div>\n\t<div class=\"container\">\n\t\t<header nng-show=\"$ampere.ui.getDescription( $ampere.module) || $ampere.ui.getCaption( $ampere.module) || $ampere.ui.getTransitions({ 'ampere.ui.type':'primary'}).length || $ampere.ui.getTransitions({ 'ampere.ui.type':'secondary'}).length\">\n\t\t\t<h1 ng-class=\"{ yes : $ampere.ui.getIcon( $ampere.module) || $ampere.ui.getCaption( $ampere.module)}\">\n\t\t\t\t<i ng-show=\"$ampere.ui.getIcon( $ampere.module)\" ng-class=\"$ampere.ui.getIcon( $ampere.module)\"></i>\n\t\t\t\t{{$ampere.ui.getCaption( $ampere.module)}}\n\t\t\t</h1>\n\t\t\t<div class=\"lead\" ng-bind-html-unsafe=\"$ampere.ui.getDescription( $ampere.module)\"></div>\n\n\t\t\t\t<!-- ul/li must be written together to match css3 :empty selector-->\n\t\t\t<ul \n\t\t\t\tclass=\"breadcrumb\"\n\t\t\t><li \n\t\t\t\t\tng-repeat=\"transition in $ampere.ui.getTransitions({ 'ampere.ui.type':'breadcrumb'})\" \n\t\t\t\t\tng-class=\"{disabled : !transition.enabled(), active : transition.active()}\"\n\t\t\t  \t>\n\t\t          \t<a ng-ampere-transition=\"transition\"></a>\n\t\t          \t<span ng-show=\"!$last\" class=\"divider\">/</span>\n\t\t    </li></ul>\n\n\t\t\t<div \n\t\t\t\tclass=\"navbar subnav\" \n\t\t\t\tddata-top=\"40\" \n\t\t\t\tng-show=\"$ampere.ui.getTransitions({ 'ampere.ui.type':'primary'}).length \n\t\t\t\t\t|| $ampere.ui.getTransitions({ 'ampere.ui.type':'secondary'}).length\"\n\t\t\t>\n\t\t\t\t<div class=\"navbar-inner\">\n\t\t\t\t\t<div ng-ampere-template=\"$ampere.view.state().options( 'ampere.ui.primary.prepend') || $ampere.module.options( 'ampere.ui.primary.prepend')\"></div>\n\t\t\t\t\t<ul class=\"nav\">\n\t\t\t\t\t\t<li ng-repeat=\"transition in $ampere.ui.getTransitions({ 'ampere.ui.type':'primary'})\" ng-class=\"{disabled : !transition.enabled(), active : transition.active()}\">\n\t\t\t\t\t\t\t<a ng-ampere-transition=\"transition\"></a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li class=\"dropdown\" ng-show=\"$ampere.ui.getTransitions({ 'ampere.ui.type':'secondary'}).length\">\n\t\t\t\t\t\t\t<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n\t\t\t\t\t\t\t  {{$ampere.ui.getCaption( $ampere.view.state())}}\n\t\t\t\t\t\t\t  <b class=\"caret\"></b>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<ul class=\"dropdown-menu\">\n\t\t\t\t\t\t\t\t<li ng-repeat=\"transition in $ampere.ui.getTransitions({ 'ampere.ui.type':'secondary'})\" ng-class=\"{disabled : !transition.enabled(), active : transition.active()}\">\n\t\t\t\t\t\t\t  \t\t<a ng-ampere-transition=\"transition\"></a>\n\t\t\t\t\t\t\t  \t</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t </ul>\n\t\t\t\t\t <div ng-ampere-template=\"$ampere.view.state().options( 'ampere.ui.primary.append') || $ampere.module.options( 'ampere.ui.primary.append')\"></div>\n\t\t\t    </div>\n\t        </div>\n\t\t</header>\n\t\t<section class=\"ampere-state name-{{$ampere.view.state().name()}}\">\n\t\t\t<div ng-class=\"{ 'view-empty' : $ampere.template==''}\" class=\"page-header\" ng-show=\"$ampere.ui.getDescription( $ampere.view) || $ampere.ui.getCaption( ($ampere.view.name()!='main' && $ampere.view) || $ampere.view.state())\">\n\t\t    \t<h2 ng-show=\"$ampere.ui.getCaption( ($ampere.view.name()!='main' && $ampere.view) || $ampere.view.state()) || $ampere.ui.getIcon( $ampere.view)\">\n\t\t    \t\t<i ng-show=\"$ampere.ui.getIcon( $ampere.view)\" ng-class=\"$ampere.ui.getIcon( $ampere.view)\"></i>\n\t\t    \t\t{{$ampere.ui.getCaption( ($ampere.view.name()!='main' && $ampere.view) || $ampere.view.state())}}\n\t\t    \t\t<a ng-show=\"$ampere.ui.getTransitions( {'ampere.ui.hotkey' : $ampere.ui.regexp( '.+')}).length\" ng-click=\"$ampere.ui.toggleHelp()\" title=\"Toggle keyboard hotkey map\" class=\"icon-keyboard\"></a>\n\t\t    \t</h2>\n\t\t    \t<div class=\"ampere-help\">\n\t\t    \t\t<ul class=\"hotkeys\">\n\t\t    \t\t\t<li ng-class=\"{disabled : !transition.enabled()}\" ng-repeat=\"transition in $ampere.ui.getTransitions( {'ampere.ui.hotkey':$ampere.ui.regexp( '.+')})\">\n\t\t\t\t\t    \t<kbd>{{$ampere.ui.getHotkey( transition)}}</kbd>\n\t\t\t\t\t    \t<i class=\" icon-arrow-right\"></i>\n\t\t\t\t\t    \t<a ng-ampere-transition=\"transition\"></a>\n\t\t\t\t\t    \t<div class=\"description\" ng-bind-html-unsafe=\"$ampere.ui.getDescription( transition)\"></div>\n\t\t\t\t\t    </li>\n\t\t    \t\t</ul>\n\t\t    \t</div>\n\t\t    \t<div class=\"description\" ng-bind-html-unsafe=\"$ampere.ui.getDescription( $ampere.view)\"></div>\n\t\t  \t</div>\n\t\t  \t<div ng-ampere-state class=\"ampere-view name-{{$ampere.view.name()}}\"></div>\n\t\t</section>\n\t\t<footer ng-show=\"$ampere.ui.getAbout( $ampere.module)\">\n\t\t\t<hr>\n\t\t\t<div class=\"description\" ng-bind-html-unsafe=\"$ampere.ui.getAbout( $ampere.module)\"></div>\n\t\t</footer>\n\t</div>\n\t<div class=\"overlay\"></div>\n\t<div class=\"container flash\">\n\t\t<div class=\"alert alert-info alert-block fade in\">\n\t\t\t<button type=\"button\" class=\"close\">×</button>\n\t\t\t<div class=\"message\"></div>\n\t\t\t<div class=\"progress progress-striped active\">\n\t\t\t\t<div class=\"bar\" style=\"width: 100%;\"></div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>" + 
		'\n]]></script>'
	);
	
	document.writeln( 
		'<script type="text/template" id="ampere-ui-twitterbootstrap.layout.nolayout.tmpl"><![CDATA[\n' + 
		"<div class=\"ng-cloak ampere-module\" nng-app=\"window.ov.ampere.ui.twitterbootstrap\" ng-controller=\"amperetwitterbootstrap\">\n\t<div class=\"container\">\n\t\t<div class=\"ampere-state name-{{$ampere.view.state().name()}}\">\n\t\t  \t<div ng-ampere-state=\"\" class=\"ampere-view name-{{$ampere.view.name()}}\"></div>\n\t\t</div>\n\t</div>\n\t<div class=\"overlay\"></div>\n\t<div class=\"container flash\">\n\t\t<div class=\"alert alert-info alert-block fade in\">\n\t\t\t<button type=\"button\" class=\"close\">×</button>\n\t\t\t<div class=\"message\"></div>\n\t\t\t<div class=\"progress progress-striped active\">\n\t\t\t\t<div class=\"bar\" style=\"width: 100%;\"></div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>" + 
		'\n]]></script>'
	);
	
	document.writeln( 
		'<script type="text/template" id="ampere-ui-twitterbootstrap.layout.wizard.tmpl"><![CDATA[\n' + 
		"<div class=\"ng-cloak ampere-module\" nng-app=\"window.ov.ampere.ui.twitterbootstrap\" ng-controller=\"amperetwitterbootstrap\">\n\t<div\n\t\tclass=\"navbar navbar-inverse navbar-fixed-top\"\n\t\tng-show=\"$ampere.ui.getCaption( $ampere.module) || $ampere.module.options( 'ampere.ui.about.caption') || $ampere.ui.getTransitions({ 'ampere.ui.type':'global'}).length\"\n\t>\n    \t<div class=\"navbar-inner\">\n       \t\t<div class=\"container\">\n         \t\t<a\n         \t\t\tclass=\"btn btn-navbar\"\n         \t\t\tdata-toggle=\"collapse\"\n         \t\t\tdata-target=\".nav-collapse\"\n         \t\t\tng-show=\"$ampere.ui.getTransitions({ 'ampere.ui.type':'global'}).length\"\n         \t\t>\n           \t\t\t<span class=\"icon-bar\"></span>\n           \t\t\t<span class=\"icon-bar\"></span>\n           \t\t\t<span class=\"icon-bar\"></span>\n         \t\t</a>\n\n\t\t\t\t<div class=\"brand-append\" ng-ampere-template=\"$ampere.view.state().options( 'ampere.ui.brand.append') || $ampere.module.options( 'ampere.ui.brand.append')\"></div>\n\t         \t<span ng-switch on=\"$ampere.module.options( 'ampere.ui.about.url') | type\">\n         \t\t\t<a ng-switch-when=\"transition\" class=\"brand\" ng-ampere-transition=\"$ampere.module.options( 'ampere.ui.about.url')\"></a>\n\n\t\t\t        <a ng-switch-default class=\"brand\" href=\"{{$ampere.module.options( 'ampere.ui.about.url')}}\" target=\"_blank\">\n\t\t\t        \t{{$ampere.ui.getCaption( $ampere.module) || $window.ov.ampere.util.ucwords( $ampere.module.options( 'ampere.ui.about.caption'))}}\n\t\t\t        </a>\n\t\t\t\t</span>\n\t\t\t\t<div class=\"brand-prepend\" ng-ampere-template=\"$ampere.view.state().options( 'ampere.ui.brand.prepend') || $ampere.module.options( 'ampere.ui.brand.prepend')\"></div>\n\t\t\t\t\t\n\n       \t\t \t<div class=\"nav-collapse\">\n       \t\t \t\t<div ng-ampere-template=\"$ampere.view.state().options( 'ampere.ui.global.prepend') || $ampere.module.options( 'ampere.ui.global.prepend')\"></div>\n\t           \t\t<ul class=\"nav\">\n\t           \t\t\t<li ng-class=\"{disabled : !transition.enabled(), active : transition.active()}\"\n\t           \t\t\t\tng-repeat=\"transition in $ampere.ui.getTransitions({ 'ampere.ui.type':'global'})\">\n\t           \t\t\t\t<a ng-ampere-transition=\"transition\"></a>\n\t           \t\t\t</li>\n\t           \t\t</ul>\n\t           \t\t<div ng-ampere-template=\"$ampere.view.state().options( 'ampere.ui.global.append') || $ampere.module.options( 'ampere.ui.global.append')\"></div>\n\t         \t</div>\n    \t   </div>\n\t\t</div>\n\t</div>\n\t<div class=\"container\">\n\t\t<header ng-show=\"$ampere.ui.getDescription( $ampere.module) || $ampere.ui.getCaption( $ampere.module) || $ampere.ui.getTransitions({ 'ampere.ui.type':'primary'}).length || $ampere.ui.getTransitions({ 'ampere.ui.type':'secondary'}).length\">\n\t\t\t<h1 ng-class=\"{ yes : $ampere.ui.getIcon( $ampere.module) || $ampere.ui.getCaption( $ampere.module)}\">\n\t\t\t\t<i ng-show=\"$ampere.ui.getIcon( $ampere.module)\" ng-class=\"$ampere.ui.getIcon( $ampere.module)\"></i>\n\t\t\t\t{{$ampere.ui.getCaption( $ampere.module)}}\n\t\t\t</h1>\n\t\t\t<div class=\"lead\" ng-bind-html-unsafe=\"$ampere.ui.getDescription( $ampere.module)\"></div>\n\n\t\t\t\t<!-- ul/li must be written together to match css3 :empty selector-->\n\t\t\t<ul \n\t\t\t\tclass=\"breadcrumb\"\n\t\t\t><li \n\t\t\t\t\tng-repeat=\"transition in $ampere.ui.getTransitions({ 'ampere.ui.type':'breadcrumb'})\" \n\t\t\t\t\tng-class=\"{disabled : !transition.enabled(), active : transition.active()}\"\n\t\t\t  \t>\n\t\t          \t<a ng-ampere-transition=\"transition\"></a>\n\t\t          \t<span ng-show=\"!$last\" class=\"divider\">/</span>\n\t\t    </li></ul>\n\n\t\t\t<div \n\t\t\t\tclass=\"navbar subnav\" \n\t\t\t\tddata-top=\"40\" \n\t\t\t\tng-show=\"$ampere.ui.getTransitions({ 'ampere.ui.type':'primary'}).length \n\t\t\t\t\t|| $ampere.ui.getTransitions({ 'ampere.ui.type':'secondary'}).length\"\n\t\t\t>\n\t\t\t\t<div class=\"navbar-inner\">\n\t\t\t          <ul class=\"nav nav-pills\">\n\t\t\t          \t<li ng-repeat=\"transition in $ampere.ui.getTransitions({ 'ampere.ui.type':'primary'})\" ng-class=\"{disabled : !transition.enabled(), active : transition.active()}\">\n\t\t\t          \t\t<a ng-ampere-transition=\"transition\"></a>\n\t\t\t          \t</li>\n\t\t\t          \t<li class=\"dropdown\" ng-show=\"$ampere.ui.getTransitions({ 'ampere.ui.type':'secondary'}).length\">\n\t\t\t\t\t\t    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n\t\t\t\t\t\t      {{$ampere.ui.getCaption( $ampere.view.state())}}\n\t\t\t\t\t\t      <b class=\"caret\"></b>\n\t\t\t\t\t\t    </a>\n\t\t\t\t\t\t    <ul class=\"dropdown-menu\">\n\t\t\t\t\t\t    \t<li ng-repeat=\"transition in $ampere.ui.getTransitions({ 'ampere.ui.type':'secondary'})\" ng-class=\"{disabled : !transition.enabled(), active : transition.active()}\">\n\t\t\t\t\t          \t\t<a ng-ampere-transition=\"transition\"></a>\n\t\t\t\t\t          \t</li>\n\t\t\t\t\t\t    </ul>\n\t\t\t\t\t\t  </li>\n\t\t\t          </ul>\n\t\t\t    </div>\n\t        </div>\n\t\t</header>\n\t\t<section class=\"ampere-state name-{{$ampere.view.state().name()}}\">\n\t\t\t<div class=\"page-header\" ng-show=\"$ampere.ui.getDescription( $ampere.view) || $ampere.ui.getCaption( ($ampere.view.name()!='main' && $ampere.view) || $ampere.view.state())\">\n\t\t    \t<h2 ng-show=\"$ampere.ui.getCaption( ($ampere.view.name()!='main' && $ampere.view) || $ampere.view.state()) || $ampere.ui.getIcon( $ampere.view)\">\n\t\t    \t\t<i ng-show=\"$ampere.ui.getIcon( $ampere.view)\" ng-class=\"$ampere.ui.getIcon( $ampere.view)\"></i>\n\t\t    \t\t{{$ampere.ui.getCaption( ($ampere.view.name()!='main' && $ampere.view) || $ampere.view.state())}}\n\t\t    \t\t<a ng-show=\"$ampere.ui.getTransitions( {'ampere.ui.hotkey' : $ampere.ui.regexp( '.+')}).length\" ng-click=\"$ampere.ui.toggleHelp()\" title=\"Toggle keyboard hotkey map\" class=\"icon-keyboard\"></a>\n\t\t    \t</h2>\n\t\t    \t<div class=\"ampere-help\">\n\t\t    \t\t<ul class=\"hotkeys\">\n\t\t    \t\t\t<li ng-class=\"{disabled : !transition.enabled()}\" ng-repeat=\"transition in $ampere.ui.getTransitions( {'ampere.ui.hotkey':$ampere.ui.regexp( '.+')})\">\n\t\t\t\t\t    \t<kbd>{{$ampere.ui.getHotkey( transition)}}</kbd>\n\t\t\t\t\t    \t<i class=\" icon-arrow-right\"></i>\n\t\t\t\t\t    \t<a ng-ampere-transition=\"transition\"></a>\n\t\t\t\t\t    \t<div class=\"description\" ng-bind-html-unsafe=\"$ampere.ui.getDescription( transition)\"></div>\n\t\t\t\t\t    </li>\n\t\t    \t\t</ul>\n\t\t    \t</div>\n\t\t    \t<div class=\"description\" ng-bind-html-unsafe=\"$ampere.ui.getDescription( $ampere.view)\"></div>\n\t\t  \t</div>\n\t\t  \t<div ng-ampere-state=\"\" class=\"ampere-view name-{{$ampere.view.name()}}\"></div>\n\t\t  \t<div class=\"navbar navbar-fixed-bottom\">\n\t\t\t  \t<div class=\"navbar-inner\">\n\t\t\t    \t<ul class=\"nav\">\n\t\t\t\t\t\t<li\n\t\t\t\t\t\t\tng-repeat=\"transition in $ampere.ui.getTransitions({ 'ampere.ui.type':'wizard-left'})\"\n\t\t\t    \t\t\tng-class=\"{disabled : !transition.enabled(), active : transition.active()}\"\n\t\t\t\t\t\t>\n\t\t\t\t\t\t\t<a ng-ampere-transition=\"transition\"></a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\t\t\t\t\t<ul class=\"nav pull-right\">\n\t\t\t    \t\t<li\n\t\t\t    \t\t\tng-repeat=\"transition in $ampere.ui.getTransitions({ 'ampere.ui.type':'wizard-right'})\"\n\t\t\t    \t\t\tng-class=\"{disabled : !transition.enabled(), active : transition.active()}\"\n\t\t\t    \t\t>\n\t\t\t\t\t\t\t<a class=\"{{$last && 'glow'}}\" ng-ampere-transition=\"transition\"></a>\n\t\t\t\t\t\t</li>\n\t\t\t    \t</ul>\n\t\t\t  \t</div>\n\t\t\t</div>\n\t\t</section>\n\t\t<footer ng-show=\"$ampere.ui.getAbout( $ampere.module)\">\n\t\t\t<hr>\n\t\t\t<div class=\"description\" ng-bind-html-unsafe=\"$ampere.ui.getAbout( $ampere.module)\"></div>\n\t\t</footer>\n\t</div>\n\t<div class=\"overlay\"></div>\n\t<div class=\"container flash\">\n\t\t<div class=\"alert alert-info alert-block fade in\">\n\t\t\t<button type=\"button\" class=\"close\">×</button>\n\t\t\t<div class=\"message\"></div>\n\t\t\t<div class=\"progress progress-striped active\">\n\t\t\t\t<div class=\"bar\" style=\"width: 100%;\"></div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>" + 
		'\n]]></script>'
	);
	
	document.writeln( 
		'<script type="text/template" id="ampere-ui-twitterbootstrap.view.default.tmpl"><![CDATA[\n' + 
		"<section>\n\t<h3>View {{$ampere.ui.getCaption( $ampere.view)}}</h3>\n\t<em>(This view/template was generated automatically : state \"{{$ampere.view.state().fullName()}}\" has no view applied.)</em>\n</section>\n<section>\n\t<h4>Transitions</h4>\n\t<div class=\"btn-group\">\n\t\t<button type=\"button\" ng-ampere-transition=\"transition\" ng-repeat=\"transition in $ampere.ui.getTransitions({ 'ampere.ui.type':undefined})\"></button>\n\t</div>\n</section>\n<hr/>\n<section>\n\t<h4>Data</h4>\n\t<pre>{{$ampere.view.state() | json}}</pre>\n</section>\n\n" + 
		'\n]]></script>'
	);
	 
	
	
	document.writeln( 
		'<script type="text/javascript">\n' + 
		"\t/* disable console debug output */\n$.ov.namespace.filter = function( severity, namespace) { return severity!='debug'; };" + 
		'</script>'
	);
	 
})();
