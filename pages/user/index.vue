<template>
  <div>
    <el-table
      :data="user"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="ip"
        label="ip">
      </el-table-column>
      <el-table-column
        prop="count"
        label="访问次数">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    <!--<input type='text' v-model='userInfo.id' placeholder='id'/>-->
    <!--<input type='text' v-model='userInfo.name' placeholder='name'/>-->
    <!--<input type='text' v-model='userInfo.age' placeholder='age'/>-->
    <!--<input type='text' v-model='userInfo.address' placeholder='address'/>-->
    <!--<input type='text' v-model='userInfo.role' placeholder='role'/>-->
    <!--<div v-for='item in user'>{{item.id}} {{item.name}} {{item.age}} {{item.address}}</div>-->
    <!--<button @click='add'>addUser</button>-->
    <!--<button @click='del'>delUser</button>-->
    <!--<button @click='updata'>updataUser</button>-->
  </div>
</template>
<script>
  export default {
    async asyncData({app}) {
      const user = await app.$axios.$get('/api/getIpList')
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
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
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
  .el-table .warning-row {
    background: oldlace;
  }
  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
