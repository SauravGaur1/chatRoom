let users = [];

function saveUser(id,username,room){
    let user = { id,username,room }
    users.push(user);
    return user;
}

function getUser(id){
    let user = users.find( user => user.id === id );
    if(user){
        return user;
    }
}

function getAllUsers(room){
    return users.filter(user => user.room === room)
}

function onDissconect(id){
    let index = users.findIndex( user => user.id === id );
    if(index != -1){ 
        return users.splice(index,1)[0];
    }
}

module.exports = {
    getUser,saveUser,getAllUsers,onDissconect
}