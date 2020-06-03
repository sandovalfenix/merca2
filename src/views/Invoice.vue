<template>
  <div class="container space-2 px-md-7 px-lg-11">
    <div class="card bg-img-hero" style="background-image: url(//htmlstream.com/preview/front-v2.9.2/assets/svg/components/bg-elements-6.svg);">
      <div class="card-body p-5 p-md-7 p-lg-11">
        <div class="row justify-content-lg-between align-items-sm-center mb-11">
          <div class="col-sm-6 order-sm-2 text-sm-right mb-5 mb-sm-0">
            <h3 class="h5 font-weight-bold mb-0">Res. DIAN Numero</h3>
            <h3 class="h5">18763005070621</h3>
            <h1 class="h2 font-weight-medium mb-0">
              Factura #
              <span v-if="$route.params.num < 10">000{{$route.params.num}}</span>
              <span v-if="$route.params.num >= 10 && $route.params.num < 100">00{{$route.params.num}}</span>
              <span v-if="$route.params.num >= 100 && $route.params.num < 1000">0{{$route.params.num}}</span>
              <span v-if="$route.params.num >= 1000 && $route.params.num < 10000">{{$route.params.num}}</span>
            </h1>
          </div>

          <div class="col-sm-6 order-sm-1">
            <!-- Logo -->
            <img class="mb-2" src="@/assets/logo_sarp.png" alt="Logo" style="width: 100px">
            <h2 class="text-primary font-weight-semi-bold">SARP COLOMBIA ZOMAC SAS</h2>
            <!-- End Logo -->
            <small class="d-block"><b>NIT:</b> 901.364.726-9</small>

            <!-- Address -->
            <small class="d-block"><b>Direccion:</b> CRA 56 #7-58 Barrio Independencia</small>
            <!-- End Address -->

            <small class="d-block"><b>Telefono:</b> 310 378 0335</small>
          </div>
        </div>

        <!-- Bill To -->
        <div v-if="OrderClient.user" class="row justify-content-md-between mb-7">
          <div class="col-md-8">
            <h3 class="h5">Cobrar a:</h3>
            <span class="d-block">{{OrderClient.user.name}} {{OrderClient.user.lastName}}</span>
            <span class="d-block">CC {{OrderClient.user.ID}}</span>
            <span class="d-block">Email: {{OrderClient.user.email}}</span>
            <span class="d-block">Tel: {{OrderClient.user.phone}}</span>
            <address class="text-secondary mb-0">
              {{OrderClient.location.address}}, Barrio {{OrderClient.location.neighborhood}}, {{OrderClient.location.name}} - {{OrderClient.location.city}}
            </address>
          </div>

          <div class="col-md-4 mt-6">
            <dl class="row mb-0">
              <dt class="col-5 col-md-6 font-weight-normal text-secondary">Fecha de Factura:</dt>
              <dd class="col-7 col-md-6 font-weight-medium">{{(new Date(OrderClient.createTime).getDate()) + ' / ' + (new Date(OrderClient.createTime).getMonth() + 1) + ' / ' + (new Date(OrderClient.createTime).getYear() + 1900)}}</dd>
            </dl>
            <dl v-if="OrderClient.date" class="row mb-0">
              <dt class="col-5 col-md-6 font-weight-normal text-secondary">Fecha de Entrega:</dt>
              <dd class="col-7 col-md-6 font-weight-medium">{{OrderClient.date.day}}<br>{{'Hora: '+ OrderClient.date.time}}</dd>
            </dl>
          </div>
        </div>
        <!-- End Bill To -->

        <!-- Table -->
        <table class="table table-heighlighted font-size-1 mb-9">
          <thead>
            <tr class="text-uppercase text-secondary">
              <th scope="col" class="font-weight-bold">Nombre Producto</th>
              <th scope="col" class="font-weight-bold">Medida</th>
              <th scope="col" class="font-weight-bold">Unidad</th>
              <th scope="col" class="font-weight-bold">% IVA</th>
              <th scope="col" class="font-weight-bold text-right">Precio IVA</th>
              <th scope="col" class="font-weight-bold text-right">Precio Und</th>
              <th scope="col" class="font-weight-bold text-right">Precio Und +IVA</th>
              <th scope="col" class="font-weight-bold text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(productOrder, index) in productsOrder" :key="index">
              <th scope="row" class="font-weight-normal text-uppercase small">{{productOrder.name}}</th>
              <td>{{productOrder.weight}}</td>
              <td>{{productOrder.quantity}}</td>
              <td v-if="productOrder.iva">{{productOrder.iva}}%</td>
              <td v-else>0%</td>
              <td v-if="productOrder.iva" class="text-right">$ {{formatPrice((productOrder.price * (productOrder.iva/100)))}}</td>
              <td v-else class="text-right">$ {{formatPrice(0)}}</td>
              <td v-if="productOrder.iva" class="text-right">$ {{formatPrice((productOrder.price * (1-(productOrder.iva/100))))}}</td>
              <td v-else class="text-right">$ {{formatPrice(productOrder.price)}}</td>
              <td class="text-right">$ {{formatPrice(productOrder.price)}}</td>
              <td class="text-right font-weight-bold">$ {{formatPrice(productOrder.price * productOrder.quantity)}}</td>
            </tr>            
            <tr class="h6">
              <td scope="row">Subtotal</td>
              <td colspan="7" class="text-right font-weight-bold">$ {{formatPrice(OrderClient.total)}}</td>
            </tr>
            <tr class="h6">
              <td scope="row">Costo Domicilio</td>
              <td colspan="7" class="text-right font-weight-bold">$ {{formatPrice(OrderClient.domicile)}}</td>
            </tr>
            <tr v-if="OrderClient.user.member === 'pendiente'" class="h6">
              <td scope="row">Costo Membresia</td>
              <td colspan="7" class="text-right">$ {{formatPrice(42000)}}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="h6">
              <td scope="row">Total</td>
              <td v-if="OrderClient.user.member === 'pendiente'" colspan="7" class="text-right">$ {{formatPrice((OrderClient.total + OrderClient.domicile + 42000))}}</td>
              <td v-else colspan="7" class="text-right">$ {{formatPrice((OrderClient.total + OrderClient.domicile))}}</td>
            
            </tr>
          </tfoot>
        </table>
        <!-- End Table -->

        <!-- Contacts -->
        <div class="row justify-content-lg-between">
          <div class="col-md-8 col-lg-7 order-md-2 mb-5 mb-md-0">
            <h4 class="h6">¡Gracias!</h4>
            <p class="font-size-1">Si tiene alguna pregunta sobre esta factura, use la siguiente información de contacto:</p>

            <span class="d-block">
              <small class="font-weight-medium mr-1">Correo:</small>
              <small class="text-muted">info@sarpcolombia.com</small>
            </span>
            <small class="font-weight-medium">telefono:</small>
            <small class="text-muted">+57 3103780335</small>
          </div>

          <div class="col-md-4 col-lg-3 order-md-1 align-self-end">
            <p class="small text-muted mb-0">&copy; 2019 derechos reservados a SARP Colombia, Disañado por Aitheria Technology SAS.</p>
          </div>
        </div>
        <!-- End Contacts -->
      </div>
    </div>

    <div class="text-right mt-5">
      <button type="button" class="btn btn-primary btn-sm-wide transition-3d-hover" onclick="window.print();return false;">
        <span class="fas fa-print mr-2"></span>
        Imprimir
      </button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Invoice',
  created() {
    this.getDatas(['Products', 'Users']);
    this.getData([{ref: 'Orders', id: this.$route.params.id}]);
  },
  computed: {
    ...mapState(['Users', 'Order', 'Products']),
    OrderClient() {
      var Order = false;
      if(this.Users && this.Order){
        Order = this.Order
        this.Users.forEach(user => {
          if(user.id === this.Order.user){
            delete Order.user
            Order.dateFull = Order.date.day +', Hora: '+ Order.date.time
            Order.user = user
          }
        });
      }

      return Order
    },
    productsOrder() {      
      const productsOrder = [];
      if (this.Products.length && this.Order.items) {
        var OrderItems = this.Order.items
        OrderItems.forEach((order, index) => {
          this.Products.forEach(item => {
            if (order.product === item.id) {
              item.quantity = order.quantity;
              item.price = (order.price) ? order.price : item.price
              item.indexOrder = index;
              productsOrder.push(item);
            }
          });
        });
      }
      return productsOrder;
    },
  },
  methods: {
    ...mapActions(['getDatas', 'getData']),
    formatPrice(value) {
      let val = (value / 1).toFixed().replace('.');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
  },

};
</script>
