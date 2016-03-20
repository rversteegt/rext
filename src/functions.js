/**
 * powerf : (a -> a) -> Integer -> (a -> a)
 */
var powerf = compose(reduce(compose, id), repeat);
