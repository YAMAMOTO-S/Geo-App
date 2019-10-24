<template>
  <div class="navbar">
    <nav class="orange lighten-3">
      <div class="container">
        <router-link :to="{ name: 'GMap' }" class="log-title">Geo-App</router-link>
        <ul class="right">
          <li v-if="!user"><router-link :to="{name: 'Signup'}">Signup</router-link></li>
          <li v-if="!user"><router-link :to="{ name: 'Login' }">Login</router-link></li>

          <li v-if="user"><a>{{user.email}}</a></li>
          <li v-if="user" @click="logout">Logout</li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Navbar',
  data(){
    return{
      user: null,
      alias: null
    }
  },
  methods: {
    logout(){
      firebase.auth().signOut()
      .then(() =>{
        this.$router.push({name: 'Login'})
      })
    }
  },
  created(){
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.user = user
      } else {
        this.user = null
      }
    })
  }
}
</script>

<style>
.log-title{
  font-size: 25px;
}
</style>