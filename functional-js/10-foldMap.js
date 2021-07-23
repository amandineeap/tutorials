const {Map, List} = require('immutable-ext');
const {Sum} = require('./08-monoid');

const res = List.of(1,2,3)
                .foldMap(Sum, Sum.empty()); // equivalent of Map then Fold

console.log(res);