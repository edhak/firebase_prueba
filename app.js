function registrar(){
  var email = document.getElementById('email').value;
  var contrasena = document.getElementById('contrasena').value;

  firebase.auth().createUserWithEmailAndPassword(email, contrasena)
  .then(function(){
    verificar()
  })
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  console.log(errorCode);
  console.log(errorMessage);
  });
}

function ingresar(){
  var email = document.getElementById('email1').value;
  var contrasena = document.getElementById('contrasena1').value;

  firebase.auth().signInWithEmailAndPassword(email, contrasena).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorCode);
    console.log(errorMessage);
  });

}

function observador(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('El usuario exite');
      aparecer(user);

      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;

      console.log('**************')
      console.log(user.emailVerified);
      console.log('**************')


      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      console.log('No exite usuario activo')
      contenido.innerHTML = ` `; //se vacia la tabla de bienvenido automaticamente
    }
  });
}

observador();

function aparecer(user){
  var user = user;

    var contenido = document.getElementById('contenido');
    if(user.emailVerified){
    contenido.innerHTML = `
      <div class="container mt-5">
        <div class="alert alert-success" role="alert">
          <h4 class="alert-heading">Bienvenido! ${user.email}</h4>
          <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
          <hr>
          <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
          <button onclick="cerrar()" class="btn btn-danger">Cerrar Sesion</button>
        </div>
      </div>
    `;
    }
}

function cerrar(){
  firebase.auth().signOut().then(function(){
    console.log('Saliendo')
  })
  .catch(function(error){
    console.log(error)
  })
}

function verificar(){
  var user = firebase.auth().currentUser;

  user.sendEmailVerification().then(function() {
    // Email sent.
    console.log('Envinado correo')
  }).catch(function(error) {
    // An error happened.
    consolo.log(error)
  });

}
