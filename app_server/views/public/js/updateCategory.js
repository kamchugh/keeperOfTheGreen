addEventListener('load' , function(e) {

console.log("updated Category Loaded");

document.updateCategory.submitCategory.addEventListener('click', function(e) {



e.preventDefault();

var form = e.target.parentElement;

console.log(form.cat_name.value);
console.log(form.id.value+"id should be here");

var cat = {
    id : form.id.value,
    cat_name : form.cat_name.value,
    description : form.description.value,

}

console.log(cat);

console.log("*****************************************");

var jsonString = JSON.stringify(cat);
var xhr = new XMLHttpRequest();

xhr.open('PUT', '/updateCategory');

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

document.updateCategory.deleteCategory.addEventListener('click', function(e) {



e.preventDefault();

var form = e.target.parentElement;


var cat = {
    id : form.id.value,


}

console.log(cat);

console.log("*****************************************");

var jsonString = JSON.stringify(cat);
var xhr = new XMLHttpRequest();

xhr.open('Delete', '/deleteCategory');

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

document.updateProduct.submitProduct.addEventListener('click', function(e) {



e.preventDefault();

var form = e.target.parentElement;




var prod = {
    id : form.id.value,
    title : form.title.value,
    price : form.price.value,
    category : form.category.value,
    description : form.description.value,
    quantity : form.quantity.value,
    img : form.img.value,

}
console.log("PRODUCTS")
console.log(prod);

console.log("*****************************************");

var jsonString = JSON.stringify(prod);
var xhr = new XMLHttpRequest();

xhr.open('PUT', '/updateProduct');

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

document.updateProduct.deleteProduct.addEventListener('click', function(e) {



e.preventDefault();

var form = e.target.parentElement;


var prod = {
    id : form.id.value,


}

console.log(prod);

console.log("*****************************************");

var jsonString = JSON.stringify(prod);
var xhr = new XMLHttpRequest();

xhr.open('Delete', '/deleteProduct');

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



});
