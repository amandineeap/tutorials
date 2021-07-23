const nextCharForNumberString = str => {
    const trimmed = str.trim();
    const number = parseInt(trimmed);
    const nextNumber = number + 1;
    return String.fromCharCode(nextNumber);
}

const Box = x => 
({
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: () => `Box(${x})`
});

const LazyBox = g =>
({
    fold: f => f(g()),
    map: f => LazyBox(() => f(g()))
});

const result =  LazyBox(() => '  64 ')
                .map(abba => abba.trim())
                .map(trimmed => new Number(trimmed))
                .map(number => number+1)
                .map(x => String.fromCharCode(x))
                .fold(x => x.toLowerCase())
                ;

console.log(result);