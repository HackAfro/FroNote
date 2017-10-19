<template lang="pug">
  nav.navbar.navbar-expand-lg.navbar-dark.bg-dark
    .container
      a.navbar-brand(href="#") FroNote
      button.navbar-toggler(type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation")
        .span.navbar-toggler-icon

      .collapse.navbar-collapse#navbarSupportedContent
        ul.navbar-nav.mr-auto
          li.nav-item.active
            a.nav-link(href="#") Home
              span.sr-only (current)
        ul.mr-auto
        ul.navbar-nav
          li.nav-item
            a.nav-link() Link
          li.nav-item
            a.nav-link() Disabled
        form.form-inline.my-2.my-lg-0
          input.form-control.mr-sm-2.search-bar(type="text" placeholder="Search" aria-label="Search")
          button.btn.btn-success.search-button.my-2.my-sm-0(type="submit") Search

</template>

<script>

</script>

<style lang="scss">
  @import "../assets/css/partials/variables";

  .app-button {
    border-radius: $button-radius;
    box-shadow: $button-shadow;
    cursor: pointer;
  }

  .navbar {
    background: $primary-color !important;
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.15);

    .search-bar {
      border-radius: 60px;
    }
    .search-bar:focus {
      border-color: $accent-color;
    }

    .search-button {
      @extend .app-button;
      padding: $desktop-padding;
      background: $accent-color;
    }

    .search-button:hover, .search-button:focus, .search-button:active {
      background: $hover-color;
      border-color: $accent-color;
      box-shadow: $button-shadow;
    }
  }

</style>
