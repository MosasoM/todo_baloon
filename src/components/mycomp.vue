<template>
<div id="mycomp-div">
<h1>test of my component</h1>

I have {{ msg }} (from data)
</div>
</template>

<script>
export default {
    name:"mycomp",
    data:function(){
        return{
            msg: "hogehoge",
            data2 : 2
        }
    }    
}
</script>>