<template>
  <div v-show="!loader" id="app">
    <router-view></router-view>
    <div class="toast position-fixed bottom-0 right-0 z-index-4 mb-2 mr-2" data-delay="8000">
      <div :class="['toast-header', {'bg-success':alert.type == 0, 'bg-danger':alert.type == 1}]">
        <strong class="mr-auto text-white">{{alert.title}}</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        <span v-html="alert.msg"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: 'App',  
   created() {        
    this.userAuthOnState();
    this.getDatas(['Sections'])
  },
  computed: {
    ...mapState(["alert","Sections"]),
    loader(){      
      if(this.Sections.length){
        this.closeLoader()
        return false
      }else{
        return true
      }
      
    }
  },
  methods:{
    ...mapActions(["userAuthOnState","getDatas", "closeLoader"]),
  }
}
</script>

