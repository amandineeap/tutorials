"use strict";
exports.__esModule = true;
var interfaces_1 = require("./interfaces");
var isOpen = false;
var myName = 'amandine';
var myAge = 32;
var list = [0, 1, 2];
var me = ['Scott', 32, false];
// enum Job {
//   WebDev,
//   WebDesigner,
//   PM,
// }
var job = interfaces_1.Job.WebDesigner;
var phone = 'Pixel';
var table = 3;
var sayWord = function (word) {
    if (word === void 0) { word = 'bla'; }
    var otherStuff = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        otherStuff[_i - 1] = arguments[_i];
    }
    console.log(otherStuff);
    return word;
};
// sayWord('Amandine', 'other stuff')
// sayWord()
var newName = 'Amandine';
newName = 'BLA';
newName = 10;
var newName2 = newName;
newName2 = 10; // expects a string like newName was first declared
// union types in functions
var makeMargin = function (x) {
    return "margin: " + x + "px";
};
console.log(makeMargin(10));
// null types
var dog;
dog = null;
console.log('dog', dog);
dog = 'Martin';
dog = undefined;
// interfaces
// interface Person {
//   name: string
//   age?: number
// }
var sayName = function (_a) {
    var name = _a.name, age = _a.age;
    console.log(name);
    return name;
};
// console.log('amandine', 32)
sayName({
    name: 'amandine',
    age: 32
});
sayName({
    age: 32,
    name: 'amandine'
});
sayName({ name: 'amandine' });
// enum
// enum Type {
//   Video,
//   BlogPost,
//   Quiz,
// }
var createContent = function (contentType) { };
createContent(interfaces_1.Type.Video);
console.log(interfaces_1.Type.Video);
// enum Type2 {
//   Video = 'Video',
//   BlogPost = 'Blog',
//   Quiz = 'Quiz',
// }
var createContent2 = function (contenType) {
    createContent2(interfaces_1["default"].Quiz);
};
console.log(interfaces_1["default"].Quiz);
// classes
// public
// private prevents outside useage
// readonly prevents from being changed
var Team = /** @class */ (function () {
    function Team(teamName) {
        this.teamName = teamName;
    }
    Team.prototype.score = function () {
        console.log('goal');
        return 'goal';
    };
    return Team;
}());
var redWings = new Team('my team');
redWings.score();
console.log(redWings.teamName);
// modules
