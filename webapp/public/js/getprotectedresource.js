function postRequest(url, data, func) {
  const xhr = new XMLHttpRequest();
  xhr.responseJSON = null;

  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/json');

  if (sessionStorage.token) {
    xhr.setRequestHeader('Authorization', 'JWT '.concat(sessionStorage.token));
  }

  xhr.addEventListener('load', function () {
    var result;
    if (xhr.status == 200) {
      result = xhr.responseJSON = JSON.parse(xhr.responseText);
    } else {
      result = {};
    }

    func(xhr.status, result);
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
    var result;
    if (xhr.status == 200) {
      result = xhr.responseJSON = JSON.parse(xhr.responseText);
    } else {
      result = {};
    }

    func(xhr.status, result);
  });

  xhr.send();
  return xhr;
}