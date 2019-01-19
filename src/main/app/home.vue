<template>
    <div>
        <div @click="goToIndex()">去index页面</div>
        <ul>
            <li v-for="(item,index) in list" >{{item.id}}-{{item.key}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            list:[
                {id:1,key:'测试1'},
                {id:2,key:'测试2'},
            ]
        }
        
    },
    methods:{
         goToIndex(){
             location.href = '../../page/index/index.html'
         }
    }
    
}
</script>
     
<style>
    
</style>

