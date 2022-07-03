import Job, { Person, Type2 } from './Interfaces';

const isOpen: boolean = false;

const myName: string = 'Scott';

const myAge: number = 32.04;

const list: number[] = [0, 1, 2];

const me: [string, number, boolean] = ['Scott', 32, false];

const job: Job = Job.WebDev;

const phone: any = 'Pixel';
const tablet: any = 3;

// Functions in TypeScript
// ? for optional params
// const sayWord = (word?: string): string => {
//   console.log(word || 'Hello');
//   return word || 'Hello';
// };

// sayWord();
// Default params
// Rest params work as expected
const sayWord = (word = 'Hello', ...otherStuff: string[]): string => {
  console.log(otherStuff);
  return word;
};

sayWord('Scott', 'Wes');

// Implicit Types in TS
let newName = 'Scott';
newName = 'Wes';

// Gets type from initial declaration
let newNameTwo = newName;
// newNameTwo = false;

//  Union Types with |
const makeMargin = (x: string | number): string => {
  return `margin: ${x}px;`;
};

makeMargin(10);
makeMargin('10');
// makeMargin(false);

// Null Types
let dog: string | undefined = 'Sammy';
dog = null;
console.log('dog', dog);
dog = 'Lucie';
dog = undefined;

const sayName = ({ name, age }: Person): string => {
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
enum Type {
  Video, // 0
  BlogPost, // 1
  Quiz // 2
}

const createContent = (contentType: Type) => {};
createContent(Type.Quiz);

console.log(Type.Quiz);

// String Enum

const createContent2 = (contentType: Type2) => {};
createContent2(Type2.Quiz);
// Not going to work
// createContent2('QUIZ');
console.log('Type2.Quiz', Type2.Quiz);

// Classes

class Team {
  teamName: string;
  // public teamName: string; this is same as above
  // private teamName: string; prevents outside usage
  // readonly teamName: string; prevents from being changed

  constructor(teamName) {
    this.teamName = teamName;
  }

  score(): string {
    console.log(this.teamName);
    return 'goal!';
  }
}

const redWings = new Team('Red Wings');
redWings.score();
redWings.teamName;
