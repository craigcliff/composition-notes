import { defineStore } from 'pinia'
import { 
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { auth } from '@/js/firebase'

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {}
    }
  },
  actions: {
    init() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid
          this.user.email = user.email
          this.router.push('/')
        } else {
          this.user = {}
          this.router.replace('/auth')
        }
      })
    },
    registerUser(credentials) {
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log('user: ', user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
      })
    },
    loginUser(credentials) {
      
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
   
        const user = userCredential.use
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
      })
  
    },
    logoutUser() {
      signOut(auth).then(() => {
        console.log('user signed out')
      }).catch((error) => {
        console.log('err:', error.mesage)
      })
    }

},
getters: {
}

})