function prevAll(node) {
	let prev = node.previousSibling,
		result = [];
	while (prev !== null) {
		if (prev.nodeType === 1) {
			result.unshift(prev);
		}
		prev = prev.previousSibling;
	}
	return result;
}

function nextAll(node) {
	let result = [],
		next = node.nextSibling;
	while (next !== null) {
		next.nodeType === 1 ? result.push(next) : null;
		next = next.nextSibling;
	}
	return result;
}

function siblings(node) {
	return prevAll(node).concat(nextAll(node));
}

function index(node) {
	return prevAll(node).length;
}

// JQ中还有还有一些方法：prev获取上一个哥哥元素节点  next获取下一个弟弟元素节点  prevAll所有哥哥元素节点  nextAll所有弟弟元素节点  index获取它的索引  siblings获取它的兄弟元素节点  children获取所有的元素子节点 ....