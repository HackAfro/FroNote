<template lang="pug">
  .col.col-lg-4.col-md-6.col-sm-6.col-6
    card.text-white.bg-card.mb-3
      .card-header
        i.fa.fa-pencil.float-left.update
        i.fa.fa-close.float-right.delete(data-toggle="modal" data-target=".delete-modal")

      .card-body(contenteditable="true")
        h4.card-title.note-title {{note.title}}
        p.card-text.note-text {{note.note}}
</template>

<script>
  export default{
    props: {
      note: {
        type: Object,
        required: true,
      },
    },
  };
</script>

<style lang="scss">

</style>
