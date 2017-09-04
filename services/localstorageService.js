var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
function getLocalstorage(key_name){
    return JSON.parse(localStorage.getItem(key_name));
}
module.exports.getLocalstorage = getLocalstorage;