**Limited Support Notice**
--------------------------

This sample application and sample code are meant for example purposes. This example is not guaranteed to run out of the box, as it may have been written for an older version of the FaceTec Browser SDK than is currently supported.

For experienced developers, this example should be enough to port the FaceTec Browser SDK into your own application. There may be some work required to update the sample code to the very latest released "Browser/Web/JS" SDK, which can be downloaded here - https://dev.facetec.com/downloads.

This example is not recommended for production code. It is designed only to show the minimum code needed to perform a Liveness check with the FaceTec Browser SDK.

If you have any questions or require assistance, please review the guidance in https://dev.facetec.com/technical-support-overview and create a Support Request in https://dev.facetec.com/request-support. 
------------------------------

**End Limited Support Notice**

This project was generated with npm create vite@latest my-vue-app -- --template react

Steps to Run
------------

1. Download the latest "Browser/JS SDK" from <https://dev.facetec.com/downloads>
2. Copy the "core-sdk" folder from downloaded FaceTecSDK-browser-x.x.x folder and place it inside this project's main folder.
3. Open Config.ts in the "src" folder and replace the DeviceKeyIdentifier variable with the DeviceKeyIdentifier from your developer account page <https://dev.facetec.com/account> and save the file.
4. Open terminal in this project's main folder.
5. Run the following commands:
    npm install
        -- This command installs the necessary dependencies for building the app.
    npm run build
        -- This will build the sample app
    npm run dev
        -- This will start the sample app server. Navigate to the url listed in the console

Vite Specific Details
---------------------

Vite applies some read-only properties to the FaceTec Browser SDK internals during the build process which throws read-only errors during execution.
A simple workaround, included in this sample, is to load the FaceTec Browser SDK from the HTML file rather than importing it into the JSX code.
See these files for the example code changes/additions.

1. index.html
    Add <script src="./core-sdk/FaceTecSDK.js/FaceTecSDK.js"></script>
2. react-ts-sample.tsx
    Use declare var FaceTecSDK: any;
3. LivenessCheckProcessor.tsx
    Use declare var FaceTecSDK: any;
