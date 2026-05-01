import { auth, db } from "../firebase-config.js";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  addDoc, collection, onSnapshot, getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const adminList = ["admin@gmail.com"];
const $ = id => document.getElementById(id);

// LOGIN
window.loginAdmin = async () => {
  const res = await signInWithEmailAndPassword(auth, $("adminEmail").value, $("adminPass").value);
  if (adminList.includes(res.user.email)) location.href = "admin.html";
};

window.loginGoogle = async () => {
  await signInWithPopup(auth, new GoogleAuthProvider());
  location.href = "user.html";
};

window.logout = () => signOut(auth).then(()=>location.href="index.html");

// ORDER
window.kirimOrder = async () => {
  await addDoc(collection(db,"orders"), {
    idGame:$("idGame").value,
    rank:$("rank").value,
    harga:$("harga").innerText
  });
  alert("Order masuk");
};

// WA
window.kirimWA = () => {
  const url = `https://wa.me/628123456789?text=Order FF`;
  window.open(url);
};

// ADMIN DASHBOARD
function loadDashboard(){
  onSnapshot(collection(db,"orders"), snap=>{
    let total=0;
    snap.forEach(d=>{
      total += parseInt(d.data().harga?.replace(/\D/g,"")||0);
    });
    $("totalIncome").innerText="Rp "+total;
    $("totalOrder").innerText=snap.size;
  });
}

// ROUTE
onAuthStateChanged(auth,user=>{
  const path = location.pathname;

  if(path.includes("admin")){
    if(!user || !adminList.includes(user.email)){
      location.href="index.html";
    }else{
      loadDashboard();
    }
  }

  if(path.includes("user") && !user){
    location.href="index.html";
  }
});