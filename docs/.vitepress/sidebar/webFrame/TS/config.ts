export default [
    {
        text: "基础用法",
        collapsed: false,
        items: [
            {
                text: "TypeScript的基础使用",
                link: "/ts/base",
            },
            {
                text: "函数重载",
                link: "/ts/overload",
            },
        ],
    },
];
interface DataType {
  name: string;
  age: string;
}
function getData(ID: string | string[]): DataType | DataType[] {
  let data;
  if (Array.isArray(ID)) {
    //判断参数如果是数组， 说明是获取多个用户的数据， 于是返回 DataType []
    return data as DataType[];
  } else {
    return data as DataType; //判断参数是单个字符串， 说明是获取一个用户的数据， 于是返回 DataType
  }
}
const userData =<DataType[ ]>;