<template>
<div class="container space-top-1 space-bottom-2">
<h5 class="modal-title" id="modalFormSectionLabel">Secciones</h5>
  <form @submit.prevent="submitAction">
    <div class="form-group">
      <a class="btn btn-block btn-soft-success transition-3d-hover" href="javascript:;" @click="chageSection">
        <span v-if="!newSection">
          <i class="fas fa-plus"></i> Añadir Nueva Seccion
        </span>
        <span v-else="">
          <i class="fas fa-arrow-left"></i> Regresar
        </span>
      </a>
    </div>
    <div class="container" v-show="newSection === true">
      <hr>
      <div class="form-group">
        <label for="">Nombre Seccion</label>
        <input class="form-control" type="text" placeholder="Añadir Nueva Seccion" v-model="Section.name" required>
      </div>
      <div class="form-group" v-if="Section.name">        
        <div class="text-center border border-primary" v-show="this.file ||Section.img">
          <img class="img-fluid w-25" v-if="!this.file.photoURL" :src="Section.img">
          <img class="img-fluid w-50" v-else :src="this.file.photoURL">
        </div>
        <div class="d-flex justify-content-center mt-3">
          <input class="form-control-file d-none" type="file" placeholder="Imagen de Producto" @change="handleFileUpload($event)" ref="file">
          <a class="btn btn-soft-primary transition-3d-hover" href="javascript:;" @click="$refs.file.click()">Buscar Imagen</a>
        </div>
        <label for="">Grupos</label>
        <br>
        <small class="text-muted">
          Separe con una coma (",") los nombres de cada grupo que desea agregar a la seccion de
          <b>{{Section.name}}</b>
        </small>
        <div>
          <input class="form-control" type="text" v-model="Section.subSections" required>
        </div>
        <hr>
        <div class="border border-blue" v-if="Section.subSections">
          <ul class="list-group" v-for="(item, index) in Section.subSections.toString().split(',')" :key="index">
            <li class="list-group-item">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container" v-show="newSection === false">
      <hr>
      <div class="form-group">
        <label for="">Lista de Seccion</label>
        <div class="input-group input-group-btn">
          <select class="form-control" v-model="Section.id" @change="selectSection">
            <option :value="''" disabled>--Seleciona una Seccion--</option>
            <option v-for="section of Sections" :key="section.id" :value="section.id">{{section.name}}</option>
          </select>
          <div class="input-group-append" v-if="Section.id">
            <router-link :to="{name:'editSection', params: {id: Section.id}}">
              <a class="btn btn-soft-warning" href="javascript:;" @click="editSection">
                <i class="fas fa-edit mr-2"></i> Editar
              </a>
            </router-link>
            <a class="btn btn-soft-danger" href="javascript:;" @click="deleteSection(Section)">
              <i class="fas fa-trash mr-2" ></i>Eliminar
            </a>
          </div>
        </div>
      </div>
      <div class="container" v-show="Section.id">
        <hr>
        <label class="text-muted">Lista de Tipos</label>
        <ul class="list-group">
          <li class="list-group-item list-group-item-action" v-for="(type, index) of Section.subSections" :key="index">{{type}}</li>
        </ul>
      </div>
    </div>
    <div class="col-12 d-flex justify-content-between mt-3 border-top border-light mt-3 pt-3 mb-0" v-if="newSection">
      <button type="submit" :class="['btn', {'btn-success':!id, 'btn-warning':id}, 'btn-block']">
        <span v-if="id">Actualizar</span>
        <span v-else="">Guardar</span>
      </button>
    </div>
  </form>
</div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "formSection",
  data() {
    return {
      newSection: false
    };
  },
  created() {
    this.getDatas(["Sections"]);
    this.getData([{ ref: "Sections", id: this.id }]);
    this.Section.id = "";
  },
  computed: {
    ...mapState(["Sections", "Section", "file"]),
    id() {
      if (this.$route.name == "editSection") {
        return this.$route.params.id;
      } else {
        return false;
      }
    }
  },
  methods: {
    ...mapActions([
      "getDatas",
      "getData",
      "updateData",
      "addData",
      "deleteData",
      "handleFileUpload"
    ]),
    chageSection() {
      this.editSection();
      if (!this.newSection) {
        this.$router.push({ name: "sections" });
      } else {
        this.$router.push({ name: "newSection" });
      }
    },
    selectSection() {
      this.getData([{ ref: "Sections", id: this.Section.id }]);
    },
    editSection() {
      this.newSection = !this.newSection;
    },
    submitAction() {
      if (!Array.isArray(this.Section.subSections)) {
        this.Section.subSections = this.Section.subSections.split(",");
      }
      if (this.id) {
        this.updateData([
          {
            ref: "Sections",
            data: this.Section,
            route: {path:"/dashboard/products"},
            file: this.file
          }
        ]);
      } else {
        delete this.Section.id;        
        this.addData([
          {
            ref: "Sections",
            data: this.Section,
            file: this.file,
            route: {path:"/dashboard/products"},
          }
        ]);
      }
      this.editSection();
    },
    deleteSection(section) {
      if (section.img) {
        this.deleteData([
          {
            ref: "Sections",
            id: section.id,
            file: {
              type:
                "image/" +
                section.img
                  .split("?")[0]
                  .split(".")
                  .pop()
            }
          }
        ]);
      } else {
        this.deleteData([
          {
            ref: "Sections",
            id: section.id
          }
        ]);
      }
      this.Section.id = "";
    }
  },
};
</script>