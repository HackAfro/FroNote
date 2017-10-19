<template lang="pug">
  .tab-pane.active#notes(role="tabpanel")
    .row
      NoteForm
    .row#notes-box
      .col.col-12.text-center
        .header.text-center
          h5 Notes
      NoteList
</template>

<script>
  import NoteForm from './NotesForm';
  import NoteList from './NotesList';

  export default{
    components: {
      NoteForm,
      NoteList,
    },
  };
</script>

<style lang="scss">

</style>
