<template>
  <div>
    <div>this is template body {{msg}}</div>
    <input type='text' v-model='userInfo.id' placeholder='id'/>
    <input type='text' v-model='userInfo.name' placeholder='name'/>
    <input type='text' v-model='userInfo.age' placeholder='age'/>
    <input type='text' v-model='userInfo.address' placeholder='address'/>
    <input type='text' v-model='userInfo.role' placeholder='role'/>
    <div v-for='item in user'>{{item.id}} {{item.name}} {{item.age}} {{item.address}}</div>
    <button @click='add'>addUser</button>
    <button @click='del'>delUser</button>
    <button @click='updata'>updataUser</button>
  </div>
</template>
<script>
  export default {
    async asyncData({app}) {
      const user = await app.$axios.$get('/api/u')
      return {user}
    },
    data() {
      return {
        userInfo: {
          id: 12346,
          name: 123465,
          address: '456789',
          age: '456',
          role: 123,
        },
        msg: 'hello vue '
      }
    },
    mounted() {
    },
    components: {},
    methods: {
      async add() {
        let result = await this.$axios.$get('/api/getadduser', {
          params: this.userInfo
        })
        console.log(result)
        this.user = await this.$axios.$get('/api/u')
      },
      async del() {
        let result = await this.$axios.$get('/api/deluser', {
          params: this.userInfo
        })
        this.user = await this.$axios.$get('/api/u')
        console.log(result)
      },
      async updata() {
        let result = await this.$axios.$get('/api/updatauser', {
          params: this.userInfo
        })
        this.user = await this.$axios.$get('/api/u')
        console.log(result)
      }
    },
    head: {
      title: 'Home page '
    }
  }


</script>
<style>

</style>
