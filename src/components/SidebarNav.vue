<template>
  <!-- Sidebar Nav -->
  <aside id="sidebar" class="js-custom-scroll side-nav bg-white">
    <ul v-if="Sections" id="sideNav" class="side-nav-menu side-nav-menu-top-level mb-0">
      

      <!-- Sidebar Sub Title -->
      <li class="sidebar-heading py-3 border-bottom border-light"><h5 class="my-0 text-primary" style="font-size: 1.25rem; font-family: Encode Sans,Roboto,Helvetica,Arial,sans-serif; font-weight: 700">Secciones</h5></li>
      <!-- End Sidebar Sub Title -->

      <li v-for="(section, index) in Sections" :key="index" class="side-nav-menu-item side-nav-has-menu border-bottom border-light">
        <span :id="'menu'+index" class="side-nav-menu-link media align-items-center hover pl-1 py-2 side-nav-opened">
          <a :href="'/section/'+section.id">
            <span class="side-nav-menu-icon mx-2">
              <i class="fas fa-shopping-basket"></i>
            </span>
            <span class="side-nav-fadeout-on-closed media-body text-dark" style="font-size: 0.9rem; font-weight: 400">{{section.name}}</span>
          </a>
          <span :id="'sideNavConrolOpen'+index" class="side-nav-control-icon position-absolute right-0 p-3" @click="openSubMenu(index)">
            <i class="nova-angle-right side-nav-fadeout-on-closed text-info font-weight-bold"></i>
          </span>
          <span :id="'sideNavConrolClose'+index" class="side-nav-control-icon position-absolute right-0 p-3 d-none" @click="closeSubMenu(index)">
            <i class="nova-angle-down side-nav-fadeout-on-closed text-info font-weight-bold"></i>
          </span>
        </span>

        <!-- Item: subMenu -->
        <ul :id="'subMenu'+index" class="side-nav-menu side-nav-menu-second-level mb-0 pl-0">
          <li v-for="(subSection, subIndex) in section.subSections" :key="subIndex" class="side-nav-menu-item border-top">
            <a class="side-nav-menu-link" :href="'/section/'+section.id+'/subSection/'+subIndex"><span class="ml-3 text-dark small">{{subSection}}</span></a>
          </li>
        </ul>
        <!-- End Item: subMenu -->
      </li>
    </ul>
  </aside>
  <!-- End Sidebar Nav -->
</template>

<script>
import { mapState, mapActions } from 'vuex';
import $ from 'jquery';

export default {
  name: 'SidebarNav',
  created() {
    this.getDatas(['Sections'])
  },
  computed: {
    ...mapState(['Sections']),
  },
  methods: {
    ...mapActions(['getDatas']),
    openSubMenu(index){
      $('#menu'+index).addClass('side-nav-opened');
      $('#subMenu'+index).addClass('d-block');
      $('#sideNavConrolOpen'+index).addClass('d-none');
      $('#sideNavConrolClose'+index).removeClass('d-none');
    },
    closeSubMenu(index){
      $('#menu'+index).removeClass('side-nav-opened');
      $('#subMenu'+index).removeClass('d-block');
      $('#sideNavConrolOpen'+index).removeClass('d-none');
      $('#sideNavConrolClose'+index).addClass('d-none');
    },
  },
}
</script>