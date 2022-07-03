import Type2, { Person, Job, Type } from './interfaces'

const isOpen: boolean = false
const myName: string = 'amandine'
const myAge: number = 32
const list: number[] = [0, 1, 2]
const me: [string, number, boolean] = ['Scott', 32, false]

// enum Job {
//   WebDev,
//   WebDesigner,
//   PM,
// }
const job: Job = Job.WebDesigner

const phone: any = 'Pixel'
const table: any = 3

const sayWord = (word = 'bla', ...otherStuff: string[]): string => {
  console.log(otherStuff)
  return word
}
// sayWord('Amandine', 'other stuff')
// sayWord()

let newName: string | number = 'Amandine'
newName = 'BLA'
newName = 10

let newName2 = newName
newName2 = 10 // expects a string like newName was first declared

// union types in functions
const makeMargin = (x: string | number): string => {
  return `margin: ${x}px`
}
console.log(makeMargin(10))

// null types

let dog: string
dog = null
console.log('dog', dog)
dog = 'Martin'
dog = undefined

// interfaces

// interface Person {
//   name: string
//   age?: number
// }

const sayName = ({ name, age }: Person): string => {
  console.log(name)
  return name
}
// console.log('amandine', 32)
sayName({
  name: 'amandine',
  age: 32,
})

sayName({
  age: 32,
  name: 'amandine',
})

sayName({ name: 'amandine' })

// enum
// enum Type {
//   Video,
//   BlogPost,
//   Quiz,
// }

const createContent = (contentType: Type) => {}
createContent(Type.Video)
console.log(Type.Video)

// enum Type2 {
//   Video = 'Video',
//   BlogPost = 'Blog',
//   Quiz = 'Quiz',
// }

const createContent2 = (contenType: Type2) => {
  createContent2(Type2.Quiz)
}
console.log(Type2.Quiz)

// classes

// public
// private prevents outside useage
// readonly prevents from being changed
class Team {
  teamName: string // public
  constructor(teamName) {
    this.teamName = teamName
  }
  score() {
    console.log('goal')
    return 'goal'
  }
}
const redWings = new Team('my team')
redWings.score()
console.log(redWings.teamName)

// modules
// export default > import
// export > import {}

// generics

const outputInput = <T>(arg: T): T => {
  return arg
}
const output: string = outputInput('hi')
outputInput(3)

class Dancer implements Person {
  name: string
  age?: number
}

let dancer1: Person = new Dancer()
const fake = {
  name: 'name',
}

dancer1 = fake
console.log(dancer1)
