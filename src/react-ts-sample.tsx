import { Config } from "./Config";
declare var FaceTecSDK: any;
import { LivenessCheckProcessor } from "./processors/LivenessCheckProcessor";
import { SampleAppUtilities } from "./utilities/SampleAppUtilities";

export var SampleApp = (function(): any {
  var latestEnrollmentIdentifier = "";
  var latestSessionResult: any = null;
  var latestIDScanResult: any = null;
  var latestProcessor: LivenessCheckProcessor | undefined;

  // Wait for onload to be complete before attempting to access the Browser SDK.
  window.onload = function(): void {
    // Set a the directory path for other FaceTec Browser SDK Resources.
    FaceTecSDK.setResourceDirectory("/core-sdk/FaceTecSDK.js/resources");

    // Set the directory path for required FaceTec Browser SDK images.
    FaceTecSDK.setImagesDirectory("/core-sdk/FaceTec_images");

    // Initialize FaceTec Browser SDK and configure the UI features.
    FaceTecSDK.initializeInDevelopmentMode(Config.DeviceKeyIdentifier, Config.PublicFaceScanEncryptionKey, function(initializedSuccessfully: boolean) {
      if(initializedSuccessfully) {
        SampleAppUtilities.enableAllButtons();
      }

      SampleAppUtilities.displayStatus(FaceTecSDK.getFriendlyDescriptionForFaceTecSDKStatus(FaceTecSDK.getStatus()));
    });

    SampleAppUtilities.formatUIForDevice();
  };

  // Initiate a 3D Liveness Check.
  function onLivenessCheckPressed(): void {
    SampleAppUtilities.fadeOutMainUIAndPrepareForSession();

    // Get a Session Token from the FaceTec SDK, then start the 3D Liveness Check.
    getSessionToken(function(sessionToken: string) {
      latestProcessor = new LivenessCheckProcessor(sessionToken, SampleApp);
    });
  }

  // Show the final result and transition back into the main interface.
  function onComplete(): void {
    SampleAppUtilities.showMainUI();
    SampleAppUtilities.enableAllButtons();

    if(!latestProcessor?.isSuccess()) {
      // Reset the enrollment identifier.
      latestEnrollmentIdentifier = "";

      // Show early exit message to screen.  If this occurs, please check logs.
      SampleAppUtilities.displayStatus("Session exited early, see logs for more details.");

      return;
    }

    // Show successful message to screen
    SampleAppUtilities.displayStatus("Success");
  }

  // Get the Session Token from the server
  function getSessionToken(sessionTokenCallback: any): void {
    var XHR = new XMLHttpRequest();
    XHR.open("GET", Config.BaseURL + "/session-token");
    XHR.setRequestHeader("X-Device-Key", Config.DeviceKeyIdentifier);
    XHR.setRequestHeader("X-User-Agent", FaceTecSDK.createFaceTecAPIUserAgentString(""));

    XHR.onreadystatechange = function(): void {
      if(this.readyState === XMLHttpRequest.DONE) {
        var sessionToken = "";

        try {
          // Attempt to get the sessionToken from the response object.
          sessionToken = JSON.parse(this.responseText).sessionToken;

          // Something went wrong in parsing the response. Return an error.
          if(typeof sessionToken !== "string") {
            onServerSessionTokenError();
            return;
          }
        }
        catch{
          // Something went wrong in parsing the response. Return an error.
          onServerSessionTokenError();
          return;
        }

        sessionTokenCallback(sessionToken);
      }
    };

    XHR.onerror = function(): void {
      onServerSessionTokenError();
    };

    XHR.send();
  }

  function onServerSessionTokenError(): void {
    SampleAppUtilities.handleErrorGettingServerSessionToken();
  }

  //
  // DEVELOPER NOTE:  This is a convenience function for demonstration purposes only so the Sample App can have access to the latest session results.
  // In your code, you may not even want or need to do this.
  //
  function setLatestSessionResult(sessionResult: any): void {
    latestSessionResult = sessionResult;
  }

  function getLatstSessionResult(): any {
    return latestSessionResult;
  }

  function setIDScanResult(idScanResult: any): void {
    latestIDScanResult = idScanResult;
  }

  function getIDScanResult(): any {
    return latestIDScanResult;
  }

  function getLatestEnrollmentIdentifier(): string {
    return latestEnrollmentIdentifier;
  }

  function setLatestServerResult(responseJSON: any): void {
    console.log(responseJSON);
  }

  return {
    onLivenessCheckPressed,
    onComplete,
    setLatestSessionResult,
    setIDScanResult,
    getLatestEnrollmentIdentifier,
    setLatestServerResult,
    getLatstSessionResult,
    getIDScanResult,
  };
})();
