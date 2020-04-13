let cascadeFlowModule = (function () {

    //获取元素并转成数组
    let columns = Array.from(document.querySelectorAll(".column")),
        //声明数据为空数组
        data = [];
        console.log(columns);
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
    let bindHTML = function bindHTML() {
        //循环数据,并且真实的窗口宽度230
        data = data.map(item => {
            //获取数据中图片真实的宽高度
            let w = item.width,
                h = item.heigth;
            //真实的渲染高度  高度比高度 = 宽度比宽度
            h = h / (w / 230);
            //x修改数据的宽高
            item.width = 230;
            item.heigth = h;
            //把数据返回出去
            return item;

        })
        //按照三个为一组进行循环
        for (let i = 0; i < data.length; i += 3) {
            //group:就是每一轮获取的三个数据
            let group = data.slice(i, i + 3);
            // 把数据按照渲染的高度进行排序(升序)
            group.sort((a, b) => {
                return a.heigth - b.heigth;
            });
            //把三个列 按照现在的高度进行排序(降序)
            columns.sort((a, b) => {
                return b.offsetHeight - a.offsetHeight;
            });
            //循环三个数据中的每一项:每循环一项,创建一个card,把创建的card放到对应的列即可
            group.forEach((item, index) => {
                // 解构赋值
                let {
                    pic, title, link, height
                } = item;
                //创建一个div标签
                let card = document.createElement('div');
                //card的样式名字叫card;
                card.className = 'card';
                //动态拼接到card盒子里
                card.innerHTML = `<a href="${link}">
                      <div class="lazyImageBox" style="height:${height}px">
                          <img src="" alt="" data-image="${pic}">
                      </div>
                      <p>${title}</p>
                  </a>`;
                   //把card根据索引放到colums中
                   columns[index].appendChild(card);
            })
        }
    }
    //延迟加载
    let lazayFunc = function lazayFunc(){
        // 所有的lazyImageBoxs(图片)都要进行延迟加载处理
        //获取lazyImageBox
        let lazyImageBoxs = document.querySelectorAll(".lazyImageBox");
        //转换成数组  循环每一项
        [].forEach.call(lazyImageBoxs,lazyImageBox=>{
              //处理过的盒子就不要再处理了 获取行间属性
                let isLoad = lazyImageBox.getAttribute('isLoad');
                // //如果为true 则返回 因为加载还在进行中
                if (isLoad === "true") return;
                // 获取lazyImageBox一半的位置距离BODY顶端的距离
            // 获取浏览器底边距离BODY顶端的距离
            let B  = utils.offset(lazyImageBox).top + lazyImageBox.offsetHeight / 2;
            let 
        })

    }
    return {
        init() {
            queryData();
            bindHTML();
        }
    }
})();
cascadeFlowModule.init();