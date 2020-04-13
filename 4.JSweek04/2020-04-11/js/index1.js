let cascadeFlowModule = (function () {

    // 获取元素并转成数组
    let columns = Array.from(document.querySelectorAll('.column')),
        //声明数据为空数组
        data = [];
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
        // console.log(data);
    }


    //实现数据绑定
    let bindHTML = function bindHTML() {
        //循环数据,并且真实的窗口宽度是230
        data = data.map(item => {
            //获取数据中图片真实的宽高度
            let w = item.width,
                h = item.height;
            //真实的渲染高度 高度比高度=宽度比宽度
            h = h / (w / 230);
            // 修改数据的宽高
            item.width = 230;
            item.height = h;
            return item;
        })
        //按照三个为一组进行循环
        for (let i = 0; i < data.length; i += 3) {
            //group;就是每一轮获取的三个数据,把数据按照渲染的高度进行排序(升序)
            let group = data.slice(i, i + 3);
            console.log(group);

            group.sort((a, b) => {
                return a.height - b.height;
            });
            //把三个列 按照现在的高度进行排序(降序)
            columns.sort((a, b) => {
                return b.offsetHeight - a.offsetHeight;
            });
            //循环三个数据中的每一项:每循环一项,创建一个card,把创建的card放到对应的列即可
            group.forEach((item, index) => {
                // 解构赋值
                let { pic, link, title, height } = item;
                //创建一个div标签
                let card = document.createElement('div');
                //card的样式名字叫card;
                card.className = "card";
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
    let lazyFunc = function lazyFunc() {
        // 所有的lazyImageBoxs(图片)都要进行延迟加载处理
        let lazyImageBoxs = document.querySelectorAll(".lazyImageBox");
        //转换成数组 循环每一项
        [].forEach.call(lazyImageBoxs, lazyImageBox => {
            //处理过的盒子就不要再处理了 获取行间属性
            let isLoad = lazyImageBox.getAttribute('isLoad');
            //如果为true 则返回
            if (isLoad === "true") return;
            // 获取lazyImageBox一半的位置距离BODY顶端的距离
            // 获取浏览器底边距离BODY顶端的距离
            let B = utils.offset(lazyImageBox).top + lazyImageBox.offsetHeight / 2;
            let A = document.documentElement.clientHeight +
                document.documentElement.scrollTop;
            // 延迟加载的条件：盒子距离BODY的距离小于浏览器距离BODY的距离
            if (B <= A) {
                // 单张加载处理
                lazyImg(lazyImageBox);
            }
        })

    }
    //
    let lazyImg = function lazyImg(lazyImageBox) {
        //获取图片
        let img = lazyImageBox.querySelector('img'),
            //获取图片的行间属性
            dataImage = img.getAttribute('data-image'),
            //创建一个容器 ==createElement
            tempImage = new Image;
        tempImage.src = dataImage;
        tempImage.onload = function () {
            img.src = dataImage;
            utils.css(img, 'opacity', 1);
        }
        img.removeAttribute('data-image');
        tempImage = null;
        // 给当前处理的盒子记录已经处理过的标识  setAttribute设置的自定义属性值都是字符串（即使编写的不是字符串，最后转换为字符串）
        lazyImageBox.setAttribute('isLoad', 'true');

    }
    //加载更多数据
    let isRender;
    let loadMoreData = function loadMoreData() {
        //一屏幕的高度+卷去的高度+半屏幕的高度>=真实高度
        //滚动到底部了
        let HTML = document.documentElement;
        if (HTML.clientHeight * 1.5 + HTML.scrollTop >= HTML.scrollHeight) {
            if (isRendber) return;
            isRender = true;
            queryData();
            bindHTML();
            lazyFunc();
            isRender = false;
        }
    }
    return {
        init() {
            queryData();
            bindHTML();
            lazyFunc();
            window.onscroll = function () {
                //现有图片的延迟加载
                lazyFunc();
                //加载更多数据
                loadMoreData();
            }
        }
    }
})();
cascadeFlowModule.init();