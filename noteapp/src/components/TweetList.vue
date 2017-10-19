<template lang="pug">
  .list-group-item.list-group-item-action.flex-column.align-items-start.border.border-left-0.border-right-0.border-top-0.tweet-card
    .d-flex.w-100.justify-content-between.px-4.my-2
      h6.mb-1.font-weight-bold {{tweet.display_name}} #[span.font-weight-normal @{{tweet.screen_name}}]
      small {{tweet.date}}
    .p.mb-1.
      {{tweet.tweet}}
    .tweet-options.d-flex.justify-content-between.w-50.px-4.my-2
      i.fa.fa-pencil.edit
      i.fa.fa-trash-o.delete(data-id="data._id" data-content="tweet" data-toggle="modal" data-target=".delete-modal")
      i.fa.fa-send-o.tweet(v-if="!tweet.tweeted")
</template>

<script>
  export default{
    props: {
      tweet: {
        type: Object,
        required: true,
      },
    },
  };
</script>

<style lang="scss">

</style>
