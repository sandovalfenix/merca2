<template> 
  <form id="formSignIn" class="js-validate" @submit.prevent="signIn(User)">
    <div class="form-group">
      <div class="js-form-message js-focus-state">
        <label class="sr-only" for="signinEmail">Correo Electronico</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="signinEmailLabel">
              <span class="fas fa-user"></span>
            </span>
          </div>
          <input class="form-control" id="signinEmail" v-model="User.email" type="email" placeholder="Correo Electronico" aria-describedby="signinEmailLabel" aria-label="Email" data-error-class="u-has-error" data-msg="Por favor, introduce una dirección de correo electrónico válida." data-success-class="u-has-success" required>
        </div>
      </div>
    </div>

    <div class="form-group">
      <div class="js-form-message js-focus-state">
        <label class="sr-only" for="signinPassword">Contraseña</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="signinPasswordLabel">
              <span class="fas fa-lock"></span>
            </span>
          </div>
          <input class="form-control" id="signinPassword" v-model="User.password" type="password" placeholder="Contraseña" aria-describedby="signinPasswordLabel" aria-label="Password" data-error-class="u-has-error" data-msg="Su contraseña es inválida. Inténtalo de nuevo." data-success-class="u-has-success" required>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-end mb-4">
      <a class="js-animation-link small link-muted" href="javascript:;" data-animation-in="slideInUp" data-link-group="idForm" data-target="#forgotPassword">¿Se te olvidó tu contraseña?</a>
    </div>

    <div class="mb-2">
      <button class="btn btn-block btn-sm btn-primary transition-3d-hover" type="submit">Iniciar sesión</button>
    </div>
  </form>
</template>

<script>
import { mapActions} from 'vuex';

export default {
  name: "SignIn",
  data() {
    return {
      User: {},
    }
  },
  methods:{
    ...mapActions(['signIn','openLoader']),    
  },
};
</script>