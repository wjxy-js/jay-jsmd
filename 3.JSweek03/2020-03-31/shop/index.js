//先去获取数据
let ary = [];
function getData(){
    //使用ajax(是用来获取数据的一种技术) 去获取数据
    let xhr = new XMLHttpRequest();//创造ajax实例;
    xhr.open('get','./data.json');//告诉这个实例以一种什么样的方式(get) 去哪里(路径)获取数据
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            //能够进入这个条件中,证明 我们获取数据了
           let   data = JSON.parse(xhr.response);
            console.log(data);
            ary = data;
            // render(ary);
        }
    }
    xhr.send();
    console.log(2);
}
getData();

console.log(1);
//渲染数据
function render(data=[]){
    //负责把给到的数据渲染到页面上
    //把数据中的每一条数据转成带结构的li  然后在放到对应的ul中即可
    // innerHTML
    let str= '';//用来存储拼接的结构(li);
    console.log(data); 
    data.forEach(item=>{
        // console.log(1);
        // console.log(item);    
        str+=`<li>
        <div class="img_box">
            <img src="${item.img}" alt="">
        </div>
        <h2>${item.title}</h2>
        <div class="price_box">
            <span class="price">${item.price}</span>
            <span class="select_icon">多款可选</span>
        </div>
        <ul class="feature_box">
            <li>好使</li>
            <li>限时抢购</li>
        </ul>
        <div class="commit_box">
            <span>${item.num}人好评</span>
            <span>99%好评</span>
        </div>
    </li>`
    })
    let ul = document.querySelector(".phone_list_box");
    // console.log(ul);
        ul.innerHTML = str;    
}
console.log(ary);

// setTimeout(()=>{
//         console.log(ary);
        
// },1000)
//点击排序
let time = document.getElementsByClassName("sort_btn")[1];
time.onclick = function(){
    //把数据按照时间进行排序  然后在执行函数reder函数
    let temp = ary.sort((a,b)=>{
        console.log(ary);       
        return a.time - b.time;
    })
    render(temp);
    console.log(ary);    
}
console.log(ary);
