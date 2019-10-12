<template>
  <div class="home">
    <h1>首页面</h1>
    <p>当前登录的用户名是{{$store.state.username}}</p>
  </div>
</template>

<script>
import { getUser } from "../api/user";
export default {
  name: "home",
  components: {},
  async mounted() {
    let a = await getUser();
    // console.log(a);
  }
};
</script>