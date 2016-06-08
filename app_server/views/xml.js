document.updateUser.getElementById('submit').addEventListener('click', function(e) {

e.preventdefault();

var form = e.target.parentElement;

var user = {
    user_id: form.id.value,
    fname: form.fname.value,
    lname: form.lname.value,
    address: form.address.value,
    city: form.city.value,
    state: form.state.value,
    zip: form.zip.value,
    phone: form.phone.value,
    email: form.email.value,
    password: form.password.value,
}

console.log("*****************************************");

var jsonString = JSON.stringify(user);
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

xhr.open('PUT', '/users');

xhr.setRequestHeader('Content-type', 'application/json');

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status < 400) {
    console.log(xhr.status);
    console.log(xhr.responseText);
}
if (xhr.readyState === 4 && xhr.status >= 400) {
    console.error(xhr.status + ': ' + xhr.responseText);
}
};
xhr.send(jsonString);
});

var data = JSON.parse(jsonString);

console.log("***********************************************************");
