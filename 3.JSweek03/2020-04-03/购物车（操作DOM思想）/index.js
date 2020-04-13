let shopModule = (function () {
			let list = document.querySelector('.list'),
				btns = list.querySelectorAll("i"),
				countInps = list.querySelectorAll('em'),
				strongs = list.querySelectorAll('srong');
				priceArr = [],
				subtotalArr = [];
				//在所有的strong 标签中,分出单价和小计的
				[].forEach.call(strongs,(item,index)=>{
					if(index%2===0){
						priceArr.push(item);
					}else{
						subtotalArr.push(item)
					}
				});
				let ems = document.querySelectorAll('.info em'),
					totlaquantity = ems[0],
					totalPrice = ems[1],
					maxPrice  =ems[2];

				//计算总信息
				let computedInfo = function computedInfo(){
					//总数量 && 已购买商品单价集合
					let couns = 0;
					arr = [0];
					[].forEach.call(countInps,(item,index) =>{
						 let n = parseFloat(item.innerHTML);
						 counts +=n;
						 if(n>0){
							arr.push(parseFloat(priceArr[index].innerHTML));
						 }
					});
					totlaquantity.innerHTML = couns;
					maxPrice.innerHTML = Math.max(...arr);
					//总价格
					let total = 0;
					subtotalArr.forEach(item=>{

					})
				};

		//给所有的+/- 绑定事件
		let handle = function handle(){
			[].forEach.call(btns,item=>{
				
			})
		}


	return {
		init() {

		}
	};
})();
shopModule.init();