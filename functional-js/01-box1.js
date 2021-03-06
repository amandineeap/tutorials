// const nextCharForNumberString = str => {
//     const trimmed = str.trim();
//     const number = parseInt(trimmed);
//     const nextNumber = number + 1;
//     return String.fromCharCode(nextNumber);
// }

const Box1 = x => 
({
    map: f => Box1(f(x)),
    fold: f => f(x),
    inspect: () => `Box1(${x})`
});

const nextCharForNumberString = str => 
    //String.fromCharCode(parseInt(str.trim()) +1);
    // [str]
    Box1(str)
    .map(s => s.trim())
    .map(r => new Number(r))
    // .map(r => parseInt(r))
    .map(i => i+1)
    .map(i => String.fromCharCode(i))
    .fold(c => c.toLowerCase())
    ;

const result = nextCharForNumberString('  64');

console.log(result);