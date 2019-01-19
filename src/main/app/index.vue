<template>
    <div>
        ddsfsdaf
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
                {id:1,key:'测试index1'},
                {id:2,key:'测试index2'},
            ]
        }
        
    }
    
}
</script>

<style>
    
</style>

