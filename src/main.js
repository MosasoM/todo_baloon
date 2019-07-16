import Vue from "vue";
import wrapper from "./components/page_wrapper.vue";
Vue.config.productionTip = false;

function parse_local_data(text) {
  let body = text.slice(1, -1);
  let regex = new RegExp('[{}"]', "g");
  body = body.replace(regex, "");
  body = body.split(",");
  let out = [];
  for (let i = 0; i < Math.floor(body.length / 13); ++i) {
    let data = {
      name: body[i * 13].split(":")[1],
      importance: Number(body[i * 12 + 1].split(":")[1]),
      year: Number(body[i * 13 + 2].split(":")[1]),
      month: Number(body[i * 13 + 3].split(":")[1]),
      day: Number(body[i * 13 + 4].split(":")[1]),
      hour: Number(body[i * 13 + 5].split(":")[1]),
      minutes: Number(body[i * 13 + 6].split(":")[1]),
      milisec: Number(body[i * 13 + 7].split(":")[1]),
      priority: Number(body[i * 13 + 8].split(":")[1]),
      cond: body[i * 13 + 9].split(":")[1],
      bod1: Number(body[i * 13 + 10].split(":")[1]),
      bod2: Number(body[i * 13 + 11].split(":")[1]),
      taskid: body[i * 13 + 12].split(":")[1]
    };
    out.push(data);
  }
  return out;
}
let testdata = localStorage.getItem("tasks");

if (!testdata) {
  testdata = [];
} else {
  testdata = parse_local_data(testdata);
}



new Vue({
  render: function(createElement) {
    return createElement(wrapper, {
      props: {
        rawtasks: testdata
      }
    });
  }
}).$mount("#app");
