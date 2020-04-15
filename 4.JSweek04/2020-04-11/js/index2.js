let cascadeFlowModule = (function () {

    //获取元素并转成数组
    let columns = Array.from(document.querySelectorAll('.column'));
    console.log(columns);
    
    //声明数据为空数组
    let data = [];

    //从服务器获取数据ajax
    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('get', 'json/data.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            }
        }
        xhr.send();
    }
    //实现数据绑定
    let bind = function bind() {
        //循环数据,并且真实的窗口宽度230
        data.map((item, index) => {
            //获取数据中图片真实的宽高度
           let h = item.height,
            w = item.width;
            //真实的渲染高度  高度比高度 = 宽度比宽度
            h = h/(w/230);
            
             //修改数据的宽高
             item.width = 230;
             item.height = h;
             //把数据返回出去
             return item

        })
        //按照三个为一组进行循环
        for(let i =0;i<data.length;i+=3){
            //group:就是每一轮获取的三个数据
            let group = data.slice(i,i+3);
             // 把数据按照渲染的高度进行排序(升序)
            group.sort((a,b)=>{
                return a.height - b.height;
            });
            //把三个列 按照现在的高度进行排序(降序)
            columns.sort((a,b)=>{
                return b.offsetHeight - a.offsetHeight;
            });
            //循环三个数据中的每一项:每循环一项,创建一个card,把创建的card放到对应的列即可
            group.forEach((item,index)=>{
                   // 解构赋值
                let {pic,link,title,height} = item;
                //创建一个div标签
                let card = document.createElement('div');
                //card的样式名字叫card;
                card.className = 'card';
                // /动态拼接到card盒子里
                card.innerHTML = `<a href="${link}">
                <div class="lazyImageBox" style="height:${height}px">
                    <img src="" alt="" data-image="${pic}">
                </div>
                <p>${title}</p>
            </a>`;
                //把card根据索引放到columns中
                columns[index].appendChild(card);
            })
        }
    }


    //延迟加载
    let lazyFunc= function(){
        // 获取所有的lazyImageBoxs(图片)都要进行延迟加载处理
        let lazyImageBoxs = document.querySelectorAll('.lazyImageBox');
        //转换成数组  循环每一项
        [].forEach.call(lazyImageBoxs,lazyImageBox=>{
            //处理过的盒子就不要再处理了作个标记 获取行间属性
            let isLoad = lazyImageBox.getAttribute('isLoad');
            //如果为true 则返回 因为加载还在进行中
            if(isLoad==="true")return;
            //获取图片的距离body上偏移量+图片的二分之一
            let B = utils.offset(lazyImageBox).top+lazyImageBox.offsetHeight/2;
            //获取浏览器地底边距离body顶端的距离
            let A = document.documentElement.clientHeight+document.documentElement.scrollTop;
            if(B<=A){
                lazyImg(lazyImageBox);
            }
        })
    }
//
let lazyImg = function(lazyImageBox){
    let img = lazyImageBox.querySelector('img');
    let dataImage = img.getAttribute('data-image');
    let tempImage = new Image;
    tempImage.src = dataImage;
    tempImage.onload = function(){
        img.src = dataImage;
        utils.css(img,'opacity',1);
    }
    img.removeAttribute('data-image');
    tempImage = null;
    lazyImageBox.setAttribute('isLoad','true');
}
let  isRender;   
let loadMore = function(){
    let HTML = document.documentElement;
    if(HTML.clientHeight*1.5+HTML.scrollTop>=HTML.scrollHeight){
        if(isRender) return;
        isRender = true;
        queryData();
        bind();
        lazyFunc();
        isRender = false;
    }
}

    // 

    // 获取lazyImageBox一半的位置距离BODY顶端的距离
    // 获取浏览器底边距离BODY顶端的距离

    //延迟加载条件:盒子距离body的距离小于浏览器距离body的距离

    //单张加载





    //获取lazyImageBox下的图片

    //获取img的行间属性

    //创建一个图片实例



    //把图片路径给到实例

    //校验路径

    // onload事件触发把 把路径给到真实图片

    //给图片css样式透明度为1

    //把图片的行间属性清除

    //让图片实例为空

    //给当前处理的盒子记录已经处理过的标识  setAttribute设置的自定义属性值都是字符串(即使编写的不是字符串.最后转换为字符串)

    //加载更多数据
    //声明一个变量

    //存储html变量

    ////一屏幕的高度+卷曲高度+半屏高度>=真实高度

    //判断变量是否为false

    //变量为true

    //调用数据

    //绑定数据

    //延迟加载


    //把变量在赋值为false


    return {
        init() {
            queryData();
            bind();
            lazyFunc();
            window.onscroll = function(){
                lazyFunc();
                loadMore()
            }
        }
    }
})();
cascadeFlowModule.init();