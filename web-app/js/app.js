import { auth } from "../firebase-config.js";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

window.loginAdmin = async () => {
  const email = document.getElementById("adminEmail").value;
  const pass = document.getElementById("adminPass").value;

  try {
    await signInWithEmailAndPassword(auth, email, pass);
    location.href = "admin.html";
  } catch (e) {
    alert(e.message);
  }
};

window.loginGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    location.href = "user.html";
  } catch (e) {
    alert(e.message);
  }
};

window.logout = async () => {
  await signOut(auth);
  location.href = "index.html";
};
