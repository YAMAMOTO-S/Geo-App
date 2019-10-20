<template>
   <div class="signup container">
      <form  @submit.prevent="signup"  class="card-panel">
         <h2 class="center title">Signup</h2>

         <div class="field">
            <label for="email">Email:</label>
            <input type="email" name="email" v-model="email">
         </div>
         <div class="field">
            <label for="password">Password:</label>
            <input type="password" name="password" v-model="password">
         </div>
         <div class="field">
            <label for="alias">Alias:</label>
            <input type="text" name="alias" v-model="alias">
         </div>
         <p class="red-text center" v-if="feedback">{{feedback}}</p>
         <div class="field center">
            <button class="btn deep-orange lighten-3">Signup</button>
         </div>

      </form>
   </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
import firebase from 'firebase'
export default {
  name: 'Signup',
  data(){
    return{
      email: null,
      password: null,
      alias: null,
      feedback: null,
      slug: null
    }
  },
  methods: {
    signup(){
      if(this.alias && this.email && this.password){
        this.feedback = null
        this.slug = slugify(this.alias, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        let ref = db.collection('users').doc(this.slug)
        ref.get().then(doc => {
          if(doc.exists){
            this.feedback = 'This alias already exists'
          } else {
          // this alias does not yet exists in the db
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(cred => {
              ref.set({
                alias: this.alias,
                geolocation: null,
                user_id: cred.user.uid
              })
            }).then(() => {
              this.$router.push({ name: 'GMap' })
            })
            .catch(err => {
              this.feedback = err.message
            })
          }
        })
      } else {
        this.feedback = 'Please fill in all fields'
      }
    }
  }
}
</script>

<style scoped>
.signup h2{
   color: #F99273;
   margin-bottom: 50px;
}
.signup{
   max-width: 800px;
   margin-top: 60px;
}
.signup .field{
   margin-bottom: 20px;
}
</style>