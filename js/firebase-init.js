/* Firebase init (Compat) */
(function(){
  const firebaseConfig = {
    apiKey: "AIzaSyBPhgr32Jk-NERmIBodqcMYAJt-_-IxU0A",
    authDomain: "gustavopersonal-8f5fc.firebaseapp.com",
    databaseURL: "https://gustavopersonal-8f5fc-default-rtdb.firebaseio.com",
    projectId: "gustavopersonal-8f5fc",
    storageBucket: "gustavopersonal-8f5fc.firebasestorage.app",
    messagingSenderId: "1073863078622",
    appId: "1:1073863078622:web:b4c5398517293700bd884f",
    measurementId: "G-Y20YMJCC76"
  };

  try{ firebase.initializeApp(firebaseConfig); }catch(e){}

  window.FB = {
    enabled: true,
    auth: firebase.auth(),
    db: firebase.database(),
    uid: null
  };

  window.FB.auth.signInAnonymously().catch(()=>{
    window.FB.enabled = false;
  });

  window.FB.auth.onAuthStateChanged((user)=>{
    window.FB.uid = user ? user.uid : null;
    window.dispatchEvent(new CustomEvent("fb-auth-ready", { detail:{ uid: window.FB.uid }}));
  });
})();