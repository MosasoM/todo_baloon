<template>
  <div id="highest-wrapper">
    <div id="todo-node-wrap">
      <li class="nodes" v-for="task in sortedtasks" v-bind:key="task.id">
        <div class = "nodebase" v-bind:class="task.cond" v-if="task.name">{{task.name}}</div>
      </li>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
export default {
  name: "todonodes",
  props: ["intasks"],
  data:function(){
      return{
          tasks : this.intasks,
      }
  },
computed:{
    sortedtasks:function(){
        return this.tasks.sort(function(a,b){
              if(a.priority>b.priority){
                  return -1
              }else{
                  return 1
              }
          }
        )
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
</style>