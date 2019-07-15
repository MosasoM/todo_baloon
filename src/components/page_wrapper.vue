<template>
  <div id="pagewrapper">
    <todonodes v-bind:intasks="tasks" ref="nodechild"> </todonodes>
    <addtask v-on:closemodal="closemodal" v-bind:isshow="taskmodal"></addtask>
    <img
      src="../assets/plus.png"
      id="addicon"
      width="64px"
      height="64px"
      v-on:click="expandmodal($event)"
    />
  </div>
</template>

<script>
import todonodes from "./Todo_node.vue";
import addtask from "./Add_task.vue";
export default {
  name: "pwrap",
  props: ["rawtasks", "inhead"],
  components: { todonodes, addtask },
  data: function() {
    return {
      taskmodal: false,
      tasks: this.rawtasks,
      head: this.inhead
    };
  },
  methods: {
    expandmodal: function() {
      this.taskmodal = true;
    },
    alloc_classname: function(state) {
      switch (state) {
        case 100:
          return "over";
        case 0:
          return "small";
        case 1:
          return "midium";
        case 2:
          return "large";
        case 3:
          return "large_yellow";
        case 4:
          return "large_red";
      }
    },
    closemodal: function(e) {
      this.taskmodal = !this.taskmodal;
      if (e.length === 0){
          return 0
      }
      else if (e.name === "") {
        alert("name is null\nname,date,time is to be filled");
      } else if (e.date === "") {
        alert("date is null\nname,date,time is to be filled");
      } else if (e.time === "") {
        alert("time is null\nname,date,time is to be filled");
      } else {
        let dd = e.date;
        console.log(dd)
        let y1 = Number(dd.substr(0, 4));
        let m1 = Number(dd.substr(5, 7));
        let d1 = Number(dd.substr(8, 10));
        let tt = e.time;
        let h1 = Number(tt.substr(0, 2));
        let minu1 = Number(tt.substr(3, 5));
        let due = {
            y: y1,
            m: m1,
            d: d1,
            h: h1,
            min: minu1
          }
        let p = this.calc_prio(due,e.importance,7,3)
        let c = this.alloc_classname(p)
        let obj = {
            name:e.name,
            importance:e.importance,
            duedate:due,
            priority:p,
            cond:c,
            bod1:7,
            bod2:3,
            hash:0
        }
        this.head += 1
        this.tasks.push(obj)
        let temp = JSON.stringify(this.tasks)
        localStorage.setItem("tasks",temp)
      }
    },

    calc_prio: function(dd, imp, bod1, bod2) {
      let daymill = 8.64e7;
      let nowms = new Date();
      let ms = Date(dd.y, dd.m, dd.d, dd.h, dd.min);
      let state = 100;
      if (ms - nowms < 0) {
        state = 100;
      } else if (ms - nowms < daymill * bod2) {
        state = imp + 2;
      } else if (ms - nowms < daymill * bod1) {
        state = imp + 1;
      } else {
        state = imp;
      }
      return Number(state);
    }
  }
};
</script>

<style>
#addicon {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
}
</style>
