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

const sayWord = (word: string): string => {
  console.log(word);
  return word;
};

sayWord('Scott');
