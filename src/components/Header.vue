<template>
  <!-- Header -->
  <header class="bg-white u-header--fix-top u-header">
    <nav class="navbar flex-nowrap p-0 border-bottom">
      <div class="navbar-brand-wrapper col-auto bg-white text-center border-bottom">
        <!-- Logo For Mobile View -->
        <a class="navbar-brand navbar-brand-mobile" href="/">
          <img class="img-fluid" src="@/assets/logo_merca2.png" alt="Nova">
        </a>
        <!-- End Logo For Mobile View -->

        <!-- Logo For Desktop View -->
        <a class="navbar-brand navbar-brand-desktop" href="/">
          <img class="side-nav-hide-on-closed w-30" src="@/assets/logo_merca2.png" alt="Nova">
        </a>
        <!-- End Logo For Desktop View -->
      </div>

      <div class="header-content col pl-md-0 my-2">
        <div class="d-flex align-items-center">
          <!-- Header Search -->
          <div class="js-header-search position-relative" data-search-clear="#headerSearchResultsClear" data-search-field="#headerSearchField" data-search-form="#headerSearchForm" data-search-mobile-invoker="#headerSearchMobileInvoker" data-search-target="#headerSearchResults">
            <a class="header-search-invoker header-invoker" id="headerSearchMobileInvoker" href="#">
              <i class="nova-search"></i>
            </a>

            <div class="header-search input-group input-group-merge" id="headerSearchForm">
              <input class="header-search-input form-control form-control-append-icon" id="headerSearchField" type="text" placeholder="Buscar Producto" v-model="search" @keyup="setSearch(search)">
              <div class="input-group-append-merge focus-hide">
                <i class="nova-search icon-text"></i>
              </div>
              <div class="input-group-append-merge focus-show">
                <span id="headerSearchResultsClear">
                  <i class="nova-close icon-text"></i>
                </span>
              </div>

              <!--div class="js-custom-scroll unfold unfold-light unfold-top unfold-centered position-absolute w-100 mt-3" id="headerSearchResults">
                <div class="border-bottom px-3 px-md-4 py-3">
                  <h6 class="font-weight-semi-bold mb-3">Productos</h6>

                  <ul class="list-unstyled mb-0">
                    <li v-for="(product, index) in productsFilter" :key="index" class="mb-2">
                      <router-link :to="'/product/'+product.id">{{product.name}}</router-link>
                    </li>
                  </ul>
                </div>

                <div v-show="productsFilterLength > resultSearch" class="px-3 px-md-4 py-3">
                  <a class="link" href="javascript:;" @click="viewAllResultsSearch">Mostrar todos los ({{productsFilterLength}}) Resultados</a>
                </div>
              </div-->
            </div>
          </div>
          <!-- End Header Search -->

          <!-- Header User Dropdown -->
          <div class="dropdown ml-auto">
            <a v-if="!UserAuth" class="header-complex-invoker" href="/login">
              <span class="d-none d-md-block"><b class="text-primary">Inicia sesion</b> o registrate</span>              
              <span class="fas fa-user-circle font-size-2 ml-2"></span>
            </a>
            <a v-show="UserAuth" class="header-complex-invoker" id="profileMenuInvoker" href="#" aria-controls="profileMenu" aria-expanded="false" aria-haspopup="true" data-unfold-animation-in="fadeIn" data-unfold-animation-out="fadeOut" data-unfold-duration="300" data-unfold-event="click" data-unfold-target="#profileMenu" data-unfold-type="css-animation">
              <span class="nova-user my-0  font-size-2 mr-2"></span>
              <span class="d-none d-md-block">{{UserAuth.username}}</span>
              <i class="nova-angle-down d-none d-md-block ml-2"></i>
            </a>

            <ul class="unfold unfold-user unfold-light unfold-top unfold-centered position-absolute pt-2 pb-1 mt-4" id="profileMenu" aria-labelledby="profileMenuInvoker">
              <li class="unfold-item">
                <a v-if="UserAuth.admin" class="unfold-link d-flex align-items-center text-nowrap" href="/dashboard">
                  <span class="unfold-item-icon mr-3">
                    <i class="nova-user"></i>
                  </span>
                  Mi cuenta
                </a>
                <a v-else class="unfold-link d-flex align-items-center text-nowrap" href="/dashboard/adminUser">
                  <span class="unfold-item-icon mr-3">
                    <i class="nova-user"></i>
                  </span>
                  Mi cuenta
                </a>
              </li>
              <li class="unfold-item unfold-item-has-divider">
                <a class="unfold-link d-flex align-items-center text-nowrap" href="javascript:;" @click="signOut">
                  <span class="unfold-item-icon mr-3">
                    <i class="nova-power-off"></i>
                  </span>
                  Cerrar sesión
                </a>
              </li>
            </ul>
          </div>
          <!-- End Header User Dropdown -->

          <!--div class="ml-2">
            <a class="header-invoker" id="notificationsInvoker" href="#location" data-modal-target="#location">
              <span class="text-dark small">
                <span class="d-lg-inline d-none">¿A donde lo llevamos?</span>
                <i class="nova-map-alt font-size-2 my-0 ml-2 text-dark"></i>
              </span>
            </a>
          </div-->

          <!-- Cart Sidebar Toggle -->
          <a class="header-invoker position-relative" id="cartShopInvoker" href="#" aria-controls="cartShop" aria-expanded="false" aria-haspopup="true" data-unfold-animation-in="fadeInRight" data-unfold-animation-out="fadeOutRight" data-unfold-duration="500" data-unfold-event="click" data-unfold-target="#cartShop" data-unfold-type="css-animation">
            <span v-if="cartItemLength" class="badge-outside badge-sm badge-top-right badge-danger rounded-circle">{{cartItemLength}}</span>
            <span class="text-dark small">
              <span class="d-lg-inline d-none">Total: <b>${{formatPrice(totalCartPrices)}}</b></span>
              <i v-if="totalCartPrices === 0" class="nova-shopping-cart font-size-2 my-0 ml-2 text-dark"></i>
              <i v-else class="nova-shopping-cart-full font-size-2 my-0 ml-2 text-dark"></i>
            </span>
          </a>
          <!-- End Cart Sidebar Toggle -->
        </div>
      </div>
    </nav>

    <!-- Side Nav Toggle -->
    <a class="js-side-nav d-md-none border p-3 position-fixed w-100 pr-5 text-center bottom-0 bg-white shadow-soft z-index-2" href="javascript:void(0)" data-close-invoker="#sidebarClose" data-target="#sidebar" data-target-wrapper="body">
      <span class="text-center h5 font-weight-bold">
        <i class="fas fa-bars mr-2"></i>Secciones
      </span>
    </a>
    <!-- End Side Nav Toggle -->
    <SidebarCart/>
  </header>
  <!-- End Header -->
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SidebarCart from "@/components/SidebarCart.vue";

export default {
  name: "Header",
  data() {
    return {
      search: '',
      resultSearch: 5,
    }
  },
  components: {
    SidebarCart,
  },
  created(){
    this.getDatas(['Products'])
  },
  computed: {
    ...mapState(['UserAuth','Products', 'shopCart']),
    productsFilter(){
      if(this.search.length > 2 && this.Products){
        return this.Products.filter(
          product => product.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        ).splice(0, this.resultSearch)
      }else{ 
        return false 
      }
    },
    productsFilterLength(){
      if(this.search.length > 2 && this.Products){
        return this.Products.filter(
          product => product.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        ).length + 1
      }else{ 
        return 0 
      }
    },
    cartItemLength(){
      var length = 0;
      if(this.shopCart){
        length = this.shopCart.length
      }
      return length
    },
    totalCartPrices(){
      if(this.shopCart){
        return this.shopCart.reduce((sum, product) => {
          return sum + (parseInt(product.price) * product.quantity)
        }, 0)
      }else{
        return 0
      }
    },
    
  },
  methods: {
    ...mapActions(['signOut','getDatas', 'setSearch', 'updateData']),                  
    formatPrice(value) {
      let val = (value / 1).toFixed().replace('.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    viewAllResultsSearch(){
      this.resultSearch = this.productsFilterLength
    },
  },
}
</script>

<style scoped="">
@media (min-width: 768px) {
  .w-md-30rem {
    width: 30rem !important;
  }
}
</style>