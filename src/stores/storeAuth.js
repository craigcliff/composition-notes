import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '@/js/firebase'



export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return { 
    }
  },
  actions: {
    registerUser(credentials) {
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log('user: ', user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('error.message: ', error.message)
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