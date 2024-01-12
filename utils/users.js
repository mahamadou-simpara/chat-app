const users = [];

function joinUser (id, username, room) {
    const user = {id ,username, room};

    users.push(user);

    return user;
};

function currentUser (id) {
    return users.find(user => user.id === id);
};

function userLeaves(id) {
    const index = users.findIndex(user => user.id === id);

    if(index >= 0){
       return users.splice(index, 1);
    };
};





module.exports = { 
    joinUser,
    currentUser,
    userLeaves
}