

/* 写代码第一件事情就是想到闭包 保护作用 */
(function () {

    //获取需要的DOM元素
    let navList = document.querySelectorAll(".nav-item"),
      productBox = document.querySelector('.productBox'),
      cardList = null,
      data = null;
    console.log(navList, productBox);
    //从服务器获取数据(AJAX)
    //从服务期获取的结果是JSON格式的字符串(我们需要把其处理为对象再操作)
    //=>用live server来预览
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'json/product.json', false);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status == 200) {
        data = JSON.parse(xhr.responseText)
  
      }
    }
    xhr.send(null);
    console.log(data);
  
  
    //数据绑定
    //我们从服务器获取的数据是一个数组,数组中有多少项,证明有多少个产品,此时我们创建多少个CARD盒子(展示不同的产品信息),最好把所有创建阿訇的card放到容器中即可
    let str = ``;//=>ES6的模板字符串
    for (let i = 0; i < data.length; i++) {
      let item = data[i];//item 是获取的每一个产品对象
      // console.log(item);
      let {
        id,
        title,
        price,
        time,
        hot,
        img
      } = item;
      //${}是在es6的模板字符串拼接一个js表达式(执行有结果的js语句)的结果
      //结构中写的data-xxx 一般都是设置自定义属性
      str += `<div class="card"  data-price="${price}" data-time="${time}" data-hot='${hot}'>
          <img src="${img}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${title}
          </h5>
            <p class="card-text">价格:${price.toFixed(2)}</p>
            <p class="card-text">销量:${hot}</p>
            <p class="card-text">时间:${time}</p>
            <a href="#" class="btn btn-primary">立即购买</a>
          </div>
        </div>`
    }
    // console.log(str);
    productBox.innerHTML = str;
    //数据绑定完,获取到页面中创建的10个card盒子(cardList:存储的是card的元素对象,它是一个节点集合)
    cardList = productBox.querySelectorAll('.card');
    // console.log(cardList);
  
  
    //循环事件绑定;点击每一个li按照对象的标识进行升降序排序
    for (let i = 0; i < navList.length; i++) {
      let item = navList[i];
      //给每一个li设置自定义属性flag:存储自己升降序的标识   
      item.flag = -1;
      item.onclick = function () {   
        let arr = Array.from(cardList);
        //控制'其它按钮'的升降序标识回归-1;
        for(let z= 0;z<navList.length;z++){
          console.log(this);   
          if(navList[z] != this){
            console.log(this);
            
            navList[z].flag = -1;
          }
        }
        this.flag *= -1;//=>控制升降序
        let char = "data-price"//=>控制排序的维度标识
        i===1? char = 'data-time':null;
        i===2? char = 'data-hot':null;
        arr.sort((a, b) => {
          a = a.getAttribute(char);
          b = b.getAttribute(char);
          if(char==='data-time'){
            //如果是日期排序,需要去掉中杠
            a = a.replace(/-/g, '');
            b = b.replace(/-/g, '');
          }  
          
          return (a - b) * this.flag;
          
        })
        flag = -1;
  
  
        for (let j = 0; j < arr.length; j++) {
          //appenChild :把元素加到容器末尾;
          productBox.appendChild(arr[j]);
        }
      }
    
    }
  
    
  
  
  
  
  
  
  
  
  
  //==================================第二种方法
  
    // //点击价格按照价格排序
    // //navList[0] 集合中的第一项就是价格这个按钮
    // let flag = -1;
    // navList[0].onclick = function () {
    //   flag *= -1;
    //   //先把类数组集合变为数组(目的一会用srot)
    //   // let arr = [...cardList];
    //   let arr = Array.from(cardList);
    //   // let arr = Array.prototype.splice(cardList,0);
    //   console.log(arr);
    //   //需求在循环数据绑定的时候,我们可以知道每一个产品的价格/销量/日期等数据,但是此时我们是想在点击按钮的时候,也拿到这个值,只有拿到这些值才能进行比较=> 之前的一些信息,需要在后续的某个操作中使用,此时我们可以在之前把信息存储到当前元素的'自定义属性上',后续需要的时候直接从自定义属性中获取即可;
    //   arr.sort((a, b) => {
    //     return (a.getAttribute('data-price') - b.getAttribute('data-price')) * flag;
    //   });
    //   console.log(arr);
    //   //光数组排完序还是不够的,我们需要按照最新的顺序,把每一个card放到页面中
    //   for (let i = 0; i < arr.length; i++) {
    //     //appenChild :把元素加到容器末尾;
    //     productBox.appendChild(arr[i]);
    //   }
    // }
  
  
    // //点击时间的升降序排列
    // navList[1].flag = -1;//=>把当前按照日期进行升降序的标识,不是创建一个变量,而是给当前按钮的自定义属性(好处:每一个按钮都可以设置自己独有的升降序标识)
    // navList[1].onclick = function () {
    //   this.flag *= -1;
    //   let arr = Array.from(cardList);
    //   arr.sort((a, b) => {
    //     a = a.getAttribute('data-time');
    //     b = b.getAttribute('data-time');
    //     a = a.replace(/-/g, '');
    //     b = b.replace(/-/g, '');
    //     return (a - b) * this.flag;
    //   });
    //   console.log(arr);
    //   for (let i = 0; i < arr.length; i++) {
    //     productBox.appendChild(arr[i])
    //   }
    // }
  
  
  
  
  
  })()
  /*
   * 自定义属性的两种处理方案：
   *    1.给元素对象堆内存中设置一个属性
   *      body['zhufeng']=xxx
   *      body.zhufeng=xxx
   *      =>
   *      body.zhufeng
   *      [按照对象键值对操作完成]
   *    2.setAttribute和getAttribute
   *      把自定义属性放到元素的结构上（属性值都会变为字符串）
   *      body.setAttribute('zhufeng',xxx);
   *      body.getAttribute('zhufeng');
   * 两种方式不能混淆
   */
  // let body = document.body;
  // console.log(body.zhufeng); //=>undefined
  // console.log(body.getAttribute('zhufeng')); //=>'xxx'
  