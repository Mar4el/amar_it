<?php
/**
 * Campaign: Mark - IT - Tanya - test
 * Created: 2020-03-31 12:48:19 UTC
 */

require 'leadcloak-y23d52x5spi.php';

// ---------------------------------------------------
// Configuration

// Set this to false if application is properly installed.
$enableDebugging = false;

// Set this to false if you won't want to log error messages
$enableLogging = true;

if ($enableDebugging) {
	isApplicationReadyToRun();
}

$data = httpRequestMakePayload($campaignId, $campaignSignature);

$response = httpRequestExec($data);

$handler = httpHandleResponse($response, $enableLogging);

if ($handler) {
	print $handler;
	exit();
}
?>