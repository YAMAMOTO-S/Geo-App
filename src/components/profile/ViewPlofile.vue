<template>
   <div class="profile container">
      <div class="card" v-if="profile">
         <h2 class="center">{{ profile.alias}}</h2>
      </div>
   </div>
</template>

<script>
import db from '@/firebase/init'

export default {
   name: 'ViewProfile',
   data(){
      return{
         profile: null,
      }
   },
   created(){
      let ref = db.collection('users')
      ref.doc(this.$route.params.id).get()
      .then(user => {
         this.profile = user.data()
      })
   }
}
</script>

<style>

</style>