let pulModule = (function () {


    let columns = Array.from(document.querySelectorAll('.column')),
        data = [];


    let queryData = function () {
        let xhr = new XMLHttpRequest;
        xhr.open('get', 'json/data.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            }
        }
        xhr.send();
    }
    let bind = function () {
        data = data.map(item => {
            let w = item.width;
            let h = item.height;
            h = h / (w / 230);
            item.width = 230;
            item.height = h;
            return item;
        })
        for (let i = 0; i < data.length; i += 3) {
            let group = data.slice(i, i + 3);
            group.forEach((a, b) => {
                return a.height - b.height
            });
            columns.forEach((a, b) => {
                return b.offsetHeight - a.offsetHeight;
            });
            group.forEach((item, index) => {
                let { pic, title, height, link } = item;
                let card = document.createElement("div");
                card.className = 'card';
                card.innerHTML = `<a href="${link}">
                <div class ="lazyImageBox" style="height:${height}">
                    <img src="" alt="" data-image="${pic}">
                </div>
                <p>${title}</p>
            </a>`;
                columns[index].appendChild(card);

            });

        }
    }
    let lazyFunc = function () {
        let lazyImageBoxs = document.querySelectorAll('.lazyImageBox');
      
       
        [].forEach.call(lazyImageBoxs, lazyImageBox => {
            let isLoad = lazyImageBox.getAttribute('data-image');
            if (isLoad === "true") return;
            let B = utils.offset(lazyImageBox).top + lazyImageBox.offsetHeight / 2;
            let A = document.documentElement.clientHeight + document.documentElement.scrollTop;
            if (B <= A) {
                lazyImg(lazyImageBox)
            }
        })
    }
    let lazyImg = function (lazyImageBox) {
        let img = lazyImageBox.querySelector("img");
        let dataImage = img.getAttribute('data-image');
        let tempImage = new Image;
        tempImage.src = dataImage;
        tempImage.onload = function () {
            img.src = dataImage;
            utils.css(img,'opacity', 1)
        }
        tempImage = null;
        lazyImageBox.setAttribute('isLoad', true);
    }
    let isRender;
    let loadMore = function () {
        let HTML = document.documentElement;
        if (HTML.clientHeight * 1.5 + HTML.scrollTop >= HTML.offsetHeight) {
            if (isRender) return;
            isRender = true;
            queryData();
            bind();
            lazyFunc();
            isRender = false;
        }
    }
    return {
        init() {
            queryData();
            bind();
            lazyFunc()
            window.onscroll = function () {
                lazyFunc();
                loadMore()
            }
        }
    }
})();
pulModule.init();
