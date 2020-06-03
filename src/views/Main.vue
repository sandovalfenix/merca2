<template>
  <div class="overflow-hidden"> 
    <Header/>
    <main class="main">
      <SidebarNav/>
      <!--div class="alert alert-warning position-fixed z-index-4 alert-dismissible fade show" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          <span class="sr-only">Close</span>
        </button>
        <h4 class="alert-heading">Hola! Cliente SARP Colombia</h4>
        <p class="mb-0"><b>Te avisamos que todavía nos encontramos en etapa de desarrollo y por el momento, no atendemos pedidos</b>. Pero queremos que tengas la oportunidad de poder explorar nuestra plataforma. <a href="https://www.facebook.com/sarpcolombia.com" target="_blank">Dejanos tus comentarios aquí</a></p>
      </div-->
      <div class="content">
        <router-view />
        <!-- Footer -->
        <footer class="small bg-primary p-3 px-md-4 mt-auto d-print-none text-white">
          <div class="row justify-content-between">
            <div class="col-lg text-center text-lg-left mb-3 mb-lg-0">
              <ul class="list-dot list-inline mb-0">
                <li class="list-dot-item list-dot-item-not list-inline-item mr-lg-2">
                  <a class="link-white" href="javascript:;">FAQ</a>
                </li>
                <li class="list-dot-item list-inline-item mr-lg-2">
                  <a class="link-white" href="javascript:;">Soporte</a>
                </li>
                <li class="list-dot-item list-inline-item mr-lg-2">
                  <a class="link-white" href="javascript:;">Contactanos</a>
                </li>
              </ul>
            </div>

            <div class="col-lg text-center mb-3 mb-lg-0">
              <ul class="list-inline mb-0">
                <li class="list-inline-item mx-2">
                  <a class="link-white" href="javascript:;">
                    <i class="nova-facebook fa-2x"></i>
                  </a>
                </li>
                <li class="list-inline-item mx-2">
                  <a class="link-white" href="javascript:;">
                    <i class="nova-instagram fa-2x"></i>
                  </a>
                </li>
              </ul>
            </div>

            <div class="col-lg text-center text-lg-right">&copy; 2020 SARP SAS. Todos los derechos reservados.</div>
          </div>
        </footer>
        <!-- End Footer -->
      </div>
    </main>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import SidebarNav from "@/components/SidebarNav.vue";

export default {  
  components: {    
    Header,
    SidebarNav,
  },
};
</script>

<style>
.side-nav-hide-on-closed {
  display: unset;
}
.u-slick__arrow-classic:hover {
  background-color: rgba(208, 12, 110, 0.38);
}
.input-group.input-group-merge .form-control,
.input-group.input-group-merge .form-control-alt {
  border-radius: 0.5rem;
}
</style> 