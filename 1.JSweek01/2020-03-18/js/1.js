/* 
浏览器加载页面,想让代码执行,首先会形成一个栈内存(执行环境栈ECStack);然后开始让代码准备执行;
=>最开始要执行的一定是全局下的代码,此时形成一个全局代码的执行环境,(全局执行上下文EC(G),把EC(G)压缩到栈内存中去执行(进栈);每一个函数的执行也是这样操作的...

=> 有些上下文在代码执行完成后,会从栈内存中移出去(出栈),但是有些情况不能移出出去的(例如:全局上下文就不能移出...)
=> 在下一次有新的执行上下文进栈的时候,会把之前没有移出的都放到栈内存的底部,


变量提升:在当前执行上下文中,JS代码自上而下执行之前,首先会默认把所有带VAR和FUNCTION 关键字的进行声明或者定义
=> 带var 的只是提前声明
=> 带function 的会提前声明+定义
*/
var n = 100;
//1.创建值100存储到栈内存中(引用数据类型首先创建堆,存完数据后,把堆内存存放到栈中)
//2.创建一个变量  var  a;  => 变量声明(declare)
//3.让变量和值关联在一起   =>变量定义(defined)
//var a ;只声明变量但是没有给变量赋值(也就是未定义),所以默认值是undefined未定义

// console.log(a);//unde
// console.log(func);//func


// var a = 10;
// function func(){
//     console.log(b);//unde
//     var b = 20;
//     console.log(b);//20
    
    
// }
// func();
// console.log(a);//10
// console.log(func);//func

// var func = function func(){
//     console.log(func);
    
// }
// console.log(func);
// func()

if('a' in window2){
    var a =19;
}
console.log(a);

