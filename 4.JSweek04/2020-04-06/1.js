// var str = '珠峰666';
// var reg = /\d/;//只要字符串中含有数字 即可
// console.log(reg.test(str));


// var reg = /\d{2,4}/;
// console.log(reg.test('2a2d3d'));
// console.log(reg.test('22d3d'));

// var reg = /^ \d[a-z]|\d{0,}\d$/;
// console.log(reg.test('1zhufeng666'))
// console.log(reg.test('432aefasdfsdfsf3456'))


// var reg = /\\d+/;// 要去匹配一个 \ 后边是1到多个d字符 ‘\ddd’
// console.log(reg.test('qqwewer'))
// console.log(reg.test('134543'))
// console.log(reg.test('134543d'))
// console.log(reg.test('dd'))
// console.log(reg.test('\dd'))
// console.log(reg.test('\\\\dd'))
// var reg = /[a-c]/;//就是abc 任意一个字符就可以
// console.log(reg.test('aeadfgergdfgd'));
// console.log(reg.test('234werrfrg'));
// console.log(reg.test(''));
// var reg = /^1.2$/;
// console.log(reg.test('1.2'));
// console.log(reg.test('11.22'));
// console.log(reg.test('1.21.2'));
// var reg = /18|19/;
// // console.log(reg.test(819));
// // console.log(reg.test(11));
// // console.log(reg.test(1819));
// console.log(reg.test(119));
// var reg = /^18|19/;
// console.log(reg.test(819));
// console.log(reg.test(11));
// console.log(reg.test(1819));
// console.log(reg.test(119));

var reg = /^(18|19)$/
console.log(reg.test('18'));
console.log(reg.test('1819'));
var reg = /^[(18)(19)]$/
var reg =/^1[89]$/
var reg= /^1(8|9)$/





