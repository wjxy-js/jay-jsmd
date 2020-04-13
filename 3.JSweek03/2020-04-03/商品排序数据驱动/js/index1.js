let shopModule = (function(){
//获取所有的li
let navList = document.querySelectorAll(".navbar .nav-item");
//获取下面渲染的盒子
let prodctBox = document.querySelector(".productBox");
data = null;
//ajax
let queryData = function queryData(){
    let xhr = new XMLHttpRequest();
    xhr.open('get','json/product.json',false)
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status ===200){
            data = JSON.parse(xhr.responseText);
        }
    }
    xhr.send(null);
    console.log(data);
    
}

//根据获取到的数据,把产品信息渲染到页面中
let render = function render(){
    let str = '';
    data.forEach(item=>{
        let {
            title,price,time,hot,img
        } = item;
        str +=`<div class="card">
        <img src="${img}" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">价格：￥${price.toFixed(2)}</p>
            <p class="card-text">销量：${hot}</p>
            <p class="card-text">时间：${time.replace(/-/g, '/')}</p>  
        </div>
    </div> `
    })
    prodctBox.innerHTML = str;
}
//循环所有的li,绑定点击事件
let handle = function handle(){
    Array.from(navList).forEach((item)=>{
        //给每一个li设置自定义属性flag
        item.flag = -1;
        item.onclick = function(){
            this.flag *=-1;
            let pai = this.getAttribute('data-pai');
            data.sort((a,b)=>{
                // a = String(a[pai]).replace(/-/g,'');
                // b = String(b[pai]).replace(/-/g,'');
                return (a-b) *this.flag;
            });
            render();
        }
    })
}


    return {
        init() {
            queryData();
            render();
            handle();
        }
    }
})();
shopModule.init();