import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

// Sort results by id in descending order, take two
// and return the age as an integer.

import {ref, onValue, get, child, getDatabase} from "firebase/database";
import { database } from 'src/config/firebase';
const dbRef = ref(getDatabase());
let users = [];

get(child(dbRef, `16Po4bHTR9VUAKvcS2SsiSNZlcov7ygvpMJND6-hrM7o/users`)).then((snapshot) => {
  if (snapshot.exists()) {
    snapshot.forEach((user) => {
      users.push(user.val());
    })
    
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});


export default users;
