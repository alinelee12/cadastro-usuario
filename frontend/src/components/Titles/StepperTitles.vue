<template>
    <h2 class="title">{{ text }}</h2>
  </template>
  
  <script>
  export default {
    name: 'Title',
    props: {
      text: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
