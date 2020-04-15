var pblModule = (function () {
    //获取所有的列
    let $columns = $('.column');
    let flag = true;
    let timer = null;
    let count = 0;
    //从后台获取数据
    let getData = function () {
        $.ajax({
            url: './json/data.json',
            method: 'get',//jq默认是get
            // async:false,//同步
            success: function (data) {//data 就是从后台获取的数据
                // console.log(data);
                render(data);
                count++;
                console.log(count);
                lazyLoadImg()
                flag = true;//当新数据重新渲染完成之后 才能再次让flag为true;
            }
        })
    }
    //获取完数据之后  渲染数据
    let render = function (data = []) {
        // console.log(data);
        data.forEach((item, index) => {
            //item代表数组中的每一项
            //230/item.width = h/item.height;
            let h = (230 * item.height) / item.width;
            let str = `<div class="card">
            <a href="${item.link}">
                <div class="lazyImageBox" style='height:${h}px'>
                    <img src="" alt="" data-image = "${item.pic}">
                </div>
                <p>${item.title}</p>
            </a>
        </div> `
            //columns 一个三个元素  n 只能是012
            // index
            // let n = index % 3;
            // $columns.eq(n).append(str);
            //以上的这种方式填充  有可能导致最后会出现明显的长短不一;
            // 我们采用方式 每次填充时都去查找最短的那个columns
            // console.log([...$columns]);
            let el = [...$columns].sort((a, b) => {
                return a.offsetHeight - b.offsetHeight;
            })[0];//sort 的结果 是拍好序的数组  数组张第一项才是最矮的那个
            $(el).append(str);
        });
    }
    let lazyLoadImg = function () {
        // console.log(111);    
        let $imgs = $('.container img');
        //T 用来存储卷曲高度 加上页面的高度  其实就是页面底边的那块内容距离body顶部
        let $window = $(window);//把原生对象转成jq对象
        //$window.outerHeight()  获取的是一屏幕高度
        //$window.scrollTop()  获取的是卷曲的高度
        let T = $window.outerHeight() + $window.scrollTop();
        [...$imgs].forEach((item, index) => {
            //item 每一个图片  原生dom
            let $item = $(item);
            if ($item.css('opacity') == 1) return;//说明图片已经加载过了
            let H = $item.offset().top;//获取的是图片顶边到body顶边的偏移量
            if (H < T) {
                //证明图片的顶边已经露出来了
                let src = $item.attr('data-image')//获取真实图片地址
                $item.attr('src', src);//把真实图片的地址赋给img的src的属性;
                $item.on('load', function () {
                    //代表图片已经加载完成
                    $item.css('opacity', 1);
                })
            }

        })

    }
    let loadMore = function () {
        let $window = $(window);


        let T = $window.outerHeight() + $window.scrollTop();//可视窗口底边到body顶边的距离
        let el = $columns.sort((a, b) => {
            return a.offsetHeight - b.offsetHeight
        })[0];
        // console.log(el);

        let $el = $(el);
        //最短的这个元素的底边到body顶边的距离
        let H = $el.offset().top + $el.outerHeight();
        if (H < T) {
            if (count > 2) {
                alert('666')
                return;
            }
            //证明最短的columns 已经底边露出来了
            //从新加载新数据
            // if(!flag)return;
            // flag = false;
            clearTimeout(timer);
            timer = setTimeout(() => {
                getData();

            })

        }
    }
    return {
        init() {
            getData();
            window.onscroll = function () {
                //当页面滚动时  执行页面懒加载
                loadMore()
                lazyLoadImg();

            }
        }
    }
})();
pblModule.init();