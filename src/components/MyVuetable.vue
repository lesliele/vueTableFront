<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-11 21:49:00
 * @LastEditTime: 2019-09-17 21:14:02
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div id="table" class="table">
    <div class="handle_header">
      <button type="button" class="add_btn" @click="goUser">新增用户数据</button>
    </div>
    <button type="button" @click="testAjax">模拟请求数据</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    goUser() {
      this.$router.push({ path: '/user' });
    },
    testAjax() {
      this.axios.get('http://localhost:9008/api/user', {
          params: {
            sort: 'age|desc',
            pageIndex: 1,
            pageSize: 10
          }
      })
      .then(function (response) {
          console.log(response);
      });
    } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table{
  width: 1400px;
  margin: 0 auto;
}
.handle_header{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.add_btn{
  width: 120px;
  height: 40px;
  line-height: 40px;
  background: #409EFF;
  color: #fff;
  font-size: 16px;
}
</style>
