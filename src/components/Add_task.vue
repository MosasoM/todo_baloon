<template>
  <div id="AddButtonWrapper" v-show="isshow">
    <div class="modalback">
      <div class="modalcontainer">
        <div class="modalbody">
          <p class="inputheader">name</p>
          <input type="text" id="nameholder" v-model="inputname" />
          <p class="inputheader">importance</p>
          <select id="importanceselect" v-model="inputimport">
            <option value="2" class="importanceoption">高</option>
            <option value="1" class="importanceoption">中</option>
            <option value="0" class="importanceoption">低</option>
          </select>

          <p class="inputheader">due date</p>
          <input type="date" id="datein" v-model="inputdate" />

          <input type="time" id="timein" v-model="inputtime" />
          <p class="inputheader">detail</p>
          <textarea rows="5" id="detailin" v-model="inputdetail"></textarea>

          <div id="tcbutton">
            <button
              type="button"
              class="normalbutton"
              id="cancel"
              v-on:click="$emit('closemodal',{});reset()"
            >Cancel</button>
            <button
              type="button"
              class="normalbutton"
              id="addtask"
              v-on:click="$emit('closemodal',{name:inputname,importance:inputimport,date:inputdate,time:inputtime,detail:inputdetail});reset()"
            >Add task</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "add_button",
  props: ["isshow"],
  data: function() {
    return {
      inputname: "",
      inputimport: "",
      inputdate: "",
      inputtime: "",
      inputdetail: ""
    };
  },
  methods: {
    reset: function() {
      (this.inputname = ""),
        (this.inputimport = ""),
        (this.inputdate = ""),
        (this.inputtime = ""),
        (this.inputdetail = "");
    }
  }
};
</script>

<style>
.modalback {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modalcontainer {
  display: flex;
  justify-content: center;
  width: 400px;
  height: 600px;
  background-color: white;
}

.modalbody {
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 600px;
  justify-content: center;
}

#tcbutton {
  display: flex;
}

.normalbutton {
  margin-top: 30px;
  width: 100px;
  height: 40px;

  font-family: inherit;
  font-size: 12pt;
}

#addtask {
  background-color: rgb(65, 212, 200);
  margin-left: 150px;
}
#cancel {
  background-color: rgb(155, 153, 153);
}

.inputheader {
  margin: 25px 0px 4px 4px;
  font-size: 14pt;
}

#nameholder {
  height: 30px;
  font-size: 14pt;
}

#importanceselect {
  height: 30px;
  font-family: inherit;
  font-size: 14pt;
}

#datein {
  height: 30px;
  font-size: 12pt;
}

#timein {
  margin-top: 10px;
  height: 30px;
  font-size: 14pt;
}

#detailin {
  height: 100px;
  font-size: 11pt;
}
</style>