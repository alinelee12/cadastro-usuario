<template>
    <div class="message-container">
      <p>{{ msg }}</p>
    </div>
  </template>
  
  <script>
    export default {
      name: "Message",
      props: {
        msg: String
      }
    }
  </script>
  
