var levelOrderBottom = function(root) {

    if(!root) {
        return []
    }

    let target = [];
    let curList = [root];
    let nextList = [];

    while(curList.length) {
       let node = curList.shift();
       target.push(node.val);
       node.left && nextList.push(node.left);
       node.right &&  nextList.push(node.right);
       
       if (curList.length === 0) {
         target.unshift(nextList);

         curList = nextList
       }
    }

    return target;
};