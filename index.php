<?php
/**
 * Campaign: Mark - IT - Tanya -
 * Created: 2020-03-31 12:48:19 UTC
 */

require 'leadcloak-y23d52x5spi.php';

// ---------------------------------------------------
// Configuration

// Set this to false if application is properly installed.
$enableDebugging = false;

// Set this to false if you won't want to log error messages
$enableLogging = true;

// Set this to true if want to use landing page rotator
$useLPR = true;

// Set this to the locaiton of the safe page you want to display
$pathToSafePage = '/path/to/safe/page.html';

// Set this to the location of the money page you want to display
$pathToMoneyPage = '/path/to/money/page.html';

// Allows for modded query strings
$myQueryString = [];

parse_str($_SERVER['QUERY_STRING'], $myQueryString);

/**
 *  Add or Modify Query String Variables in the section below.
 *  WARNING: Variables with the same name will be re-written
 */
// Ex.: $myQueryString['my_custom_variable'] = 'my custom variable';

if ($enableDebugging) {
	isApplicationReadyToRun();
}

$data = httpRequestMakePayload($campaignId, $campaignSignature, $useLPR);

$response = httpRequestExec($data);

$handler = httpHandleResponse($response, $enableLogging);

if ($useLPR) {
	if ($handler) {
		require $handler;
		exit();
	}
	header("HTTP/1.0 404 Not Found");
	exit();
} else {
	if ($handler) {
		require $pathToMoneyPage;
		exit();
	} else {
		require $pathToSafePage;
		exit();
	}
}
?>