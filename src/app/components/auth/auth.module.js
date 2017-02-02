angular
  .module('components.auth', [
    'ui.router',
    'firebase'
  ])
  .config(function($firebaseRefProvider){

    var config = {
      apiKey: "AIzaSyCvvgH59GHZZrHsM4d-Mef04_igfkIrtBM",
      authDomain: "contacts-7c010.firebaseapp.com",
      databaseURL: "https://contacts-7c010.firebaseio.com",
      storageBucket: "contacts-7c010.appspot.com",
      messagingSenderId: "502751562765"
    };
    
    $firebaseRefProvider.registerUrl({
      default: config.databaseURL,
      contacts: config.databaseURL + '/contacts'
    });
    firebase.initializeApp(config);
  })
  .run(function($transitions, $state, AuthService){
    $transitions.onStart({
      to: function(state){
        return !!(state.data && state.data.requiredAuth);
      }
    }, function(){
      return AuthService
        .requireAuthentication()
        .catch(function(){
          return $state.target('auth.login');
        });
    });
    $transitions.onStart({
      to: 'auth.*'
    }, function(){
      if(AuthService.isAuthenticated()){
        return $state.target('app');
      }
    });
  });
