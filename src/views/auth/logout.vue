<template>
    <main></main>
</template>
<script>
export default {
  created() {
    this.$store.dispatch("destroyToken").then(response => {
      console.log(response)
      localStorage.removeItem('access_token')
      window.location.reload()  
    });
  }
};
</script>