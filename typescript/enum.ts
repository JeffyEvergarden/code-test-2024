enum OrderTypeQueryName {
    NAME_ASC = 'name_asc',
    NAME_DESC = 'name_desc',
    MODIFY_TIME_ASC = 'mod_asc',
    MODIFY_TIME_DESC = 'mod_desc',
    SIZE_ASC = 'size_asc',
    SIZE_DESC = 'size_desc',
}

console.log(OrderTypeQueryName)
const val2 = OrderTypeQueryName.MODIFY_TIME_DESC
const temp = Object.entries(OrderTypeQueryName).find(([, v]) => v === val2) || []

console.log(temp)