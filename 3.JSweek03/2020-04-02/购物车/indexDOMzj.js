(function fn() {
    //先获取元素
    let ul = document.getElementsByClassName("list")
    // console.log(ul);
    // let emss = document.getElementsByTagName("em")
    
    // let strong = ul.getElementsByTagName("strong");
    let list = document.getElementsByTagName("li");
    let span = document.querySelectorAll(".list span")
    // console.log(span);
    
    let info = document.getElementsByClassName("info")[0];
    let spans = info.getElementsByTagName("span");
    // console.log(spans);
    let emNum = spans[0].children;
    let emMoeny = spans[1].children;
    let emMax = spans[2].children[0];
    console.log(emMax);
    
    // console.log(emnum,emmoeny,emmax);  
    for (let i = 0; i < list.length; i++) {
        let cur = list[i];
        let span = cur.getElementsByTagName("span")[0];
        let strong = cur.getElementsByTagName("strong");
        let removei = list[i].children[0];
        let addi = list[i].children[2];
        let strongone = document.getElementsByTagName("strong");
        let em = cur.getElementsByTagName("em")[0];
        addi.onclick = function () {
            em.innerHTML = Number(em.innerHTML) + 1;     
            strong[1].innerHTML = parseFloat(strong[0].innerHTML) * em.innerHTML + "元"
            all()
            money()
            max();
        }
        removei.onclick = function () {
            val = Number(em.innerHTML) - 1
            if (val >= 0) {
                em.innerHTML = val;
                strong[1].innerHTML = parseFloat(strong[0].innerHTML) * em.innerHTML + "元"
                console.log(strong[1].innerHTML);
            }
            remove();
            money()
            max();
        }
    }
    //商品合计
    var num = 0;
    function all() {
        num++;
        emNum[0].innerHTML = num;
    }
    function remove() {
        num--;
        emNum[0].innerHTML = num;
    }  
    function money() {
        let strong = document.querySelectorAll('.xiaoji');
        let ems = info.querySelectorAll('em');     
        let val = 0;
         for(let i = 0;i<strong.length;i++){
                val+=parseFloat(strong[i].innerHTML);
         } 
         ems[1].innerHTML = val;
    }
   
    // var ary = [];
    function max(){
        let emss = document.querySelectorAll(".list em");
      
        
        let ary = [];
        for(let i =0;i<emss.length;i++ ){
         
            ary[i] = 0;
                if(emss[i].innerHTML>0){
                    ary[i] = parseFloat(span[i].children[0].innerHTML);
                    // console.log(ary[i]);
                    
                    
                }
        }
        emMax.innerHTML = (Math.max (...ary));
                    console.log(emMax.innerHTML);
       
    }
    console.log();









})()