/* 基于单例模式实现业务板块的开发 */
let shopModule = (function () {
  let navList = document.querySelectorAll(".nav-item"),
    productBox = document.querySelector('.productBox'),
    cardList = null,
    data = null;

  //queryData :从服务期获取数据
  let queryData = function queryData() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'json/product.json', false);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        data = JSON.parse(xhr.responseText)

      }
    }
    xhr.send(null);
  };
  //bindHTML 完成数据绑定
  let bindHTML = function () {
    let str = ``;//=>ES6的模板字符串
    data.forEach(item => {
      let {
        id,
        title,
        price,
        time,
        hot,
        img
      } = item;
    
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
    });
    productBox.innerHTML = str;
    cardList = productBox.querySelectorAll('.card');
  }
  //clear :控制当前点击li以外的,升降序标识都回归-1;
  let clear = function clear(){
    //this:当前点击的这个LI
    [].forEach.call(navList,item =>{
      if(item !==this){
        item.flag = -1;
      }
    });
  };
  //sortCard 排序
  let sortCard = function(i){
    let arr = Array.from(cardList);
    // this.flag *= -1;//=>控制升降序
    let char = "data-price"//=>控制排序的维度标识
    i === 1 ? char = 'data-time' : null;
    i === 2 ? char = 'data-hot' : null;
    arr.sort((a, b) => {
      a = a.getAttribute(char);
      b = b.getAttribute(char);
      if (char === 'data-time') {
        //如果是日期排序,需要去掉中杠
        a = a.replace(/-/g, '');
        b = b.replace(/-/g, '');
      }
      return (a - b) * this.flag;
    });
    for (let j = 0; j < arr.length; j++) {
      //appenChild :把元素加到容器末尾;
      productBox.appendChild(arr[j]);
    }
  };
  // handleNav :按钮的循环事件绑定
  let  handleNav = function handleNav(){
    [].forEach.call(navList,(item,index )=>{
      item.flag = -1;
      item.onclick = function () {
        //this 当前点击的li
        clear.call(this);
        this.flag*=-1;
        sortCard.call(this,index);
      }
    }); 
    };

  return {
    init() {//=>init:function(){}普通函数不是箭头函数(es6中,如果对象的属性是一个函数,则可以这样简写)
        queryData();
        bindHTML();
        handleNav();

    }
  }
})();
shopModule.init();







