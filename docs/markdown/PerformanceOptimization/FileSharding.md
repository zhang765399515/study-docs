# 文件分片

项目中经常需要对文件进行分片，比如上传大文件时，需要对文件进行分片，然后再上传。

## 手写 input 分片

我们先写一个简单的 input 框

```html
<input type="file" id="file" />
```

然后我们写一个 js 函数，用来处理 input 框的 `change` 事件。

```js main.js

const inputFile = document.querySelector('input[type="file"]'); // 获取input框
inputFile.onchange = async(e) {
    const file = e.target.files[0]; // 获取文件
    console.time('分片耗时'); // 开始计时
    const chunks = await cutFile(file); // 分片
    console.timeEnd('分片耗时'); // 结束计时
    console.log(chunks); // 打印分片结果
}
```

**注意**

这里是一个 `io 操作`，需要通过异步的方式来处理。

<CustomLink title='《什么是io操作？》'  href='/markdown/interview/js/IO.html'/>

这里的 console.log 主要是用来做一个 `分片计时` 的,如果处理大文件，是需要优化分片时间的。

然后我们写一个 cutFile.js 函数，用来分片文件。

```js
import { createChunk } from "./createChunk.js"; // 导入createChunk函数，用来创建分片

const CHUNK_SIZE = 1024 * 1024 * 5; // 分片大小 5M

export async function cutFile(file) {
    const chunkCount = Math.ceil(file.size / CHUNK_SIZE); // 计算分片数量
    const result = [];
    for (let i = 0; i < chunkCount; i++) {
        // 循环创建分片
        const chunk = await createChunk(file, i, CHUNK_SIZE); // 创建分片
        result.push(chunk); // 将分片添加到数组中
    }
    return result;
}
```

再写一个具体分片的函数 createChunk.js

```js
import SpeakMd5 from "speak-md5"; // 导入SpeakMd5函数，用来计算文件的md5值
export async function createChunk(file, index, CHUNK_SIZE) {
    return new Promise((resolve, reject) => {
        const start = index * CHUNK_SIZE; // 计算分片的起始位置
        const end = start + CHUNK_SIZE; // 计算分片的结束位置
        const spark = new SpeakMd5.ArrayBuffer(); // 创建一个SpeakMd5对象，用来计算文件的md5值
        const fileReader = new FileReader(); // 创建一个FileReader对象，用来读取文件
        const blob = file.slice(start, end); // 截取文件的一部分
        fileReader.onload = (e) => {
            spark.append(e.target.result); // 将文件的一部分添加到SpeakMd5对象中
            resolve({
                // 返回分片的信息
                start, // 分片的起始位置
                end, // 分片的结束位置
                index, // 分片的索引
                hash: spark.end(), // 分片的md5值
                blob, // 分片的内容
            });
        };
    });
    fileReader.readAsArrayBuffer(blob); // 读取文件的一部分
}
```

-   这里有一个重点，我们最后需要使用 `fileReader.readAsArrayBuffer(blob)` 来读取文件的一部分，因为我们需要将文件的一部分作为一个`二进制数组`来处理。

其中`speak-md5`库是用来处理 **hash** 值。

这里就完成了整体的文件分片操作，但是存在一个很大的问题，如果这里上传的大文件，可能需要大量的时间来处理分片信息，主要原因是通过 `spark.end`生成 hash 值十分耗时。

所以我们需要优化这个函数，让它能够更快的处理分片信息。

## 使用多线程来进行生成 hash 值

我们可以使用多线程来进行生成 hash 值，这样可以提高生成 hash 值的速度。

那我们现在在 **cutFile.js** 文件中修改代码

```js
const CHUNK_SIZE = 1024 * 1024 * 5; // 分片大小 5M
const THREAD_COUNT = navigator.hardwareConcurrency || 4; //获取电脑线程数量
export async function cutFile(file) {
    return new Promise((resolve, reject) => {
        const chunkCount = Math.ceil(file.size / CHUNK_SIZE); // 计算分片数量
        const threadChunkCount = math.ceil(chunkCount / THREAD_COUNT); // 计算每个线程需要处理的分片数量
        const result = [];
        let finishCount = 0; //完成得线程数量
        for (let i = 0; i < THREAD_COUNT; i++) {
            const worker = new Worker("./createChunk.js", {
                type: "module",
            }); // 创建一个worker线程
            worker.postMessage({
                // 向worker线程发送消息
                file, // 文件
                start: i * threadChunkCount, // 分片的起始位置
                end: Math.min((i + 1) * threadChunkCount, chunkCount), // 分片的结束位置
                CHUNK_SIZE, // 分片的大小
            });
            worker.onmessage = (e) => {
                worker.terminate(); // 终止worker线程
                result[i](e.data);
                finishCount++;
                if (finishCount === THREAD_COUNT) {
                    resolve(result.flat()); // 解决promise对象
                }
            };
        }
        return result;
    });
}
```

再新增一个 **worker.js** 文件来处理多线程得分片信息。

```js
import { createChunk } from "./createChunk.js"; // 导入createChunk函数，用来创建分片

onmessage = async e=>{
    const { file, start, end, CHUNK_SIZE } = e.data; // 获取消息
    cons result = []; // 分片结果
    for (let i = start; i < end; i++) {
        // 循环创建分片
        const chunk = await createChunk(file, i, CHUNK_SIZE); // 创建分片
        result.push(chunk); // 将分片添加到数组中
    }
    const chunks = await Promise.all(result); // 等待所有分片创建完成
    postMessage(chunks); // 向主线程发送消息
}
```

OK,完整的代码就是这些了。

## 参考文献

<CustomLink title='《大文件分片》'  href='https://www.bilibili.com/video/BV1C2EkzdE9Y/?spm_id_from=333.1007.top_right_bar_window_history.content.click&vd_source=1507904f3d99936ee5fec8816d7ac160'/>