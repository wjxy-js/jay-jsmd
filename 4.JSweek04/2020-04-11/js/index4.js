let pblModule = (function () {
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
    let bind = function () {
        data = data.map(item => {
            let w = item.width;
            let h = item.height;
            h = h/(w/230);
            item.width = 230;
            item.height = h;
            return item;
        })
        for(let i = 0;i<data.length;i+=3){
            let group = data.slice(i,i+3);
            group.sort((a,b)=>{
                return a.height - b.height;
            });
            columns.sort((a,b)=>{
                return b.offsetHeight - a.offsetHeight;
            });
            group.forEach((item,index)=>{
                let {pic,title,link,height} = item;
                let card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `<a href="${link}">
                <div class ="lazyImageBox" style="height:${height}">
                    <img src="" alt="" data-image="${pic}">
                </div>
                <p>${title}</p>
            </a>`;
                columns[index].appendChild(card);
            })
        }
    }
    //
    let lazyImage = function(){
        let lazyImageBoxs = document.querySelectorAll(".lazyImageBox");
            [].forEach.call(lazyImageBoxs,lazyImageBox=>{
                let isLoad = lazyImageBox.getAttribute('isLoad');
                if(isLoad==="true") return;
                let B = utils.offset(lazyImageBox).top + lazyImageBox.offsetHeight/2;
                let A = document.documentElement.clientHeight+document.documentElement.scrollTop;
                if(B<=A){
                    lazyImg(lazyImageBox)
                }
            })
    }
    let lazyImg = function(lazyImageBox){
        let img = lazyImageBox.querySelector('img');
        let dataImage = img.getAttribute("data-image");
        let tempImage = new Image;
        tempImage.src = dataImage;
        tempImage.onload = function(){
            img.src = dataImage;
            utils.css(img,'opacity',1);

        }
        img.removeAttribute("data-image");
        tempImage = null;
        lazyImageBox.setAttribute("isLoad","true")
    }
    let isRender;
    let loadMore = function(){
        let HTML = document.documentElement;
        if(HTML.clientHeight*1.5+HTML.scrollTop>=HTML.offsetHeight){
            if(isRender) return;
            isRender = true;
            queryData();
            bind();
            lazyImage()
            isRender = false;
        }
    }
    return {
        init() {
            queryData();
            bind();
            lazyImage();
            window.onscroll = function(){
                lazyImage();
                loadMore();            
            }
        }
    }
})()
pblModule.init();