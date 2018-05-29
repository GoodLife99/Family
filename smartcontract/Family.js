"use strict";

var FamilyInherit = function() {
    LocalContractStorage.defineMapProperty(this, "dataMap");//用来保存所有家族传承记录
};

FamilyInherit.prototype = {
    init: function() {
},
    save: function(name, gender, birthDate) {//保存家族传承记录
        var name = name.trim();
        if (name == "") {
            throw new Error("empty name");
        }
var gender = gender.trim();
        if (gender == "") {
            throw new Error("empty gender");
        }
var birthDate = birthDate.trim();
        if (birthDate == "") {
            throw new Error("empty birthDate");
        } 

var objArr;
var objArrStr = this.dataMap.get(from);
if(objArrStr != "" && objArrStr != null){
objArr = JSON.parse(objArrStr);
}else{
objArr = [];
}
var from = Blockchain.transaction.from;
var obj = new Object();
obj.owner = from;
obj.name = name;
obj.gender = gender;
obj.birthDate = birthDate;
objArr.push(obj);
        this.dataMap.set(from, JSON.stringify(objArr));
    },
get: function(){//取出此地址相关联的家族传承记录
var from = Blockchain.transaction.from;
        return this.dataMap.get(from);
},
    transfer: function(newAddress, name, gender, birthDate) {//传承给子孙
        var newAddress = newAddress.trim();
        if (newAddress == "") {
            throw new Error("empty newAddress");
        }
        var name = name.trim();
        if (name == "") {
            throw new Error("empty name");
        }
var gender = gender.trim();
        if (gender == "") {
            throw new Error("empty gender");
        }
var birthDate = birthDate.trim();
        if (birthDate == "") {
            throw new Error("empty birthDate");
        }
var from = Blockchain.transaction.from;
var objArr;
var objArrStr = this.dataMap.get(from);
if(objArrStr != "" && objArrStr != null){
objArr = JSON.parse(objArrStr);
}else{
objArr = [];
} 
var from = Blockchain.transaction.from;
var obj = new Object();
obj.owner = newAddress;
obj.name = name;
obj.gender = gender;
obj.birthDate = birthDate;
objArr.push(obj);
//把新的家族传承记录保存到新的地址中，可以传给多个子女们，每个人都会保存自己的一条链，一直传下去
        this.dataMap.set(newAddress, JSON.stringify(objArr));
    } 

};

module.exports = FamilyInherit;