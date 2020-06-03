<template>
  <div class="container space-top-1 space-bottom-2">
    <h3 class="text-center">
      <i class="fas fa-database"></i> Base de Datos |
      <span class="text-secondary">Productos</span>
    </h3>
    <div class="row space-top-1">
      <div class="col-12 mb-md-3">
        <div class="row">
          <!-- Search -->
          <div class="js-focus-state input-group col-12 col-md-6 mb-md-0">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <span class="fas fa-search"></span>
              </span>
            </div>
            <input class="form-control" v-model="search" type="text" placeholder="Buscar Productos" aria-label="Buscar Productos">
          </div>
          <!-- End Search -->

          <!-- new product -->
          <router-link class="btn btn-primary ml-auto" role="button" to="products/new" 
            data-target="#modalFormProduct"           
            data-toggle="modal" 
            data-backdrop="static" 
            data-keyboard="false">
            <i class="fas fa-plus-circle"></i>Añadir Producto
          </router-link>
          <!-- End new product -->
          <!-- new product -->
          <router-link class="btn btn-secondary" to="./sections" role="button" 
            data-target="#modalFormSection" 
            data-toggle="modal"
            data-backdrop="static" 
            data-keyboard="false">
            <i class="fas fa-store"></i>Secciones
          </router-link>
          <!-- End new product -->
        </div>
      </div>
      <div class="col-12 col-lg">
        <nav aria-label="Page navigation mt-3">
          <ul class="pagination justify-content-start">
            <li :class="['page-item', {'d-none':!page}]">
              <a class="link p-2 h6" href="javascript:;" tabindex="-1" @click="page--">Anterior</a>
            </li>
            <li class="page-item" v-for="(list, index) of listProductLength" :key="list.id">
              <a href="javascript:;" :class="['page-link', {'active': index === page}]" @click="page = index">{{index+1}}</a>
            </li>
            <li :class="['page-item', {'d-none':page===listProductLength-1}]">
              <a class="link p-2 h6" href="javascript:;" @click="page++">Siguiente</a>
            </li>
            <li class="mt-3 ml-auto">
              <h5 class="text-right ml-auto">Mostrando {{(page*200)+1}} a {{(page+1)*200}} de {{listProductLength}} Paginas</h5>
            </li>
          </ul>
        </nav>
        <hr>
        <div class="row pb-2 bg-light border-light border">
          <div class="col col-md-3 mt-3" v-for="product of products.slice(page*200, (page+1)*200)" :key="product.id">
            <!-- Product -->
            <div class="transition-3d-hover card text-center h-200 shadow-sm">
              <div class="position-relative">
                <img class="card-img-top w-35 pt-3" alt="Image Description" :src="product.img">
              </div>

              <div class="card-body pt-4 px-4 pb-0">
                <div class="mb-2">
                  <h3 class="h5">
                    <a class="text-black" href="javascript:;">{{product.name}}</a>
                  </h3>
                  <a class="d-inline-block small font-weight-medium mb-1" href="javascript:;">{{product.weight}}</a>
                  <div class="d-block font-size-1">
                    <span class="h4">${{formatPrice(product.price)}}</span>
                  </div>
                </div>
              </div>

              <div class="card-footer border-0 px-4 d-flex justify-content-between">
                <router-link :to="{name:'editProduct', params: {id: product.id}}">
                  <button class="btn btn-sm btn-soft-warning " type="button" data-target="#modalFormProduct" data-toggle="modal">
                    <i class="fas fa-edit"></i>Editar
                  </button>
                </router-link>
                <button class="btn btn-sm btn-soft-danger " type="button" @click="deleteProduct(product)">
                  <i class="fas fa-trash-alt"></i> Borrar
                </button>
                <button v-show="product.active" class="btn btn-sm btn-soft-darker" type="button" @click="ActiveProduct(product.id, false)">
                  <i class="fas fa-stop-circle"></i> Anular
                </button>
                <button v-show="!product.active" class="btn btn-sm btn-soft-success" type="button" @click="ActiveProduct(product.id, true)">
                  <i class="fas fa-check"></i> Activar
                </button>
              </div>
            </div>
            <!-- End Product -->
          </div>
        </div>
        <hr>
        <nav aria-label="Page navigation mt-3">
          <ul class="pagination justify-content-start">            
            <li class="mt-3 mr-auto">
              <h5 class="text-right ml-auto">Mostrando {{(page*200)+1}} a {{(page+1)*200}} de {{listProductLength}} Paginas</h5>
            </li>
            <li :class="['page-item', {'d-none':!page}]">
              <a class="link p-2 h6" href="javascript:;" tabindex="-1" @click="page--">Anterior</a>
            </li>
            <li class="page-item" v-for="(list, index) of listProductLength" :key="list.id">
              <a href="javascript:;" :class="['page-link', {'active': index === page}]" @click="page = index">{{index+1}}</a>
            </li>
            <li :class="['page-item', {'d-none':page===listProductLength-1}]">
              <a class="link p-2 h6" href="javascript:;" @click="page++">Siguiente</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      page: 0,
      search: '',
    };
  },
  created() {
    this.getDatas(["Products"]);
    this.$store.state.file = false;
  },  
  computed: {
    ...mapState(["Products"]),
    listProductLength() {
      return Math.ceil(this.Products.length / 200);
    },       
    products(){
      if(this.search.length >= 3){
        return this.Products.filter(product => {
          return (product.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0) || (product.description.toLowerCase().indexOf(this.search.toLowerCase()) >= 0)
        })
      }else{
        return this.Products
      }
    },
  },
  methods: {
    ...mapActions(["getDatas", "deleteData", "updateData"]), 
    formatPrice(value) {
      let val = (value / 1).toFixed().replace(".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    deleteProduct(product) {
      if (product.img) {
        this.deleteData([
          {
            ref: "Products",
            id: product.id,
            file: {
              type:
                "image/" +
                product.img
                  .split("?")[0]
                  .split(".")
                  .pop()
            }
          }
        ]);
      } else {
        this.deleteData([
          {
            ref: "Products",
            id: product.id
          }
        ]);
      }
    },
    ActiveProduct(id, active){
      let Product = {id, active}
      this.updateData([{ref:"Products", data: Product}])
    }
  },
};
</script>