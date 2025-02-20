function parseTagArray(tags) {
    // Create a virtual root node
    const root = { type: 'root', children: [] };
    const stack = [root]; // Initialize stack with root node

    for (const tag of tags) {
        const top = stack[stack.length - 1]; // Get the current top of the stack

        if (stack.length > 1 && tag === stack[stack.length - 1].type) {
            // Closing tag: pop the stack
            stack.pop();
        } else {
            // Opening tag: create a new node and add it to the current top's children
            const newNode = { type: tag, children: [] };
            top.children.push(newNode);
            stack.push(newNode); // Push the new node onto the stack
        }
    }
    // Return the children of the virtual root node
    return root.children;
}

// 问题，解析为虚拟dom节点

const input = `<div>
    <h1></h1>
    <input />
</div>`


function parseHtml() {
 
}






