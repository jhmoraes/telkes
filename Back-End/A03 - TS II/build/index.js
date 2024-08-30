"use strict";
var ROLE;
(function (ROLE) {
    ROLE["ADMIN"] = "admin";
    ROLE["NORMAL"] = "normal";
})(ROLE || (ROLE = {}));
const userOne = {
    id: '010101',
    name: 'Juliana',
    email: 'ju@email.com',
    password: '123456',
};
const userTwo = {
    id: '020202',
    name: 'Livia',
    email: 'livia@email.com',
    password: '123456',
};
const userThree = {
    id: "030303",
    name: "João",
    email: "joão@email.com",
    password: "020405",
};
const userFour = {
    id: "040404",
    name: "Joana",
    email: "joana@email.com",
    password: "020405",
};
const userFive = {
    id: '050505',
    name: 'Roberto',
    email: 'ro@email.com',
    password: '123456',
    account: ROLE.ADMIN,
    permission: true
};
const userSix = {
    id: '060606',
    name: 'Bruno',
    email: 'bru@email.com',
    password: '123456',
    account: ROLE.NORMAL,
    permission: false
};
const arrayAdminUser = [];
const arrayNormalUser = [];
const arrayUser = [];
arrayUser.push(userFive);
arrayUser.push(userSix);
console.log(arrayUser);
//# sourceMappingURL=index.js.map