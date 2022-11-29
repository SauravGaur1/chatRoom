let parent = document.getElementById("mainChatPart");
let send = document.getElementById("send");
let leave = document.getElementById("leaveRoom");
let message = document.getElementById("message")
let roomName = document.getElementById("roomName")
const socket = io();


const {username , room} = Qs.parse(location.search, {
    ignoreQueryPrefix : true
});
console.log(username,room);

socket.emit('joinRoom',{username,room},function(err,data){
    console.log(err,"==>",data);
});

socket.on('message',function(data){
    addmessage(data);
    parent.scrollTop = parent.scrollHeight;
});

socket.on('roomUsers',function({room,members}){
    roomName.innerText = room;
    console.log(room,"==>",members);
    setMembers(members);
});

send.addEventListener('click',function(){
    socket.emit('message',message.value);
    console.log("messaege sent")
    parent.scrollTop = parent.scrollHeight;
    message.value = '';
    message.focus();
})

leave.addEventListener('click',function(){
    window.location.href = '/';
});

function addmessage(data){
    let chatItem = document.createElement('div');
    chatItem.classList.add("chatItem");
    chatItem.innerHTML = `<span class="userName">${data.username}</span>
    <span class="timeStamp">${data.time}</span>
    <p class="textMessage">${data.data}</p>`;
    parent.appendChild(chatItem);
}

function setMembers(members){
    console.log(members)
    document.querySelector('.users').innerHTML = ''; 
    members.forEach(person => {
        let span = document.createElement('span');
        span.innerText = person.username;
        document.querySelector('.users').append(span);
    });
}