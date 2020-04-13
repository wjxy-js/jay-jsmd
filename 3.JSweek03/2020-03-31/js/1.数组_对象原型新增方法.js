//  let ary = [100,200,300,400,500];
//  let res = ary.reduce((prev,next)=>{
//      console.log(prev,next);
     
//  })
//  let ary3 = [10,20,30];
//  let res1 = ary3.reduce((prev,next)=>{
//     //  debugger;
//      return prev+next;
//  },1000)
//  console.log(res1);
 
Object.is(1,1);
 //类似与===   1===1 ; 特点就是可以用来比较NaN  具体区分了 +0 和 -0;
Object.is(+0,-0);//false
Object.assign(obj1,obj2) //是把obj2 合并到obj1中;返回值是合并后的obj1;
Object.keys() ;//把obj中的所有的属性名组成一个新的数组
Object.values()//把obj中的所有属性值组成一个新的数组
Object.freeze()//obj 和obj2 是同一个地址;被冻住的对象不能进行任何操作;