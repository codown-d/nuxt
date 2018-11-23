<template>
  <div>
    <div>this is template body {{msg}}</div>
    <div v-for='item in user'>{{item.id}} {{item.name}} {{item.age}} {{item.address}}</div>
    <button @click='add'>addUser</button>
  </div>
</template>
<script>
import {addUser} from '../../ajax'
export default{
  async asyncData({ app }) {
    const user = await app.$axios.$get('/api/u')
    console.log(user)
    return {user}
  },
  data(){
    return{
       msg:'hello vue'
      }
    },
    mounted(){
 console.log(this)
    },
  components:{},
  methods:{
     add(){
    }
  },
  head: {
    title: 'Home page'
  }
}


</script>
<style>

</style>
