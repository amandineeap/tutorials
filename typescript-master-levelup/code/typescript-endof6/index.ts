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
