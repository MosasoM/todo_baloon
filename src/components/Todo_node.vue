<template>
  <div id="highest-wrapper">
    <div id="todo-node-wrap">
      <li class="nodes" v-for="task in sortedtasks" v-bind:key="task.id">
        <div
          class="nodebase"
          v-bind:class="task.cond"
          v-if="task.name"
          v-on:click="see_detail(task)"
        >{{task.name}}</div>
      </li>
    </div>

    <div class="modalback" v-if="detailv">
      <div class="modalcontainer">
        <div class="modalbody">
          <div id="nameshow">
            <div class="showcontent">
              <p class="showheader">name</p>
              {{name}}
            </div>
          </div>
          <div id="impshow">
            <div class="showcontent">
              <p class="showheader">importance</p>
              {{importance}}
            </div>
          </div>
          <div id="dueshow">
            <div class="showcontent">
              <p class="showheader">due date</p>
              {{duedate}}
              <br />
              {{duetime}}
            </div>
          </div>
          <div id="detshow">
            <div class="showcontent">
              <p class="showheader">detail</p>
              {{detail}}
            </div>
          </div>
          <div id="tcbutton">
            <button
              type="button"
              class="normalbutton"
              id="done"
              v-on:click="$emit('donetask',taskid);close();reset();"
            >Done</button>
            <button type="button" class="normalbutton" id="addtask" v-on:click="close();reset();">OK</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "todonodes",
  props: ["intasks"],
  data: function() {
    return {
      tasks: this.intasks,
      detailv: false,
      name: "",
      importance: "",
      duedate: "",
      duetime: "",
      detail: "",
      taskid: ""
    };
  },
  methods: {
    see_detail: function(task) {
      this.detailv = true;
      this.name = task.name;
      if (task.importance === 0) {
        this.importance = "低";
      } else if (task.importance == 1) {
        this.importance = "中";
      } else {
        this.importance = "高";
      }
      this.duedate = task.year + "年" + task.month + "月" + task.day + "日";
      this.duetime = task.hour + "時" + task.minutes + "分";
      this.detail = task.detail;
      this.taskid = task.taskid;
    },
    close: function() {
      this.detailv = false;
    },
    reset: function() {
      this.name = "";
      this.importance = "";
      this.duedate = "";
      this.duetime = "";
      this.detail = "";
      this.taskid = "";
    }
  },
  computed: {
    sortedtasks: function() {
      return this.tasks.slice().sort(function(a, b) {
        if (a.priority > b.priority) {
          return -1;
        } else if(a.priority === b.priority){
            if (a.milisec < b.milisec){
                return -1;
            }else{
                return 1;
            }
        } else {
          return 1;
        }
      });
    }
  }
};
</script>>

<style>
.nodebase {
  border: double 10px;
  border-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
}
.over {
  background-color: rgb(180, 180, 180);
  width: 400px;
  height: 150px;
}
.small {
  background-color: rgb(0, 207, 0);
  width: 200px;
  height: 150px;
}
.midium {
  background-color: rgb(0, 207, 0);
  width: 300px;
  height: 150px;
}

.large {
  background-color: rgb(0, 207, 0);
  width: 400px;
  height: 150px;
}
.large_yellow {
  background-color: rgb(224, 224, 0);
  width: 400px;
  height: 150px;
}
.large_red {
  background-color: rgb(241, 53, 53);
  width: 400px;
  height: 150px;
}
.nodes {
  width: 450px;
  display: flex;
  justify-content: center;
}
.flip-move {
  transition: transform 1s;
}
#done {
  background-color: hotpink;
}

#nameshow {
  height: 80px;
  border: solid 3px #6091d3;
}

#impshow {
  height: 80px;
  border: solid 3px #6091d3;
  margin-top: 20px;
}

#dueshow {
  height: 100px;
  border: solid 3px #6091d3;
  margin-top: 20px;
}

#detshow {
  height: 120px;
  border: solid 3px #6091d3;
  margin-top: 20px;
}
.showheader {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 18px;
  color: black;
}

.showcontent {
  margin-left: 10px;
  margin-bottom: 10px;
}
</style>