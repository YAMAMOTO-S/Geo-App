<template>
   <div class="profile container">
      <div class="card" v-if="profile">
         <h2 class="center">{{ profile.alias}}</h2>
         <ul class="comments collection">
            <li v-for="(comment, index) in comments" :key="index">
               <div class="fromcoment">{{ comment.from }} :</div>
               <div class="gray-text ">{{ comment.content }}</div>
            </li>
         </ul>
         <form @submit.prevent="addComment">
            <div class="field">
               <label for="comment">Add a comment by pushing Enter Key</label>
               <input type="text" name="comment" v-model="newComment">

               <p v-if="feedback" class="red-text center">{{feedback}}</p>
            </div>
         </form>
      </div>
   </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
export default {
  name: 'ViewProfile',
  data(){
    return{
      profile: null,
      newComment: null,
      feedback: null,
      comments: [],
    }
  },
  created(){
    let ref = db.collection('users')

    // current user
    ref.where('user_id', '==', firebase.auth().currentUser.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.user = doc.data()
        this.user.id = doc.id
      })
    })

    // profile data
    ref.doc(this.$route.params.id).get()
    .then(user => {
      this.profile = user.data()
    })

    // comments
    db.collection('comments').where('to', '==', this.$route.params.id)
    .onSnapshot((snapshot) => {  //非同期にする
      snapshot.docChanges().forEach(change => {
         if(change.type == 'added'){
            this.comments.unshift({
               from: change.doc.data().from,
               content: change.doc.data().content
            })
         }
      })
    })

  },


  methods: {
    addComment(){
      if(this.newComment){
        this.feedback = null
        db.collection('comments').add({
          to: this.$route.params.id,
          from: this.user.id,
          content: this.newComment,
          time: Date.now()
        }).then(doc => {
          this.newComment = null //ここでリセットして空白にする。
        })
      } else {
        this.feedback = 'You must enter something'
      }
    }
  }
}
</script>

<style>
.profile h2{
   color: #F99273;
   margin-bottom: 50px;
   font-size: 50px;
}
.fromcoment{
   color: #F99273;
}
</style>