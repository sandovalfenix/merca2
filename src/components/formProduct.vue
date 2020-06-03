<template>
  <div class="container space-top-1 space-bottom-2">
    <h5>
      <span v-if="$route.params.id">Editar</span>
      <span v-else="">Nuevo</span> Producto
    </h5>
    <form class="row" @submit.prevent="submitAction">
      <div class="form-group col-md-6">
        <label class="sr-only">Nombre</label>
        <input class="form-control" id="productName" type="text" placeholder="Nombre Producto" required v-model="Product.name">
      </div>
      <div class="form-group col-md-6">
        <label class="sr-only">Unidad de Medida</label>
        <input class="form-control" id="productWeight" type="text" placeholder="Unidad de Medida" required v-model="Product.weight">
      </div>
      <div class="form-group col-md-6">
        <label class="sr-only">Precio</label>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">$</span>
          </div>
          <input class="form-control" id="productPrice" type="number" placeholder="Precio" required v-model="Product.price">
        </div>
      </div>
      <div class="form-group col-md-6">
        <label class="sr-only">IVA</label>
        <div class="input-group mb-3">
          <input class="form-control" id="productIva" type="number" placeholder="IVA" required v-model="Product.iva">        
          <div class="input-group-prepend">
            <span class="input-group-text">%</span>
          </div>
        </div>
      </div>
      <div class="form-group col-md-12 mb-5">
        <label>Grupo Seccion</label>
        <!-- Select -->
        <select class="form-control" required v-model="Product.section" data-style="btn-sm btn-primary">
          <option :value="'undefined'" disabled>Selecionar</option>
          <optgroup v-for="Section of Sections" :key="Section.id" :label="Section.name">
            <option v-for="(subSection, index) of Section.subSections" :key="subSection.id" :value="{id: Section.id, subSection: index}">{{subSection}}</option>
          </optgroup>
        </select>
        <!-- End Select -->
        <!-- Button trigger modal -->
        <a href="javascript:;" data-target="#modalFormSection" data-toggle="modal">¿Añadir nuevo grupo?</a>
      </div>
      <div class="form-group col">
        <textarea class="form-control" v-model="Product.description" required placeholder="Descripcion del producto..." rows="3"></textarea>
      </div>
      <div class="col-12 text-center border border-primary" v-show="this.file ||Product.img">
        <img class="img-fluid w-25" v-if="!this.file.photoURL" :src="Product.img">
        <img class="img-fluid w-50" v-else :src="this.file.photoURL">
      </div>
      <div class="form-group col-12 d-flex justify-content-center mt-3">
        <input class="form-control-file d-none" id="productImg" type="file" placeholder="Imagen de Producto" @change="handleFileUpload($event)" ref="file">
        <a class="btn btn-soft-primary transition-3d-hover" href="javascript:;" @click="$refs.file.click()">Buscar Imagen</a>
      </div>
      <span v-if="error" class="text-danger font-bold">{{error}}</span>
      <div class="col-12 d-flex justify-content-between mt-3 border-top border-silver pt-4">
        <button class="btn btn-danger mr-3" type="button" @click="$router.go(-1)">Regresar</button>
        <button class="btn btn-warning" type="submit" v-if="id" :disabled="!Product">
          <span>Editar</span>
        </button>
        <button class="btn btn-primary" type="submit" v-else :disabled="!Product">
          <span>Añadir</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "formProduct",
  data() {
    return {
      id: this.$route.params.id,
      error: false
    };
  },
  created() {
    this.getDatas(["Sections"]);
    this.getData([{ ref: "Products", id: this.id }]);
  },
  methods: {
    ...mapActions([
      "getDatas",
      "getData",
      "updateData",
      "addData",
      "uploadFiles",
      "handleFileUpload"
    ]),
    submitAction() {
      if (this.id && this.Product.section) {
        this.updateData([
          {
            ref: "Products",
            data: this.Product,
            file: this.file
          }
        ]);
      } else if(this.Product.section) {
        this.addData([
          {
            ref: "Products",
            data: this.Product,
            file: this.file,
          }
        ]);        
      }else{
        this.error = 'No has Asignado una seccion para este producto'
      }
      
      setTimeout(()=> {
        window.location.href = '/dashboard/products'
      }, 5000)
    },
  },
  computed: {
    ...mapState(["Sections", "Product", "file"])
  }
};
</script>