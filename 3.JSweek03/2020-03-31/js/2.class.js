// function Person(){
//     this.name = "珠峰";
//     this.age = 10;
// }
// Person.prototype.constructor = Person;
// Person.prototype.eat = Person;
// Person.prototype.paly = Person;
// Person.qwer = 666;//qwer是Person的静态属性
// var p = new Person();

// console.log(p);


// //class 声明的类  只能通过  new  执行;不能当做普通函数;
// //class:  class 类名 {}



class People{
    constructor(...arg){
        //constructor  就是当前类的函数体
        this.name = "珠峰";
        this.age = 10;
        // console.log(arg);
        
    }
    eat(){
    //在这些位置编写的属性 都是属于当前类的公有属性;
        console.log(this.name);       
    }
    paly(){

    }
    static qwer = 666
}
console.log(People.qwer);
var p2 = new People(1,2,3,4,5)


console.log(p2);

// var a = 1;
// var obj = {
//     a:a,
//     fn(){//这不是箭头函数;
//         console.log(999);
        
//     }
// };
// obj.fn();
// console.log(obj);
// //传统es3/5 创建类的方法
// function Bar(){
//     this.x = 100;
// }
// Bar.prototype.getX = function(){
//     console.log(this.x);
    
// }
// var f1 = new Bar();
// f1.get()

// //也可以把它当做普通函数执行
// Bar();
// //还可以把Bar当做普通的对象设置键值对
// Bar.x = function(){}


class Bar{  //这既不是一个函数的{}, 也不是对象的{};
    constructor(x,y){
        //这个的代码就相当于函数体中的代码;
        //这里面可以新增私有属性
        this.x = x;
        this.y = y;
        var a = 1;
    }
    //在原型上新增方法;  相当于加在原型上的===Bar.prototype.getX...
    getX(){//这不是箭头函数
            console.log("x");
            
    }
    getY(){ 
        console.log("y");
        
    }
    static x =1;//相当于给类新增私有属性
    x=88//这样也相当于给实例新增私有属性
}
console.log(typeof Bar);
//增加公有属性 
Bar.prototype.x = 100;
let b = new Bar(100,200);
b.getY()
// Bar()//=>会报错 class创建的类 只能new 执行
console.log(b);
