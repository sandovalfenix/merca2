<template>
  <div class="py-4 px-3 px-md-4">
    <!-- Carousel -->
    <CarouselAds/>
    <!-- End Carosel -->
    <!-- Icon Blocks -->
    <div class="d-none d-md-block space-top-2">
      <div class="row">
        <div class="col mb-5 mb-md-3">
          <!-- Contacts -->
          <div class="media">
            <span class="btn btn-icon btn-soft-secondary rounded-circle mr-3">
              <span class="fas fa-shipping-fast btn-icon__inner fa-2x"></span>
            </span>
            <div class="media-body">
              <h4 class="h6 text-secondary font-weight-normal mb-0">Pide desde Casa</h4>
              <span class="d-block font-size-1">Pide ahora y te llega en dos horas a la comodidad de tu Hogar.</span>
            </div>
          </div>
          <!-- End Contacts -->
        </div>

        <div class="col mb-5 mb-md-3">
          <!-- Contacts -->
          <div class="media">
            <span class="btn btn-icon btn-soft-secondary rounded-circle mr-3">
              <span class="fas fa-shopping-bag btn-icon__inner fa-2x"></span>
            </span>
            <div class="media-body">
              <h4 class="h6 text-secondary font-weight-normal mb-0">Paga en tu Casa</h4>
              <span class="d-block font-size-1">Paga contraentrega cuando te llegue tu pedido</span>
            </div>
          </div>
          <!-- End Contacts -->
        </div>

        <div class="col mb-5 mb-md-3">
          <!-- Contacts -->
          <div class="media">
            <span class="btn btn-icon btn-soft-secondary rounded-circle mr-3">
              <span class="fas fa-smile btn-icon__inner fa-2x"></span>
            </span>
            <div class="media-body">
              <h4 class="h6 text-secondary font-weight-normal mb-0">Cambios y Devoluciones</h4>
              <span class="d-block font-size-1">Con nosotros cambiar de opinión no es un problema.</span>
            </div>
          </div>
          <!-- End Contacts -->
        </div>

        <div class="col">
          <!-- Contacts -->
          <div class="media">
            <span class="btn btn-icon btn-soft-secondary rounded-circle mr-3">
              <span class="fas fa-lock btn-icon__inner fa-2x"></span>
            </span>
            <div class="media-body">
              <h4 class="h6 text-secondary font-weight-normal mb-0">Compra Tranquilo</h4>
              <span class="d-block font-size-1">Garantía de calidad del Producto y seguridad en la transacción</span>
            </div>
          </div>
          <!-- End Contacts -->
        </div>
      </div>
    </div>
    <!-- End Icon Blocks -->
    <!-- Products -->
    <div v-for="(section, indexS) of Sections" :key="indexS" :class="['row mx-n2 mx-sm-n3', {'d-none': !carouselLength(section.id)}]">  
      <h3 class="my-3 bg-primary text-white pl-4 rounded w-100">{{section.name}}</h3> 
      <!--div v-if="carouselLength(section.id) > 0" class="d-none d-lg-block col-lg-3 px-2 px-sm-3 mb-3 mb-sm-5 rounded">
        <div class="card text-center h-100 shadow-sm bg-img-hero" :style="'background-image: url('+section.img+');'">

          <div class="card-body py-4">
            <h3 class="h4 text-white mb-4">{{section.name}}</h3>
          </div>

          <div class="card-footer border-0 pt-0 pb-4 px-4">
            <button type="button" class="btn btn-sm btn-primary btn-block btn-pill transition-3d-hover">Ir a esta Seccion</button>
          </div>
        </div>
      </div-->
      <div class="col-12 col-md-6 col-lg-12 px-0 px-sm-3 mb-3 mb-sm-5">
        <div :id="'carouselProductsControls'+indexS" class="carousel slide" data-ride="false">
          <div class="carousel-inner">
            <div v-for="(carousel, index) of carouselLength(section.id)" :key="carousel.id" :class="['carousel-item', {'active': index == 0}]">
              <div class="row">
                <div v-for="Product of products[section.id].slice(index*4, (index+1)*4)"  :key="Product.id" class="col-6 col-md-3 my-3 my-md-0 px-1">
                    <!-- Product -->
                  <div class="transition-3d-hover card text-center h-100 shadow-sm">
                    <router-link :to="'/product/'+Product.id">
                      <div class="position-relative">
                        <img class="card-img-top w-40 pt-3" :src="Product.img">
                      </div>
                      
                    </router-link>

                      <div class="card-body pt-4 px-4 pb-0">
                        <div class="mb-2">
                          <h6 class="font-weight-bold">
                            <router-link :to="'/product/'+Product.id" class="text-black">{{Product.name}}</router-link>
                          </h6>              
                          <span class="d-inline-block small font-weight-medium mb-1" >{{Product.weight}}</span>
                          <div class="d-block">
                            <span class="h4 text-secondary font-weight-bold">${{formatPrice(Product.price)}}</span>
                          </div>
                        </div>
                      </div>
                    <div class="card-footer border-0 pt-0 pb-4 px-4">
                      <a href="javascript:;" class="btn btn-sm btn-soft-primary btn-block btn-pill transition-3d-hover" @click="addCartItems(Product)">Agregar</a>
                    </div>
                  </div>
                  <!-- End Product -->
                </div>
              </div>
            </div>
          </div>
          <a class="carousel-control-prev bg-primary bg-transparent d-none d-md-flex" :href="'#carouselProductsControls'+indexS" role="button" data-slide="prev" style="left: -30px; width: 30px">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next bg-primary bg-transparent d-none d-md-flex" :href="'#carouselProductsControls'+indexS" role="button" data-slide="next" style="right: -30px; width: 30px">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
    <!-- Ends Products -->
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import CarouselAds from "@/components/CarouselAds.vue";

export default {
  components: {    
    CarouselAds,
  },  
  created(){
    this.getDatas(["Products", "Sections"])
  },
  computed:{
    ...mapState(['Products', 'Sections', 'Search']),        
    products(){
      const products = []
      this.Sections.forEach(section =>{                 
        products[section.id] = [];

        this.Products.filter(p => p.name.toLowerCase().indexOf(this.Search.toLowerCase()) > -1).forEach(product =>{  
          if(section.id === product.section.id && product.active){  
            products[section.id].push(product);
          }
        })
      })
      return products
    },
  },
  methods:{
    ...mapActions(['getDatas','updateData', 'addCartItems']),        
    formatPrice(value) {
      let val = (value / 1).toFixed().replace('.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    carouselLength(idSection){
      if(this.products[idSection]){
        return Math.round(this.products[idSection].length/4)
      }else{
        return false
      }
    },
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


