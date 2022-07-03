const isOpen: boolean = false;

const myName: string = 'Scott';

const myAge: number = 32.04;

const list: number[] = [0, 1, 2];

const me: [string, number, boolean] = ['Scott', 32, false];

enum Job {
  WebDev,
  WebDesigner,
  PM
}
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

// Interfaces
interface Person {
  name: string;
  age?: number; // ? Optional param
}

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
