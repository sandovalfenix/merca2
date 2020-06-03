<template>
  <form id="formSignUp" class="js-validate" @submit.prevent="signUp(User)">
    <div id="intro" data-target-group="signup">
      <div class="form-group">
        <div class="js-form-message js-focus-state">
          <h4 class="text-center mb-3">¿Eres cliente "referido" SARP?</h4>
          <div class="d-flex justify-content-around">
            <a href="javascript:;" class="js-animation-link btn btn-lg btn-soft-success" data-animation-in="slideInUp" data-link-group="signup" data-target="#codeRef">SI</a>
            <a href="javascript:;" class="js-animation-link btn btn-lg btn-soft-danger" data-animation-in="slideInUp" data-link-group="signup" data-target="#user" @click="addRefMerca2">NO</a>
          </div>
        </div>
      </div>
    </div>
    
    <div id="codeRef" style="display: none; opacity: 0;"  data-target-group="signup" >
      <!-- Form Group -->
      <div class="form-group">
        <div class="js-form-message js-focus-state">
          <label for="signupCodeRef" class="font-size-2 text-center mb-3">Ingrese el <b>codigo de su referido</b> para continuar</label>
            <div class="row">
              <input class="form-control form-control-lg col mx-3 text-center" v-model="codeRef.one" type="text" placeholder="0" maxlength="1">
              <input class="form-control form-control-lg col mx-3 text-center" v-model="codeRef.two" type="text" placeholder="0" maxlength="1">
              <input class="form-control form-control-lg col mx-3 text-center" v-model="codeRef.three" type="text" placeholder="0" maxlength="1">
              <input class="form-control form-control-lg col mx-3 text-center" v-model="codeRef.four" type="text" placeholder="0" maxlength="1">
            </div>
            <br>
            <h5 v-if="!nextCodeRef && codeRef.four" class="text-danger text-center">
              <span v-if="error">
                {{error}}
              </span>
              <span v-else>
                El codigo introducido es invalido
              </span>
            </h5>                    
        </div>
      </div>
      <!-- End Input -->         
        
      <div class="mb-2">
        <a href="javascript:;" data-animation-in="slideInUp" data-link-group="signup" data-target="#user" :class="['js-animation-link btn btn-block btn-primary',{'d-none':!nextCodeRef}]">Continuar</a>
      </div>
    </div>

    <div id="user" style="display: none; opacity: 0;" data-target-group="signup">
      <!-- Form Group -->
      <div class="form-group">
        <div class="js-form-message js-focus-state">
          <label class="sr-only" for="signupID">Nº Identificacion</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span :class="['input-group-text',{'border-danger': doubleID}]" id="signupIDLabel">
                <span :class="['fas fa-id-card', {'text-danger': doubleID}]"></span>
              </span>
            </div>
            <input :class="['form-control', {'border-danger': doubleID}]" id="signupID" v-model="User.ID" type="text" placeholder="Nº Identificacion" @keyup="verifyID(User.ID)" aria-describedby="signupIDLabel" aria-label="Nº Identificacion" data-error-class="u-has-error" data-msg="El numero de identificacion es invalido" data-success-class="u-has-success" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" data-rule-minlength="7" required>
          </div>
          
          <p v-show="doubleID && User.ID.length > 6" class="small text-danger">El <b>numero de identificacion</b>, ya se encuentra registrado</p>
        </div>
      </div>
      <!-- End Input -->
      <!-- Form Group -->
      <div class="form-group">
        <div class="js-form-message js-focus-state">
          <label class="sr-only" for="signupName">Nombres</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="signupNameLabel">
                <span class="fas fa-user"></span>
              </span>
            </div>
            <input class="form-control" id="signupName" v-model="User.name" type="text" placeholder="Nombres" aria-describedby="signupNameLabel" aria-label="Name" data-error-class="u-has-error" data-msg="Por favor, introduce un nombre valido válida." data-success-class="u-has-success" data-rule-minlength="3" required>
          </div>
        </div>
      </div>
      <!-- End Input -->
      
      <!-- Form Group -->
      <div class="form-group">
        <div class="js-form-message js-focus-state">
          <label class="sr-only" for="signupLasName">Apellidos</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="signupLasNameLabel">
                <span class="fas fa-user"></span>
              </span>
            </div>
            <input class="form-control" id="signupLasName" v-model="User.lastName" type="text" placeholder="Apellidos" aria-describedby="signupLasNameLabel" aria-label="LastName"  data-error-class="u-has-error" data-msg="Por favor, introduce un nombre valido válida." data-success-class="u-has-success" data-rule-minlength="3" required>
          </div>
        </div>
      </div>
      <!-- End Input -->

      <div class="mb-2">
        <a href="javascript:;" data-animation-in="slideInUp" data-link-group="signup" data-target="#email" :class="['js-animation-link btn btn-block btn-primary',{'d-none':((!User.name) || (!User.lastName) || (!User.ID) || (doubleID))}]">Continuar</a>
      </div>
    </div>
    
    <div id="email" style="display: none; opacity: 0;" data-target-group="signup">
      <!-- Form Group -->
      <div class="form-group">
        <div class="js-form-message js-focus-state">
          <label class="sr-only" for="signupEmail">Correo Electronico</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span :class="['input-group-text',{'border-danger': doubleEmail}]" id="signupEmailLabel">
                <span :class="['fas fa-mail-bulk', {'text-danger': doubleEmail}]"></span>
              </span>
            </div>
            <input :class="['form-control', {'border-danger': doubleEmail}]" id="signupEmail" v-model="User.email" @keyup="verifyEmail(User.email)" type="email" placeholder="Correo Electronico" aria-describedby="signupEmailLabel" aria-label="Email" data-error-class="u-has-error" data-msg="Por favor, introduce una dirección de correo electrónico válida." data-success-class="u-has-success" required>
          </div>
          <p v-show="doubleEmail" class="small text-danger">La direccion de <b>correo electronico</b>, ya se encuentra registrada</p>
        </div>
      </div>
      <!-- End Input -->
      
      <!-- Form Group -->
      <div class="form-group">
        <div class="js-form-message js-focus-state">
          <label class="sr-only" for="signupPassword">Contraseña</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="signupPasswordLabel">
                <span class="fas fa-lock"></span>
              </span>
            </div>
            <input class="form-control" id="signupPassword" v-model="User.password" type="password" placeholder="Contraseña" aria-describedby="signupPasswordLabel" aria-label="Password" data-error-class="u-has-error" data-msg="Su contraseña es inválida. Inténtalo de nuevo." data-success-class="u-has-success" data-rule-minlength="6" required>
          </div>
        </div>
      </div>
      <!-- End Input -->

      <!-- Form Group -->
      <div class="form-group">
        <div class="js-form-message js-focus-state">
          <label class="sr-only" for="signupConfirmPassword">Confirmar Contraseña</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="signupConfirmPasswordLabel">
                <span class="fas fa-key"></span>
              </span>
            </div>
            <input class="form-control" id="signupConfirmPassword" name="confirmPassword" v-model="password2" type="password" placeholder="Confirmar Contraseña" aria-describedby="signupConfirmPasswordLabel" aria-label="Confirmar Contraseña" data-error-class="u-has-error" data-msg="La contraseña no coincide con la contraseña de confirmación." data-success-class="u-has-success" required>
          </div>
        </div>
      </div>
      <!-- End Input -->

      <div class="mb-2">
        <button :class="['btn btn-block btn-sm btn-primary transition-3d-hover', {'d-none': ((User.password != password2)||(!User.email)||(!User.password)||(password2.length < 6)||(doubleEmail))}]" type="submit" >Empezar</button>
      </div>
    </div>

    <div class="text-center mt-4">
      <a href="/login" class="link-dark h6">Regresar al Inicio</a>
    </div>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: "SignUp",
  data() {
    return {
      User: {},
      error: false,
      loader: false,
      codeRef:{},
      verifyCodeRef: false,
      doubleID: false,
      doubleEmail: false,
      password2: '',
    }
  },
  created() {
    this.getDatas(['Users'])
  },
  computed:{
    ...mapState(['Users','UserAuth']),
    nextCodeRef(){ 
      if(this.codeRef.one && this.codeRef.two && this.codeRef.three && this.codeRef.four){
        var codeRef = this.codeRef.one + this.codeRef.two + this.codeRef.three + this.codeRef.four;
        this.verifyCode(codeRef)
      }
      return this.verifyCodeRef
    }
  },
  methods:{
    ...mapActions(['signUp', 'addData', 'getDatas','openLoader']),
    verifyID(ID){
      const User = this.Users.find(user => ID === user.ID);
      this.doubleID = (User) ? true : false;
    },
    verifyEmail(email){
      const User = this.Users.find(user => email === user.email);
      this.doubleEmail = (User) ? true : false;
    },
    verifyCode(codeRef){      
      let Data = false;
      
      if(this.Users){
        const User = this.Users.find(user => codeRef === user.codeRef); 
        if (User.active) {
          this.User.ref = User;
          this.User.ref.id = User.id;
          this.User.refs = this.newCodeRef();
          Data = true;
        }else{
          Data = false;
          this.error = "Este referido, no se encuentra disponible";
        }
      }

      this.verifyCodeRef = Data;
    },
    newCodeRef(){
      var newRef = false
      var code = this.getRandomInt(1, 9999);
      do {
        this.Users.forEach(user => {
          if(parseInt(user.codeRef) === Math.round(code)){
            newRef = true
          }
        })
        code = this.getRandomInt(1, 9999);
      } while (newRef);

      return code
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    addRefMerca2(){
      this.verifyCode("9999");
    }
  },
};
</script>