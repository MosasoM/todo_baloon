<template>
  <div id="pagewrapper">
    <todonodes v-bind:intasks="tasks" ref="nodechild" v-on:donetask="removetask"></todonodes>
    <addtask v-on:closemodal="closemodalf" v-bind:isshow="taskmodal"></addtask>
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
  props: ["rawtasks"],
  components: { todonodes, addtask },
  data: function() {
    return {
      taskmodal: false,
      tasks: this.rawtasks
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
    closemodalf: function(e) {
      this.taskmodal = !this.taskmodal;
      if (!e.name) {
        return 0;
      } else if (e.name === "") {
        alert("name is null\nname,date,time is to be filled");
      } else if (e.date === "") {
        alert("date is null\nname,date,time is to be filled");
      } else if (e.time === "") {
        alert("time is null\nname,date,time is to be filled");
      } else {
        let dd = e.date.split("-");
        let y1 = Number(dd[0]);
        let m1 = Number(dd[1]);
        let d1 = Number(dd[2]);
        let tt = e.time.split(":");
        let h1 = Number(tt[0]);
        let minu1 = Number(tt[1]);
        let mill = new Date(y1, m1 - 1, d1, h1, minu1).getTime();
        let p = this.calc_prio(y1, m1, d1, h1, minu1, e.importance, 7, 3);
        let c = this.alloc_classname(p);
        let temp_taskid = mill.toString() + e.name;
        let obj = {
          name: e.name,
          importance: e.importance,
          year: y1,
          month: m1,
          day: d1,
          hour: h1,
          minutes: minu1,
          milisec: mill,
          priority: p,
          cond: c,
          bod1: 7,
          bod2: 3,
          taskid: temp_taskid
        };
        this.head += 1;
        this.tasks.push(obj);
        let temp = JSON.stringify(this.tasks);
        localStorage.setItem("tasks", temp);
      }
    },

    calc_prio: function(y, m, d, h, mi, imp, bod1, bod2) {
      let daymill = 8.64e7;
      let nowms = new Date().getTime();
      let ms = new Date(y, m - 1, d, h, mi).getTime();
      let state = 100;
      if (ms - nowms < 0) {
        state = 100;
      } else if (ms - nowms < daymill * bod2) {
        state = Number(imp) + 2;
      } else if (ms - nowms < daymill * bod1) {
        state = Number(imp) + 1;
      } else {
        state = Number(imp);
      }
      return Number(state);
    },
    removetask: function(e) {
      let target = 0;
      for (let i = 0; i < this.tasks.length; ++i) {
        if (this.tasks[i].taskid === e) {
          target = i;
          break
        }
      }
      this.tasks.splice(target, 1);
      let temp = JSON.stringify(this.tasks);
      localStorage.setItem("tasks", temp);
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
