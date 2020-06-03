<template>
  <div v-if="Section" class="py-4 px-3 px-md-4">
    <h4 class="font-weight-bold mb-5">{{Section.name}}</h4>
    <!-- Carousel -->
    <CarouselAds/>
    <!-- End Carosel -->
    <div v-for="(subSection, index) in subSections" :key="index" class="row">
      <h1 v-if="productsSection(index).length" class="font-size-2 my-3 bg-primary text-white font-weight-bold pl-4 rounded w-100">{{subSection}}</h1>
      <div v-for="product of productsSection(index)" :key="product.id" class="col-6 col-md-3 my-2 px-1">        
          <!-- Product -->
          <div class="transition-3d-hover card text-center h-100 shadow-sm">
            <router-link :to="'/product/'+product.id">
              <div class="position-relative">
                <img class="card-img-top w-40 pt-3" :src="product.img">
              </div>
              
            </router-link>

              <div class="card-body pt-4 px-4 pb-0">
                <div class="mb-2">
                  <h6 class="font-weight-bold">
                    <router-link :to="'/product/'+product.id" class="text-black">{{product.name}}</router-link>
                  </h6>              
                  <span class="d-inline-block small font-weight-medium mb-1" >{{product.weight}}</span>
                  <div class="d-block">
                    <span class="h4 text-secondary font-weight-bold">${{formatPrice(product.price)}}</span>
                  </div>
                </div>
              </div>
            <div class="card-footer border-0 pt-0 pb-4 px-4">
              <a href="javascript:;" class="btn btn-sm btn-soft-primary btn-block btn-pill transition-3d-hover" @click="addCartItems(product)">Agregar</a>
            </div>
          </div>
          <!-- End Product -->
      </div>
    </div>
  </div>
</template>

<script>
import CarouselAds from '@/components/CarouselAds.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Section',
  created(){
    this.getData([{ref: 'Sections', id: this.$route.params.id}]);
    this.getDatas(['Products']);
  },
  computed:{
    ...mapState(['Section','Products', 'Search']),
    subSections(){
      var i = (!isNaN(parseInt(this.$route.params.index))) ? (parseInt(this.$route.params.index)) : false

      return (this.Section.subSections) ? (i) ? this.Section.subSections[i] : this.Section.subSections : []
    }
  },
  methods:{
    ...mapActions(['getDatas', 'getData', 'addCartItems']),
    productsSection(index){
      return this.Products.filter(p =>{
          if(!isNaN(parseInt(this.$route.params.index))){
            return p.section.id === this.Section.id && p.section.subSection === parseInt(this.$route.params.index) && index === parseInt(this.$route.params.index) && p.active && (p.name.toLowerCase().indexOf(this.Search.toLowerCase()) > -1)
          }else{
            return p.section.id === this.Section.id && p.section.subSection === index && p.active && (p.name.toLowerCase().indexOf(this.Search.toLowerCase()) > -1)
          }
        })
    },
    formatPrice(value) {
      let val = (value / 1).toFixed().replace(".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
  components:{
    CarouselAds
  }
}
</script>

<style scoped>
.carousel-item > img{
  height: 300px;
}
.carousel-control-prev, .carousel-control-next{
  width: 5%;
}
</style>
