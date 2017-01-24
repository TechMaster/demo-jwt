function postProtected(url, data, func) {
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