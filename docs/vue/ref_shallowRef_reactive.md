# <font color=#9898E5>Vue的ref、shallowRef、reactive的使用！！？🤓</font>

你是一个vue3的初学者，发现vue3中`ref`，`reactive`，`shallowRef`都是用于双向绑定，但不清楚什么时候该用对应的API，实际上你不需要把它们想得太过复杂，因为其实vue3官网已经给大家做了区分。

<CustomLink title='Vue3' desc='渐进式 JavaScript 框架' href='https://cn.vuejs.org/api/reactivity-core.html#ref'/>

在我们公司里，我发现对`ref`和`reactive`混用，沟通后发现认为的使用后差异是`ref`和`reactive`就是差一个`.value`值，如果使用`Obj`，就用`reactive`来绑定，如果是`Number，String`等就用`ref`，而要区分`ref，reactive，shallowRef`其实很简单，按照以下规则使用，保证程序易读性和可编写性都会得到很大提高

只用ref声明响应式变量
只有当第三方库的操作对象需要具备响应性时，才使用shallowRef
只有当使用组合式函数需要命名空间时，才使用reactive

## <font color=#9898E5>一. 只用ref声明响应式变量</font>

::: tip 响应式变量
什么是响应式变量？指的是那些你给它赋值了能引起UI更新的变量
:::

虽然那个`reactive`声明的变量也具备响应性，但是，想要将vue3简单用，你应该选择最简单的方式，因此，无论是对象、数组、数字、字符串、布尔值、HTML引用，你都用`ref`来声明:

- 不推荐的做法👎👎👎：将ref和reactive混着用

```js
const obj = reactive({})
const a = ref([])
const b = ref(1)
```

- 推荐的做法👍👍👍：只用ref声明响应式变量

```js
const obj = ref({})
const num = ref(0)
const str = ref('')
const bool = ref(false)
const nil = ref(null)
const udf = ref()
```

## <font color=#9898E5>二. 只有当第三方库的操作对象需要具备响应性时，才使用shallowRef</font>

::: tip 什么是第三方库的操作对象？
指的是那些不是开发时声明出来的，而是第三方库API创建并暴露出来给你操作的对象。比如Echart初始化之后会产生一个对象，允许你调用其setOption方法来更新图表，这个对象就属于第三方库的操作对象。
:::
通常情况下，对于第三方库的操作对象，是不需要添加响应性的：

```js
let mychart = null
onMounted(()=>{
    mychart = echarts.init(document.getElement('chart'))
})
```

但是在有些场景下，你需要让这个对象具备响应性：比如你需要以props的形式将这个操作对象传递给子组件，并且这个操作对象还可能发生变化，你希望子组件也能跟着变化。
那么这时候你应该只使用`shallowRef`这个API，为这些你不知道底细的第三方库产生的对象提供响应性支持：

```js
let mychart = shallowRef(null)
onMounted(()=>{
    createNewChart()
})

function onClick(){
    createNewChart()
}

function createNewChart(){
  // 销毁旧对象
  if(mychart.value){
      mychart.value.dispose()
  }
  
  // 启用新对象
  mychart.value = echarts.init(document.getElement('chart'))
}
```

- 为什么不能使用`ref`给这些对象提供响应性？因为`ref`和`shallowref`的区别在于，`ref`会遍历整个对象，给对象的每个属性都创建响应性，无论是多深的对象，你给任何一个属性赋值，都会刷新界面。而`shallowref`相反，只有给其`.value`赋值时，才会触发界面刷新。
- 这就导致一些问题，当第三方库的操作对象也在监听内部数据自我更新时，就会产生一种：“`你更新了，我监听到了，我更新；我更新了，你监听到了，你又更新；你又更新了，我监听到了，我又又更新...`”的死循环中，然后导致页面崩溃。
- 所以对于你不知道底细的对象（通常情况下也就只有第三方库会产生），直接使用`shallowref`创建响应性。

## <font color=#9898E5>三. 只有当使用组合式函数需要命名空间时，才使用reactive</font>

::: tip 什么是 组合式函数？
指的是那些将响应式变量封装起来的函数。
官方文档传送门：[组合式函数](https://cn.vuejs.org/guide/reusability/composables#what-is-a-composable)
:::

组合式API最大的优势在于函数级别的复用，这里的函数级别指的就是组合式函数：

```js
// useChart可以到处用
function useChart(el,option){
  let chart = shallowRef(echart.init(el))
  chart.setOption(option);
  return {
    chart
  }
}
```

当同一个组合式函数被多次使用时，你需要做别名：

```js
const {chart:chart2} = useChart(div2,{});
const {chart:chart3} = useChart(div3,{});
```

你也可以给组合式函数套一个命名空间

```js
const chart2 = useChart(div2,{});
const chart3 = useChart(div3,{});
```

但是这样写，你在模板传递参数时，问题就来了，在`template`里传递参数你必须加上`.value`：

```js
<template>
    <!--生效👍-->
    <child-component :chart="chart1.chart.value"></child-component>
    
    <!--无效👎-->
    <child-component :chart="chart1.chart"></child-component>
    
     <!--无效👎-->
    <child-component v-bind="chart1"></child-component>
</template>
```

那你不想加`.value`怎么办？按照vue官网的做法，给函数套一个`reactive`就可以了：

```js
    <!--生效👍-->
    <child-component :chart="chart1.chart"></child-component>
    
     <!--生效👍-->
    <child-component v-bind="chart1"></child-component>
    <child-component v-bind="chart2"></child-component>
    <child-component v-bind="chart3"></child-component>
</template>
<script setup>
const chart1 = reactive(useChart(div1,{}));
const chart2 = reactive(useChart(div2,{}));
const chart3 = reactive(useChart(div3,{}));
</script>
```

所以，当只有你想给响应式函数添加一个命名空间的时候，才使用`reactive`！
其他情况，参照前2个规则进行处理。

## 总结

::: tip 使用

- 为了避免认知混乱，基本上都使用ref进行声明响应式变量。
- 为了避免页面卡死，对于那些你不知道层级结构的数据，使用shallowRef为它创建响应性。
- 除非你是要给组合式函数加一个命名空间然后给组件使用v-bind，否则其他情况下都不建议考虑使用reactive
:::
