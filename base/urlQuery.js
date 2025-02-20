
function parseQueryParams(url) {
    // 创建一个空对象来存储查询参数
    const params = {};

    // 获取 URL 对象
    const urlObj = new URL(url);

    // 使用 URLSearchParams 来处理查询参数
    const queryParams = new URLSearchParams(urlObj.search);
    
    console.log(urlObj.searchParams)

    // 遍历所有的查询参数并添加到结果对象中
    for (const [key, value] of queryParams.entries()) {
        console.log(value)
        params[key] = decodeURIComponent(value);
    }

    return params;
}

// 示例使用
const url = "https://example.com/page?name=John%20Doe&age=25&city=New%20York";
const queryParameters = parseQueryParams(url);
console.log(queryParameters);