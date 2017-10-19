<template lang="pug">
  .container
    .row.page-row
      .col.col-12.col-lg-3.col-md-3.col-sm-12
        .list-group.shadow-2#myList(role="tablist")
          router-link.list-group-item.list-group-item-action(data-toggle="list" role="tab" :to="{path: '/notes'}") Notes
          router-link.list-group-item.list-group-item-action(data-toggle="list" role="tab" :to="{path: '/tweets'}") Tweets
          a.list-group-item.list-group-item-action(data-toggle="list" role="tab") Tasks

      .col.col-12.col-lg-9.col-sm-12.col-md-9
        <!-- Tab panes -->
        .tab-content
          router-view
</template>

<script>
  export default{
    data() {
      return {
        message: 'Food don done',
      };
    },
  };
</script>

<style scoped lang="scss">

</style>
