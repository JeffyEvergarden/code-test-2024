import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
function ChildComponent({ text }) {
    return /*#__PURE__*/ _jsx('div', {
        children: text
    })
}
function ParentComponent() {
    return /*#__PURE__*/ _jsxs('div', {
        children: [
      /*#__PURE__*/ _jsx('h1', {
            children: 'Hello, world!'
        }),
      /*#__PURE__*/ _jsx(ChildComponent, {
            text: 'This is a child component'
        })
        ]
    })
}

console.log(ParentComponent())
