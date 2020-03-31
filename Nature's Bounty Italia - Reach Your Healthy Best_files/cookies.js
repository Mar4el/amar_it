//alert('external');

/***************************************************************** 
 * COOKIES MANAGEMENT
 * Code from: http://www.quirksmode.org/js/cookies.html#doccookie
 *****************************************************************/
/* COOKIES */

var Cookies = {
  init: function () {
    var allCookies = document.cookie.split('; ');
    for (var i=0;i<allCookies.length;i++) {
      var cookiePair = allCookies[i].split('=');
      this[cookiePair[0]] = cookiePair[1];
    }
  },
  create: function (name,value,days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
    this[name] = value;
  },
  erase: function (name) {
    this.create(name,'',-1);
    this[name] = undefined;
  },
  eraseAll: function() {
    var allCookies = document.cookie.split('; ');
    for (var i=0;i<allCookies.length;i++) {
      var cookiePair = allCookies[i].split('=');
      this.erase(cookiePair[0]);
    }
  }
};
Cookies.init();

var COOKIES_USE = 'cookiesuse';
var COOKIES_YES = 1;
var COOKIES_NO = 0;
var COOKIE_BUTTON_OK = 'Ho Capito';
var COOKIE_BUTTON_NO = 'Non accetto';
var COOKIE_MESSSAGE = '	In questo sito utilizziamo i cookies per rendere la navigazione più piacevole per i nostri clienti. Cliccando sul link sotto, puoi trovare le informazioni per cancellare e disattivare l’installazione dei cookies, ma in tal caso il sito potrebbe non funzionare correttamente. Continuando a navigare su questo sito acconsenti alla nostra Cookie Policy.';
var COOKIE_MESSAGE_NOTIFICATION = '';
var COOKIE_LINK_MESSAGE = '(informativa)';
var COOKIE_LINK_URL = 'http://naturesbounty.it/cookies';

function closeCookiesDisclaimer(response) {
  if (response == COOKIES_YES) {
    var disclaimer = $('.cookies-disclaimer');
    disclaimer.hide();
    disclaimer.remove();
    Cookies.create(COOKIES_USE, response, 2);
  } else {
    var note = "<p><span class='privacy-no-note'>" + COOKIE_MESSAGE_NOTIFICATION + "</span></p>";
    $('.cookies-disclaimer').append(note);
    Cookies.eraseAll();
  }
  return false;
}

function cookiesDisclaimer(parent, ok, no, message, no_message, link_caption, link) {
    if (Cookies[COOKIES_USE] != COOKIES_YES) {
	var disclaimer =
		"<div class='cookies-disclaimer'>" +
		"<p><span>" + COOKIE_MESSSAGE + "</span>" +
		"<a class='privacy-link' href='" + COOKIE_LINK_URL + "'>" + COOKIE_LINK_MESSAGE + "</a>" +
		"<!--<a class='privacy-no' href='' onclick=\"closeCookiesDisclaimer("+COOKIES_NO+");return false;\">" + COOKIE_BUTTON_NO + "</a>-->" +
		"<a class='privacy-ok' href='' onclick='closeCookiesDisclaimer("+COOKIES_YES+");return false;'>" + COOKIE_BUTTON_OK + "</a>" +
		"<span class='clear'></span>" +
		"</p>" +
		"</div>";
	$(parent).append(disclaimer);
    }
}

$(function() {
  cookiesDisclaimer('body');
});
/******************************************************************/
