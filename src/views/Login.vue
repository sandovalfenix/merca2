<template>
  <div class="container-fluid p-0">
    <!-- Header -->
    <header class="header header-light bg-white shadow-sm">
      <nav class="navbar flex-nowrap p-2">
        <div class="navbar-brand-wrapper col-auto bg-white text-center">
          <!-- Logo For Mobile View -->
          <a class="navbar-brand navbar-brand-mobile" href="javascript:void(0)">
            <img class="img-fluid" src="@/assets/logo_merca2.png" alt="Nova">
          </a>
          <!-- End Logo For Mobile View -->

          <!-- Logo For Desktop View -->
          <a class="navbar-brand navbar-brand-desktop" href="/">
            <img class="side-nav-hide-on-closed w-30" src="@/assets/logo_merca2.png" alt="Nova" >
          </a>
          <!-- End Logo For Desktop View -->
        </div>

        <div class="header-content col pl-md-0">
          <div class="d-flex align-items-center">

            <!-- Header Dropdown -->
            <div class="ml-auto">
              <a class="btn btn-outline-info rounded-pill px-7 py-2" href="/">
                <span class="text-uppercase small">Ir a la Tienda</span>
              </a>
            </div>
            <!-- End Header Dropdown -->
          </div>
        </div>
      </nav>
    </header>
    <!-- End Header --> 
    <div class="container space-top-3">
      <div class="row no-gutters">
        <div class="col-md-4 offset-md-4">
          <!-- Login -->
          <div id="login" data-target-group="idForm">
            <!-- Title -->
            <header class="text-center mb-7">
              <h2 class="h4 mb-0">Inicia sesión</h2>
              <p>¡Ingresa a Merca2 Colombia, descubre lo que tenemos para ti!</p>
            </header>
            <!-- End Title -->
            <!-- Form -->
            <SignIn></SignIn>        
            <!-- End Form -->
            <div class="text-center mb-4">
              <span class="text-muted mr-1">¿No tiene una cuenta?</span>
              <a class="js-animation-link" href="javascript:;" data-animation-in="slideInUp" data-link-group="idForm" data-target="#signup"><b>Regístrate</b></a>
            </div>
          </div>
            <!-- Signup -->
          <div id="signup" style="display: none; opacity: 0;" data-target-group="idForm">
            <header class="text-center mb-7">
              <h2 class="h4 mb-0">Registrarte</h2>
              <p>¡Únete a Merca2 Colombia, descubre lo que tenemos para ti!</p>
            </header>

            <SignUp></SignUp>
          </div>
          <!-- End Signup -->

          <!-- Forgot Password -->
          <div id="forgotPassword" style="display: none; opacity: 0;" data-target-group="idForm">
            <!-- Title -->
            <header class="text-center mb-7">
              <h2 class="h4 mb-0">Recuperar contraseña.</h2>
              <p>Ingrese su dirección de correo electrónico y se le enviará un correo electrónico con instrucciones.</p>
            </header>
            <!-- End Title -->

            <forgotPassword></forgotPassword>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignIn from '@/components/SignIn.vue'
import SignUp from '@/components/SignUp.vue'
import forgotPassword from '@/components/forgotPassword.vue'

export default {
  name: 'Login',
  components:{
    SignIn,
    SignUp,
    forgotPassword
  },
}
</script>