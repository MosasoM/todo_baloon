import Vue from 'vue'
import wrapper from "./components/page_wrapper.vue"
Vue.config.productionTip = false

let testdata = [
  {
    importance: 2,
    name: "hoge",
    duedate: { y: 2019, m: 7, d: 12, h: 15, min: 0 },
    cond: "small",
    priority:0,
    bod1: 7,
    bod2: 3,
    hash:0
  },
  {
    importance: 1,
    name: "fugafugafuga",
    duedate: { y: 2019, m: 9, d: 10, h: 11, min: 0 },
    cond: "midium",
    priority:1,
    bod1: 7,
    bod2: 3,
    hash:0
  },
  {
    importance: 0,
    name: "piyo",
    duedate: { y: 2019, m: 7, d: 15, h: 11, min: 0 },
    cond: "large",
    priority:2,
    bod1: 7,
    bod2: 3,
    hash:0
  },
  {
    importance: 1,
    name: "fuga",
    duedate: { y: 2019, m: 9, d: 10, h: 11, min: 0 },
    cond: "large_yellow",
    priority:3,
    bod1: 7,
    bod2: 3,
    hash:0
  },
  {
    importance: 0,
    name: "piyo",
    duedate: { y: 2019, m: 7, d: 15, h: 11, min: 0 },
    cond: "large_red",
    priority:4,
    bod1: 7,
    bod2: 3,
    hash:0
  },
  {
    importance: 1,
    name: "fuga",
    duedate: { y: 2019, m: 9, d: 10, h: 11, min: 0 },
    cond: "over",
    priority:100,
    bod1: 7,
    bod2: 3,
    hash:0
  }
]

let taskdata = new Array(100)

for (let i= 0; i < testdata.length; ++ i){
  taskdata[i] = testdata[i]
}

for (let i=testdata.length; i < 100; ++i){
  taskdata[i] =   {
    importance: "",
    name: "",
    duedate: { y:"", m: "", d: "", h: "", min: "" },
    cond: "hoge",
    priority:-1000000,
    bod1: "",
    bod2: ""
  }
}

new Vue({
  render: function(createElement){
     return createElement(wrapper,{
       props:{
        rawtasks: testdata,
        inhead:testdata.length
       }
     })
  } 
}).$mount('#app')

// function OutJsonFile(obj){
//   let temp = JSON.stringify(obj)
//   localStorage.setItem("tasks",temp)
// }

// OutJsonFile(taskdata)