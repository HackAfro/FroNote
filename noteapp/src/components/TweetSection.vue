<template lang="pug">
  .tab-pane.active#tweets(role="tabpanel")
    .row
      TweetForm(@new-tweet="addTweet")

    .row.bottom-form-row
      .col.col-12
        .list-group.w-90.mr-auto.ml-auto.tweet-box

          TweetList(v-for="tweet of tweets" :key="tweet.id" :tweet="tweet")
</template>

<script>
  import TweetForm from './TweetForm';
  import TweetList from './TweetList';

  export default{
    components: {
      TweetForm,
      TweetList,
    },
    data() {
      return {
        tweets: [
          {
            id: 1,
            tweet: 'What did the cow do to the master?',
            date: '2017-10-16T14:09:33.033Z',
            display_name: 'AFRO BABA',
            screen_name: 'iamAfro',
            tweeted: false,
          },
          {
            id: 2,
            tweet: 'What did the cow do to the master?',
            date: '2017-10-16T14:09:33.033Z',
            display_name: 'AFRO BABA',
            screen_name: 'iamAfro',
            tweeted: false,
          },
          {
            id: 3,
            tweet: 'What did the cow do to the master?',
            date: '2017-10-16T14:09:33.033Z',
            display_name: 'AFRO BABA',
            screen_name: 'iamAfro',
            tweeted: false,
          },

        ],
      };
    },
    methods: {
      addTweet(tweet) {
        const data = {
          id: this.tweets.length + 1,
          tweet,
          date: new Date(),
          display_name: 'AFRO BABA',
          screen_name: 'iamAfro',
          tweeted: false,
        };
        this.tweets.push(data);
      },
    },
  };
</script>

<style lang="scss">

</style>
