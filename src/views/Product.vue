<template>
  <div class="p-2">
    <!-- Products -->    
    <router-link to="/" class="position-absolute left-0 top-0 m-3 z-index-2">
      <i class="fas fa-arrow-left fa-2x"></i>
    </router-link>
    <li class="card py-3 mb-5 shadow-soft">
      <div class="row">
        <div class="media col-4 pr-0 pl-10">
          <img v-if="Product.img" class="img-fluid" :src="Product.img" alt="">
          <img v-else class="img-fluid" src="@/assets/logo_merca2.png" alt="">
        </div>

        <div class="col-8">
          <div class="card-body py-3 px-md-4">
            <div class="mb-2">
              <h2 class="h3 font-weight-normal font-weight-bold">
                <span class="text-dark" >{{Product.name}}</span>
              </h2>
              <span class="text-gray-dark">{{Product.weight}}</span>
              <div class="d-block mt-5">
                <h3 class="h3 font-weight-bold text-secondary">${{formatPrice(Product.price)}}</h3>
                <span v-show="Product.description">
                  <h6 class="font-weight-bold text-light">Description:</h6>
                  <span class="small text-light">{{Product.description}}</span>
                </span>
              </div>
            </div>
            <button type="button" class="btn btn-soft-primary btn-sm-wide btn-pill transition-3d-hover mr-1 rounded mt-3" @click="addCartItems(Product)">Agregar</button>
          </div>
        </div>
      </div>
    </li>
    <!-- End Products -->
    <h1 v-if="carouselLength()" class="h4 my-3 pl-3"><i class="nova-shopping-cart mr-2"></i> Productos Relacionados</h1>
    
    <div class="row mx-n2 mx-sm-n3">
      <div class="col-12 col-md-6 col-lg-12 px-2 px-sm-3 mb-3 mb-sm-5">
        <div id="carouselExampleControls2" class="carousel slide" data-ride="false">
          <div class="carousel-inner">
            <div v-for="(carousel, index) of carouselLength()" :key="index" :class="['carousel-item', {'active': index == 0}]">
              <div class="row">
                <div v-for="Item of productsFilterSection(Product.section.id).slice(index*4, (index+1)*4)"  :key="Item.id" class="col-6 col-md-3 my-3 my-md-0 px-1">
                    <!-- Product -->
                  <div class="transition-3d-hover card text-center h-100 shadow-sm">
                    <router-link :to="'/product/'+Item.id">
                      <div class="position-relative">
                        <img class="card-img-top w-40 pt-3" :src="Item.img">
                      </div>
                      
                    </router-link>

                      <div class="card-body pt-4 px-4 pb-0">
                        <div class="mb-2">
                          <h6 class="font-weight-bold">
                            <router-link :to="'/product/'+Item.id" class="text-black">{{Item.name}}</router-link>
                          </h6>              
                          <span class="d-inline-block small font-weight-medium mb-1" >{{Item.weight}}</span>
                          <div class="d-block">
                            <span class="h4 text-secondary font-weight-bold">${{formatPrice(Item.price)}}</span>
                          </div>
                        </div>
                      </div>
                    <div class="card-footer border-0 pt-0 pb-4 px-4">
                      <a href="javascript:;" class="btn btn-sm btn-soft-primary btn-block btn-pill transition-3d-hover" @click="addCartItems(Item)">Agregar</a>
                    </div>
                  </div>
                  <!-- End Product -->
                </div>
              </div>
            </div>
          </div>
          <a class="carousel-control-prev bg-primary bg-transparent" href="#carouselExampleControls2" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next bg-primary bg-transparent" href="#carouselExampleControls2" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Product",
  created() {
    this.getDatas(['Products']),
    this.getData([{ ref: "Products", id: this.$route.params.id }]);
  },  
  computed: {
    ...mapState(["Product",'Products'])
  },
  methods: {
    ...mapActions(["getData", 'getDatas', 'addCartItems']),    
    formatPrice(value) {
      let val = (value / 1).toFixed().replace(".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },    
    productsFilterSection(idSection){
      return this.Products.filter(product =>{
        return product.section.id == idSection;
      })
    },    
    carouselLength(){
      if(this.Product.section){
        return Math.round(this.productsFilterSection(this.Product.section.id).length/4)
      }
    },
  },
}
</script>

<style scoped>
.carousel-control-prev, .carousel-control-next{
  width: 5%;
}
</style>


