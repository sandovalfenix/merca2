<template>
  <div class="container space-2">
    <!-- Stats -->
    
    <h3 class="h5 mb-3">Balance de <b>{{Month[new Date().getMonth()]}}</b></h3>
    <div class="row mb-6">
      <!-- Card -->
      <div class="col-12">
      <div class="card mb-3">
        <div class="card-body p-5">
          <div class="media align-items-center">
            <span class="btn btn-lg btn-icon btn-soft-primary rounded-circle mr-4">
              <span class="fas fa-dollar-sign btn-icon__inner"></span>
            </span>
            <div class="media-body">
              <span v-if="UserAuth.consumptionPersonal" class="d-block font-size-3">${{formatPrice(UserAuth.consumptionPersonal)}}</span>
              <span v-else class="d-block font-size-3">$0</span>
              <h2 class="h6 text-secondary font-weight-normal mb-0">Consumo Personales</h2>
            </div>
          </div>
        </div>
      </div>
      </div>
      <!-- End Card -->

      <!-- Card -->
      <div class="col">
      <div class="card mb-3">
        <div class="card-body p-5">
          <div class="media align-items-center">
            <span class="btn btn-lg btn-icon btn-soft-success rounded-circle mr-4">
              <span class="fas fa-coins btn-icon__inner"></span>
            </span>
            <div class="media-body">
              <span v-if="UserAuth.consumptionG1" class="d-block font-size-3">${{formatPrice(UserAuth.consumptionG1)}}</span>
              <span v-else class="d-block font-size-3">$0</span>
              <h3 class="h6 text-secondary font-weight-normal mb-0">Consumo 1 Generacion</h3>
            </div>
          </div>
        </div>
      </div>
      </div>
      <!-- End Card -->

      <!-- Card -->
      <div class="col">
      <div class="card">
        <div class="card-body p-5">
          <div class="media align-items-center">
            <span class="btn btn-lg btn-icon btn-soft-warning rounded-circle mr-4">
              <span class="fas fa-coins btn-icon__inner"></span>
            </span>
            <div class="media-body">
              <span v-if="UserAuth.consumptionG2" class="d-block font-size-3">${{formatPrice(UserAuth.consumptionG2)}}</span>
              <span v-else class="d-block font-size-3">$0</span>
              <h3 class="h6 text-secondary font-weight-normal mb-0">Consumo 2 Generacion</h3>
            </div>
          </div>
        </div>
      </div>
      </div>
      <!-- End Card -->

      <!-- Card -->
      <div class="col">
      <div class="card">
        <div class="card-body p-5">
          <div class="media align-items-center">
            <span class="btn btn-lg btn-icon btn-soft-danger rounded-circle mr-4">
              <span class="fas fa-coins btn-icon__inner"></span>
            </span>
            <div class="media-body">
              <span v-if="UserAuth.consumptionG3" class="d-block font-size-3">${{formatPrice(UserAuth.consumptionG3)}}</span>
              <span v-else class="d-block font-size-3">$0</span>
              <h3 class="h6 text-secondary font-weight-normal mb-0">Consumo 3 Generacion</h3>
            </div>
          </div>
        </div>
      </div>
      </div>
      <!-- End Card -->
    </div>
    <!-- End Stats -->
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'AdminUser',
  data() {
    return {
      Month: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ],
    }
  },
  computed:{
    ...mapState(['UserAuth'])
  },
  methods:{
    formatPrice(value) {
      let val = (value / 1).toFixed().replace('.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
  }
}
</script>