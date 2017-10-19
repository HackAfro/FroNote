<template lang="pug">
  form(@submit.prevent="onSubmit").note-input.col.col-lg-8.col-md-10.col-sm-12.col-12.ml-auto.mr-auto#tweet-form
    .form-group
      textarea.form-control.app-input#tweet-text(
      rows="1"
      placeholder="Schedule a tweet for later posting"
      name="tweet"
      v-model="newTweet"
      @focus="checkFocus"
      @focusout="checkFocus"
      )
      small.form-text.text-right#counter(:class="{'light-red-text': newTweet.length > 130 && newTweet.length < 140, 'red-text': newTweet.length > 140}").
        #[span.text-count {{newTweet.length}}]/140
    button.btn.submit-button.primary.text-white(type="submit" :disabled="newTweet.length > 140") Saves
</template>

<script>
  export default{
    data() {
      return {
        newTweet: '',
      };
    },
    methods: {
      onSubmit() {
        if (this.newTweet !== '') {
          this.$emit('new-tweet', this.newTweet);
          this.newTweet = '';
        }
      },
      checkFocus($event) {
        const form = $event.target;
        form.rows = form.rows === 4 ? 1 : 4;
      },
    },
  };
</script>

<style lang="scss">
  $red: red;
  .red-text {
    color: $red + 18 !important;
  }

  .light-red-text {
    color: $red + 81 !important;
  }
</style>
