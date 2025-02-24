// 一个函数 输入0 返回 1， 输入1返回0 
//  说说你知道的方法
//  1、三元表达式
//  2、map 映射
//  3、if else
//  4、 数组索引
//  5、 异或
//  6、对象映射
// 一直还有吗？？？？


let getValue = (val) => {
    return val ^ 1
}
console.log(
    getValue(1)
    ,
    getValue(0)
)