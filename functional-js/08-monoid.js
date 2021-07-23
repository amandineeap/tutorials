// const res = "a".concat("b".concat("c"));
// const res = [1,2].concat([3,4].concat([5,6]));

const Sum = x => 
({
    x,
    concat: ({x:y}) => 
        Sum(x + y),
    inspect: () => 
        `Sum(${x})`
});

Sum.empty = () => Sum(0);

// const res = Sum(1).concat(Sum(2));

const All = x => 
({
    x,
    concat: ({x:y}) => 
        All(x  && y),
    inspect: () => 
        `All(${x})`
});

All.empty = () => All(true);

// const res = All(false).concat(All(true));

const First = x => 
({
    x,
    concat: _ => 
        First(x),
    inspect: () => 
        `First(${x})`
});
// has to remain semigroup, no way to define default

const sum = xs => xs.reduce((acc, x) => acc + x, 0); 
const all = xs => xs.reduce((acc, x) => acc && x, true); 
const first = xs => xs.reduce((acc, x) => acc); // no default value if null

console.log(res);