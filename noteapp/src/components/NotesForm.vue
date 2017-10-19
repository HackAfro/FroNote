<template lang="pug">
  form(@submit.prevent="").note-input.col.col-lg-8.col-md-10.col-sm-12.col-12.ml-auto.mr-auto
    .inputs-holder
      .form-group
        input.form-control.app-input#title(name="title" placeholder="The post title")

      .form-group.d-none
        textarea.form-control.app-input#note-text(rows="4" placeholder="Create a note for future use" name="text")

    button.btn.primary.text-white.submit-button#stepper(type="submit" data-step="1") Next
    button.btn.primary.text-white.prev-button.d-none.mx-2.my-2#prev(type="button") Prev
</template>

<script>
  export default{
    data(){
      return {

      }
    }
  }
</script>

<style lang="scss">

</style>
