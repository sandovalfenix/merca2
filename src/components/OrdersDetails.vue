<template>
  <table class="table table-warning table-hover">
    <tr>
      <td colspan="6">
        <router-link to="/dashboard/orders">
          <i class="fa fa-arrow-left fa-2x mr-2"></i> Volver
        </router-link>
      </td>
    </tr>
    <tr v-if="OrderClient">
      <td colspan="6">
        <div class="border rounded p-5 bg-white">
        <h4 class="h3">FACTURA</h4>

        <div class="row mb-6">
          <div class="col-3">
            <span class="text-secondary mr-1">Fecha:</span>
            <span class="font-weight-medium">{{(new Date(OrderClient.createTime).getDate()) + ' de ' + Month[(new Date(OrderClient.createTime).getMonth())] + ' ' + (new Date(OrderClient.createTime).getYear() + 1900)}}</span>
          </div>
          <div class="col-3">
            <span class="text-secondary mr-1">Entidad:</span>
            <span class="font-weight-medium">Merca2.co</span>
          </div>
          <div class="col-6">
            <span class="text-secondary mr-1">Numero de Factura:</span>
            <span v-if="$route.params.numInvoice < 10" class="font-weight-medium">00{{$route.params.numInvoice}}</span>
            <span v-if="$route.params.numInvoice >= 10 && $route.params.numInvoice < 100" class="font-weight-medium">0{{$route.params.numInvoice}}</span>
            <span v-if="$route.params.numInvoice > 100 && $route.params.numInvoice < 1000" class="font-weight-medium">{{$route.params.numInvoice}}</span>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h5 class="text-dark font-size-1 text-uppercase">Informacion del Cliente:</h5>
            <ul class="list-unstyled mb-2">
              <li class="mb-2">
                <span class="text-secondary mr-1">Nombre:</span>
                <span class="font-weight-medium">{{OrderClient.user.name}}</span>
              </li>
              <li class="mb-2">
                <span class="text-secondary mr-1">Apellido:</span>
                <span class="font-weight-medium">{{OrderClient.user.lastName}}</span>
              </li>
              <li class="mb-2">
                <span class="text-secondary mr-1">Ciudad:</span>
                <span class="font-weight-medium">{{OrderClient.location.city}}</span>
              </li>
              <li class="mb-2">
                <span class="text-secondary mr-1">Telefonos:</span>
                <span class="font-weight-medium">{{OrderClient.user.phone}} - {{OrderClient.user.phone2}}</span>
              </li>
              <li class="mb-2">
                <span class="text-secondary mr-1">Direccion:</span>
                <span class="font-weight-medium">{{OrderClient.location.address}}, {{OrderClient.location.neighborhood}}, {{OrderClient.location.name}}</span>
              </li>
              <li class="mb-2">
                <span class="text-secondary mr-1">Fecha Entrega:</span>
                <span class="font-weight-medium">{{OrderClient.dateFull}}</span>
              </li>
            </ul>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col mb-3 mb-sm-0">
            <h5 class="text-dark font-size-1 text-uppercase">Productos Facturados:</h5>
            <!-- Table -->
            <table class="table table-heighlighted font-size-1 mb-9">
              <thead>
                <tr class="text-uppercase text-secondary">
                  <th scope="col" class="small">Producto</th>
                  <th scope="col" class="small">Nombre</th>
                  <th scope="col" class="small">Tamaño</th>
                  <th scope="col" class="small">Cantidad</th>
                  <th scope="col" class="small">% IVA</th>
                  <th scope="col" class="small text-right">$ IVA</th>
                  <th scope="col" class="small text-right">$ Und</th>
                  <th scope="col" class="small text-right">$ Und +IVA</th>
                  <th scope="col" class="small text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(productOrder, index) in productsOrder(OrderClient.id)" :key="index">
                  <td>
                    <img :src="productOrder.img" class="img-fluid rounded" style="width: 45px">
                  </td>
                  <th scope="row" class="font-weight-normal text-uppercase">{{productOrder.name}}</th>
                  <td>{{productOrder.weight}}</td>
                  <td>{{productOrder.quantity}}</td>
                  <td v-if="productOrder.iva">{{productOrder.iva}}%</td>
                  <td v-else>0%</td>
                  <td v-if="productOrder.iva" class="text-right">{{formatPrice((productOrder.price * (productOrder.iva/100)))}}</td>
                  <td v-else class="text-right">{{formatPrice(0)}}</td>
                  <td v-if="productOrder.iva" class="text-right">{{formatPrice((productOrder.price * (1-(productOrder.iva/100))))}}</td>
                  <td v-else class="text-right">{{formatPrice(productOrder.price)}}</td>
                  <td class="text-right">{{formatPrice(productOrder.price)}}</td>
                  <td class="text-right font-weight-bold">{{formatPrice(productOrder.price * productOrder.quantity)}}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="h6">
                  <td scope="row">Subtotal</td>
                  <td colspan="8" class="text-right font-weight-bold">$ {{formatPrice(OrderClient.total)}}</td>
                </tr>
              </tfoot>
            </table>
            <!-- End Table -->
            <hr class="my-4">

            <h5 class="text-dark font-size-1 text-uppercase">Detalles de pago:</h5>
            <ul class="list-unstyled mb-0">
              <li class="d-flex justify-content-between align-items-center mb-2">
                <span class="text-secondary">Subtotal</span>
                <span class="text-primary font-weight-medium">${{formatPrice(OrderClient.total)}}</span>
              </li>
              <li class="d-flex justify-content-between align-items-center mb-2">
                <span class="text-secondary">Costo Domicilio</span>
                <span class="text-primary font-weight-medium">${{formatPrice(OrderClient.domicile)}}</span>
              </li>
              <li v-if="OrderClient.user.member === 'pendiente'" class="d-flex justify-content-between align-items-center mb-2">
                <span class="text-secondary">Costo Membresia</span>
                <span class="text-primary font-weight-medium">${{formatPrice(42000)}}</span>
              </li>
              <li class="d-flex justify-content-between align-items-center mb-2">
                <span class="text-secondary">Total Pagar</span>
                <span v-if="OrderClient.user.member === 'pendiente'" class="text-primary font-weight-medium">${{formatPrice((OrderClient.total)+(OrderClient.domicile)+(42000))}}</span>
                <span v-else class="text-primary font-weight-medium">${{formatPrice((OrderClient.total)+(OrderClient.domicile))}}</span>
              </li>
            </ul>
          </div>
        </div>

        <ul class="list-inline mt-4 d-flex justify-content-end">
          <li class="list-inline-item">
            <a :href="'/invoice/'+OrderClient.id+'/'+$route.params.numInvoice" class="btn btn-soft-primary transition-3d-hover" target="_black">
              <span class="fas fa-file-pdf mr-1"></span>
              Descargar Factura
            </a>
          </li>
        </ul>
      </div>
      </td>
    </tr>
  </table>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Orders',
  data() {
    return {
      location: false,
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
      date: ''
    };
  },
  created() {
    this.getDatas(['Users', 'Orders', 'Products']);
  },
  computed: {
    ...mapState(['Users', 'Orders', 'Products']),
    OrderClient() {
      let Order = false;
      if(this.Orders && this.Users){
        Order = this.Orders.find(order => order.id === this.$route.params.id);
        
        if(Order){
          let User = this.Users.find(user => Order.user === user.id);
          if(User){
            delete Order.user;
            Order.dateFull = Order.date.day +', Hora: '+ Order.date.time;
            Order.user = User;
          }
        }
      }
     return Order;
    }
  },
  methods: {
    ...mapActions(['getDatas', 'updateData']),
    productsOrder(id) {
      const productsOrder = [];
      
      if (this.Orders) {
        let Order = this.Orders.find(Order => Order.id === id);
        if(Order){
          Order.items.forEach((orderItem, index) =>  {
            let product = this.Products.find(item => orderItem.product === item.id) 
            if(product){
              product.quantity = orderItem.quantity;
              product.price = (orderItem.price) ? orderItem.price : product.price
              product.indexOrder = index;

              productsOrder.push(product);
            }
          });
        }
      }

        return productsOrder;
    },
    OrderUpdateState(Order){
      var user = Order.user.id
      delete Order.user
      delete Order.dateFull
      Order.user = user
      
      this.updateData([{ref: 'Orders', data: Order}])
    },
    formatPrice(value) {
      let val = (value / 1).toFixed().replace('.');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
  },

};
</script>
