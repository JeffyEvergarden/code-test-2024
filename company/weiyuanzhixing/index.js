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

const input = `
    <div>
        <h1>
           <h2></h2>
        </h1>
        <input />
    </div>
`

// 字符串 ---> 真实dom -----> vdom
function parseHtml2(text) {
    const dom = document.createElement('div')
    dom.innerHTML = text

    function parse(dom) {
        const str = '123'
        str.toLowerCase()
        const node = {
            name: dom.tagName.toLowerCase(),
            children: []
        }
        let children = []
        Array.prototype.forEach.call(dom.children, element => {
            const vdom = parse(element)
            children.push(vdom)
        })

        node.children = children
        return node
    }

    const node = parse(dom.children[0]);

    return node
}


// 字符串 ---> 正则 列表 -----> vdom

const reg = /\<(\/?)(\w+)(\s+)?(\/)?\>/g
const isTailTag = /\<(\/)/
const tagReg = /\<\/?(\w+)/
const isDirectTag = /\<(\w+)(\s+)?(\/)\>/g


function parseHtml(text) {
    const regs = text.match(reg)
    console.log(regs)
    let root = {
        children: []
    }
    // 匹配上了
    if (regs) {

        let stack = []
        regs.forEach((_text) => {
            let tag = tagReg.exec(_text)[1]
            // 是尾巴节点
            if (isTailTag.test(_text)) {
                let node = stack.pop()
                console.log(_text, tag, node)
                if (node.tag === tag) {
                    let parentNode = stack[stack.length - 1] || root
                    parentNode.children.push(node)
                }
            } else if (isDirectTag.test(_text)) {
                const node = {
                    tag: tag,
                    children: []
                }
                let parentNode = stack[stack.length - 1] || root
                parentNode.children.push(node)

            } else {
                const node = {
                    tag: tag,
                    children: []
                }
                stack.push(node)
            }
        })



    }

    console.log(regs)

    return root.children[0]
}






const html = parseHtml(input);






