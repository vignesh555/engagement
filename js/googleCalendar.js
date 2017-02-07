 // Client ID and API key from the Developer Console
 var CLIENT_ID = '23008380653-548esc3m7flfbuv81ga44conna7ifkq5.apps.googleusercontent.com';

 // Array of API discovery doc URLs for APIs used by the quickstart
 var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

 // Authorization scopes required by the API; multiple scopes can be
 // included, separated by spaces.
 //var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
 var SCOPES = "https://www.googleapis.com/auth/calendar";

 var authorizeButton = document.getElementById('authorize-button');
 var signoutButton = document.getElementById('signout-button');

 /**
  *  On load, called to load the auth2 library and API client library.
  */
 function handleClientLoad() {
     gapi.load('client:auth2', initClient);
 }

 /**
  *  Initializes the API client library and sets up sign-in state
  *  listeners.
  */
 function initClient() {
     gapi.client.init({
         discoveryDocs: DISCOVERY_DOCS,
         clientId: CLIENT_ID,
         scope: SCOPES
     }).then(function() {
         // Listen for sign-in state changes.
         gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

         // Handle the initial sign-in state.
         updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
         authorizeButton.onclick = handleAuthClick;
         signoutButton.onclick = handleSignoutClick;
     });
 }

 /**
  *  Called when the signed in status changes, to update the UI
  *  appropriately. After a sign-in, the API is called.
  */
 function updateSigninStatus(isSignedIn) {
     if (isSignedIn) {
         authorizeButton.style.display = 'none';
         signoutButton.style.display = 'block';
         listUpcomingEvents();
     } else {
         authorizeButton.style.display = 'block';
         signoutButton.style.display = 'none';
     }
 }

 /**
  *  Sign in the user upon button click.
  */
 function handleAuthClick(event) {
     gapi.auth2.getAuthInstance().signIn();
 }

 /**
  *  Sign out the user upon button click.
  */
 function handleSignoutClick(event) {
     gapi.auth2.getAuthInstance().signOut();
 }

 /**
  * Append a pre element to the body containing the given message
  * as its text node. Used to display the results of the API call.
  *
  * @param {string} message Text to be placed in pre element.
  */
 function appendPre(message) {
     var pre = document.getElementById('content');
     var textContent = document.createTextNode(message + '\n');
     pre.appendChild(textContent);
 }

 /**
  * Print the summary and start datetime/date of the next ten events in
  * the authorized user's calendar. If no events are found an
  * appropriate message is printed.
  */
 function listUpcomingEvents() {
     var resource = {
         "summary": "Vignesh Engagement Meenakshi",
         "location": "AP Mini Hall, No 10, Gst Road, Pallavaram, Chennai 600043",
         "start": {
             "dateTime": "2017-03-16T16:00:00",
             "timeZone": "Asia/Kolkata"
         },
         "end": {
             "dateTime": "2017-03-16T20:00:00",
             "timeZone": "Asia/Kolkata"
         },
         'reminders': {
             'useDefault': false,
             'overrides': [
                 { 'method': 'email', 'minutes': 24 * 60 },
                 { 'method': 'popup', 'minutes': 10 }
             ]
         }
     };
     var request = gapi.client.calendar.events.insert({
         'calendarId': 'primary',
         'resource': resource
     });
     request.execute(function(resp) {
         console.log(resp);
         if (resp && resp.status) {
             $(".content-text").html("Thanks for adding an event. Waiting for your presence");
         }

     });
 }
