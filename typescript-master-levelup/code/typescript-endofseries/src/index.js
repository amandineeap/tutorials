"use strict";
exports.__esModule = true;
var Interfaces_1 = require("./Interfaces");
var isOpen = false;
var myName = 'Scott';
var myAge = 32.04;
var list = [0, 1, 2];
var me = ['Scott', 32, false];
var job = Interfaces_1["default"].WebDev;
var phone = 'Pixel';
var tablet = 3;
// Functions in TypeScript
// ? for optional params
// const sayWord = (word?: string): string => {
//   console.log(word || 'Hello');
//   return word || 'Hello';
// };
// sayWord();
// Default params
// Rest params work as expected
var sayWord = function (word) {
    if (word === void 0) { word = 'Hello'; }
    var otherStuff = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        otherStuff[_i - 1] = arguments[_i];
    }
    console.log(otherStuff);
    return word;
};
sayWord('Scott', 'Wes');
// Implicit Types in TS
var newName = 'Scott';
newName = 'Wes';
// Gets type from initial declaration
var newNameTwo = newName;
// newNameTwo = false;
//  Union Types with |
var makeMargin = function (x) {
    return "margin: " + x + "px;";
};
makeMargin(10);
makeMargin('10');
// makeMargin(false);
// Null Types
var dog = 'Sammy';
dog = null;
console.log('dog', dog);
dog = 'Lucie';
dog = undefined;
var sayName = function (_a) {
    var name = _a.name, age = _a.age;
    console.log(name);
    return name;
};
// This works too!
// const sayName = ({ name, age }: Person): Person => {
//   console.log(name);
//   return { name, age };
// };
sayName({
    name: 'Scott'
});
sayName({
    age: 32,
    name: 'Scott'
});
// Enums
// Numeric Enum
var Type;
(function (Type) {
    Type[Type["Video"] = 0] = "Video";
    Type[Type["BlogPost"] = 1] = "BlogPost";
    Type[Type["Quiz"] = 2] = "Quiz"; // 2
})(Type || (Type = {}));
var createContent = function (contentType) { };
createContent(Type.Quiz);
console.log(Type.Quiz);
// String Enum
var createContent2 = function (contentType) { };
createContent2(Interfaces_1.Type2.Quiz);
// Not going to work
// createContent2('QUIZ');
console.log('Type2.Quiz', Interfaces_1.Type2.Quiz);
// Classes
var Team = /** @class */ (function () {
    // public teamName: string; this is same as above
    // private teamName: string; prevents outside usage
    // readonly teamName: string; prevents from being changed
    function Team(teamName) {
        this.teamName = teamName;
    }
    Team.prototype.score = function () {
        console.log(this.teamName);
        return 'goal!';
    };
    return Team;
}());
var redWings = new Team('Red Wings');
redWings.score();
redWings.teamName;
