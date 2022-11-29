let join = document.getElementById('submit');
let userName = document.getElementById('userName');
let roomName = document.getElementById('roomName');

join.addEventListener('click',()=>{
    if(userName.value!="" && roomName.value !=""){
        window.location.href = `/room?username=${userName.value}&room=${roomName.value}`
    }
});