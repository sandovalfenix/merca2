<template>
  <form id="formForgotPassword" class="js-validate" @submit.prevent="recoverPass(User.email)">
    <!-- Form Group -->
    <div class="form-group">
      <div class="js-form-message js-focus-state">
        <label class="sr-only" for="recoverEmail">Tu Correo Electronico</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="recoverEmailLabel">
              <span class="fas fa-user"></span>
            </span>
          </div>
          <input class="form-control" id="recoverEmail" v-model="User.email" type="email" placeholder="Tu correo electrónico" aria-describedby="recoverEmailLabel" aria-label="Your email" data-error-class="u-has-error" data-msg="Por favor, introduce una dirección de correo electrónico válida." data-success-class="u-has-success" required>
        </div>
      </div>
    </div>
    <!-- End Form Group -->

    <div class="mb-2">
      <button class="btn btn-block btn-sm btn-primary transition-3d-hover" type="submit">Recuperar Contraseña</button>
    </div>

    <div class="text-center mb-4">
      <span class="small text-muted">¿Recuerdas tu contraseña?</span>
      <a class="js-animation-link small" href="javascript:;" data-animation-in="slideInUp" data-link-group="idForm" data-target="#login">Iniciar sesión</a>
    </div>
  </form>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: "forgotPassword",
  data() {
    return {
      User: {},
    }
  },
  methods:{
    ...mapActions(['recoverPass']),    
  },
};
</script>