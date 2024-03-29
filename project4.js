let title = document.getElementById('title'); 
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;
let table = document.getElementById('table')
let light = document.getElementById('light')
let dark = document.getElementById('dark')
let body = document.getElementById('body')
let openButton = document.getElementById('open')
let closeButton = document.getElementById('close')
let nav = document.getElementById('nav')
//open and close navbar
openButton.onclick = function(){
    openButton.style.display = 'none'
    closeButton.style.display = 'inline'
    nav.style.display = 'block'
}
closeButton.onclick = function(){
    openButton.style.display = 'inline'
    closeButton.style.display = 'none'
    nav.style.display = 'none'
}
//get total
function getTotal()
{
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value)
        - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }else{
        total.innerHTML = ' ';
        total.style.background = '#a00d02';
    }
}
//creat product
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = []; 
}

submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (mood == 'create') {
        if (newPro.count > 1) {
            for (let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro);
            }
        } else {
            dataPro.push(newPro);
        }
    } else {
        dataPro[tmp] = newPro;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block'
        
    }
    localStorage.setItem('product', JSON.stringify(dataPro));
    clearData();
    showData();
}
//clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    
}
//read
function showData()
{
    let table = '';
    for (let i = 0; i < dataPro.length;i++){
        table +=`
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(  ${i}  )" id="delete">delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll')
    if (dataPro.length > 0 ) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">delete All (${dataPro.length})</button>
        `
    } else {
        btnDelete.innerHTML = '';
    }
    getTotal() 
}
showData()
//delete
function deleteData(i)
{
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro)
    showData()
}
function deleteAll() {   
    localStorage.clear();
    dataPro.splice(0);
    showData()
    
}
//update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior:'smooth',
    })
}
//search
let searchMood = 'title';
function getSearchMood(id)
{
    let search = document.getElementById('search')
    if (id == 'searchTitle') {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
    search.placeholder = 'Search By '+ searchMood
    search.focus()
    search.value = '';
    showData()
}

function searchData(value) {
    let table = '';
    if (searchMood == 'title')
{
        
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(  ${i}  )" id="delete">delete</button></td>
            </tr>
                `;
            }


        }
    }

    else{
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(  ${i}  )" id="delete">delete</button></td>
            </tr>
                `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
title.classList.add('hide')
price.classList.add('hide'); 
taxes.classList.add('hide');
discount.classList.add('hide');
ads.classList.add('hide');
total.classList.add('hide');
count.classList.add('hide');
category.classList.add('hide');
submit.classList.add('hide');
search.classList.add('hide');
table.classList.add('hide')
dark.classList.add('hide')
light.classList.add('hide')
document.getElementById('head').classList.add('hide')
document.getElementById('searchTitle').classList.add('hide')
document.getElementById('searchCategory').classList.add('hide')
document.getElementById('time').classList.add('hide')
document.getElementById('clock').classList.add('hide')
document.getElementById('deleteAll').classList.add('hide')
document.getElementById('button').classList.add('hide')
nav.classList.add('hide')
openButton.classList.add('hide')
closeButton.classList.add('hide')

let correct = document.getElementById('correct')
let password = document.getElementById('password')
    
    correct.onclick = function () {
        if (password.value == 'programming') {
            title.classList.remove('hide')
            price.classList.remove('hide');
            taxes.classList.remove('hide');
            discount.classList.remove('hide');
            ads.classList.remove('hide');
            total.classList.remove('hide');
            count.classList.remove('hide');
            category.classList.remove('hide');
            submit.classList.remove('hide');
            search.classList.remove('hide');
            table.classList.remove('hide')
            document.getElementById('head').classList.remove('hide')
            document.getElementById('searchTitle').classList.remove('hide')
            document.getElementById('searchCategory').classList.remove('hide')
            document.getElementById('clock').classList.remove('hide')
            document.getElementById('time').classList.remove('hide')
            document.getElementById('deleteAll').classList.remove('hide')
            correct.classList.add('hide')
            password.classList.add('hide')
            dark.classList.remove('hide')
            light.classList.remove('hide')
            document.getElementById('button').classList.remove('hide')
            nav.classList.remove('hide')
            openButton.classList.remove('hide')
            closeButton.classList.remove('hide')
        } else {
            correct.classList.add('hide')
            password.classList.add('hide')
            enabled = document.write('<h1>you are enabled</h1>')
        }
    }

light.onclick = function () {
    if (body.style.background != '#fff') {
        body.style.background = '#fff'
        body.style.color = '#000'
    } else {
        body.style.background = '#fff'
        body.style.color = '#000'
    }
}
dark.onclick = function () {
    if (body.style.background != '#222') {
        body.style.background = '#222'
        body.style.color = '#fff'
    } else {
        body.style.background = '#222'
        body.style.color = '#fff'
    }
}


//new
let button = document.getElementById('button')
button.onclick = function(){
    scroll({
        top: 0,
        behavior: 'smooth',
    })
}