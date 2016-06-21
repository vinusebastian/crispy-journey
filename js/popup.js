document.getElementById("clickMe").onclick = doNothing;

function getStatus(number, callback, failedCallBack) {
  var url = 'http://api.railwayapi.com/live/train/' + encodeURIComponent(number) + '/doj/' + getDateString() + '/apikey/gudkl9973/';
  var x = new XMLHttpRequest();
  x.open('GET', url);
  x.responseType = 'json';
  x.onload = function() {
    var response = x.response;
    if (!response || response.response_code === 510)  {
      failedCallBack('Train not scheduled to run today');
      return;
    }
    else if (!response || response.response_code === 204)  {
      failedCallBack('Not found');
      return;
    }
    callback(response)
  }
  x.onerror = function() {
    failedCallBack('Network error.');
  };
  x.send();
}

function getDateString() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    var today = yyyy+ '' +mm+ ''+ dd;
    return today
}

function doNothing(callback) {
      document.getElementById("loading").style.display = "block";
      var a =  document.getElementById("submitText").value
      // if (a != "") {
        getStatus(a, function (response) {
          document.getElementById("loading").style.display = "none";
          renderStatus(response.position);
        }, function (error) {
          document.getElementById("loading").style.display = "none";
          renderStatus('Cannot Find running status:' + error);

        });
      // }
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

// function searchKeyPress(e)
// {
//     // look for window.event in case event isn't passed in
//     e = e || window.event;
//     if (e.keyCode == 13)
//     {
//         document.getElementById('clickMe').click();
//         return false;
//     }
//     return true;
// }

// document.getElementById('submitText').onkeydown = function(e){
//    if(e.keyCode == 13){
//      doNothing()
//    }
// };
