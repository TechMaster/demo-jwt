function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}



function postRequest(url, data, func) {
  const xhr = new XMLHttpRequest();
  xhr.responseJSON = null;

  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/json');

  if (sessionStorage.token) {
    xhr.setRequestHeader('Authorization', 'JWT '.concat(sessionStorage.token));
  }

  xhr.addEventListener('load', function () {
    xhr.responseJSON = JSON.parse(xhr.responseText);
    func(xhr.responseJSON);
  });

  xhr.send(JSON.stringify(data));

  return xhr;
}

//Nếu gọi khác domain thì https://www.html5rocks.com/en/tutorials/cors/
function getRequest(url, func) {
  const xhr = new XMLHttpRequest();
  xhr.responseJSON = null;

  xhr.open('GET', url, true);

  if (sessionStorage.token) {
    xhr.setRequestHeader('Authorization', 'JWT '.concat(sessionStorage.token));
  }

  xhr.addEventListener('load', function () {
    xhr.responseJSON = JSON.parse(xhr.responseText);
    func(xhr.responseJSON);
  });

  xhr.send();
  return xhr;
}