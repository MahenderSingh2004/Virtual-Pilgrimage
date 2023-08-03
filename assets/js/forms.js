// form loading animation

const { isNull } = require("util");

const form = [...document.querySelector('.form').children];
form.forEach((item,i) =>
{
    setTimeout(() => {
        item.style.opacity =1;
    }, i*100 );
})

window.onload = () => {
    if(sessionStorage.name){
        location.href = '/';
    }
}
//form validation

const name = document.querySelector('.name') || null;
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const submitBtn = document.querySelector('.submit-btn');

if(name == null)
{//means login page isopen
    submitBtn.addEventListener('click',() =>{
        fetch('/register-user',{
            method:'post',
            headers: new Headers({'content-Type':'application/json'}),
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                password: password.value
            })

    })
    .then(res => res.json())
    .then(data =>{
        validateData(data);
    })

})

}

function validateData(data) {
    if (!data.name) {
        alertBox(data);
    } else {
        sessionStorage.name = data.name;
        sessionStorage.email = data.email;
        location.href = '/';

    }
}


const alertBox =(data) => {
    const alertContainer = document.querySelector('.alter-box');
    const alterMsg = document.querySelector('.alter');
    alterMsg.innerHTML = data;

    alertContainer.style.top = '5%';
    setTimeout(() => {
        alertContainer.style.top = null;
    }, 5000);
}
