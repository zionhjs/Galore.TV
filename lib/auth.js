/*global gapi*/
var clientId = '76642000085-vil1gckkhn3o02g5rtfvgbrvpn0jh1ph.apps.googleusercontent.com';

var apiKey = 'AIzaSyC4R4BG4UZuH-u7uTSBKbXTNFpbl7p709U';

var scopes = 'https://www.googleapis.com/auth/youtube';

function handleClientLoad() {
    // Step 2: Reference the API key
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth,1);
}

function checkAuth() {
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}

function handleAuthResult(authResult) {
    var authorizeButton = document.getElementById('authorize-button');
    var likeButton = document.getElementById('like-button');
    if (authResult && !authResult.error) {
        likeButton.onclick = makeApiCall;
        authorizeButton.style.visibility = 'hidden';
        likeButton.style.visibility = '';
    } else {
        authorizeButton.style.visibility = '';
        authorizeButton.onclick = handleAuthClick;
    }
}

function handleAuthClick(event) {
    // Step 3: get authorization to use private data
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
    return false;
}

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
    // Step 4: Load the Google+ API
    gapi.client.load('youtube', 'v3').then(function() {
        // Step 5: Assemble the API request
        var request = gapi.client.youtube.videos.rate({
            'rating': 'like',
            'id': window.currentSceneId
        });
        // Step 6: Execute the API request
        request.then(function(resp) {
            console.log(resp);
        }, function(reason) {
            console.log('Error: ' + reason.result.error.message);
        });
    });
}
