<template>
  <table class="table table-warning table-hover">
    <thead>
      <tr class="text-uppercase font-size-1">
        <th scope="col" class="font-weight-medium">
          <div class="d-flex justify-content-between align-items-center">
            Orden
          </div>
        </th>
        <th scope="col" class="font-weight-medium">
          <div class="d-flex justify-content-between align-items-center">
            Cliente
          </div>
        </th>
        <th scope="col" class="font-weight-medium">
          <div class="d-flex justify-content-between align-items-center">
            Telefono
          </div>
        </th>
        <th scope="col" class="font-weight-medium">
          <div class="d-flex justify-content-between align-items-center">
            Pago Total
          </div>
        </th>
        <th scope="col" class="font-weight-medium">
          <div class="d-flex justify-content-between align-items-center">
            Fecha Entrega
          </div>
        </th>
        <th scope="col" class="font-weight-medium">
          <div class="d-flex justify-content-between align-items-center">
            Estado
          </div>
        </th>
      </tr>
    </thead>
    <tbody v-for="(OrderClient, index) in OrdersClient" :key="index" class="font-size-1">
      <tr>
        <td v-if="(OrdersClient.length - index) < 10" class="align-middle text-secondary font-weight-normal">
          <router-link :id="(OrdersClient.length - index) + 'Views'" :to="'orders/details/'+OrderClient.id+'/'+(OrdersClient.length - index)" @click="detailsOrderViews((OrdersClient.length - index))">
            OR000{{(OrdersClient.length - index)}}
          </router-link>                
        </td>
        <td v-if="(OrdersClient.length - index) >= 10 && (OrdersClient.length - index) < 100" class="align-middle text-secondary font-weight-normal">
          <router-link :id="(OrdersClient.length - index) + 'Views'" :to="'orders/details/'+OrderClient.id+'/'+(OrdersClient.length - index)" @click="detailsOrderViews((OrdersClient.length - index))">
            OR00{{(OrdersClient.length - index)}}
          </router-link>
        </td>
        <td v-if="(OrdersClient.length - index) >= 100 && (OrdersClient.length - index) < 1000" class="align-middle text-secondary font-weight-normal">
          <router-link :id="(OrdersClient.length - index) + 'Views'" :to="'orders/details/'+OrderClient.id+'/'+(OrdersClient.length - index)" @click="detailsOrderViews((OrdersClient.length - index))">
            OR0{{(OrdersClient.length - index)}}
          </router-link>
        </td>
        <td v-if="(OrdersClient.length - index) >= 1000 && (OrdersClient.length - index) < 10000" class="align-middle text-secondary font-weight-normal">
          <router-link :id="(OrdersClient.length - index) + 'Views'" :to="'orders/details/'+OrderClient.id+'/'+(OrdersClient.length - index)" @click="detailsOrderViews((OrdersClient.length - index))">
            OR0{{(OrdersClient.length - index)}}
          </router-link>
        </td>
        <td class="align-middle">
          <div class="media align-items-center">
            <span class="btn btn-sm btn-icon btn-soft-success rounded-circle mr-2">
              <span class="btn-icon__inner font-weight-medium"><i class="fa fa-user-circle"></i></span>
            </span>
            <span>{{OrderClient.user.email }}</span>
          </div>
        </td>
        <td class="align-middle">
          <div class="media align-items-center">
            <span class="btn btn-sm btn-icon btn-soft-success rounded-circle mr-2">
              <span class="btn-icon__inner font-weight-medium"><i class="fab fa-whatsapp"></i></span>
            </span>
            <span>{{OrderClient.user.phone }}</span>
          </div>
        </td>
        <td class="align-middle text-primary">${{formatPrice((OrderClient.total + OrderClient.domicile))}}</td>
        <td class="align-middle text-dark">{{ OrderClient.dateFull }}</td>
        <td class="align-middle">
          <select v-model="OrderClient.state" :class="['form-control-sm font-weight-bold', {'text-danger': OrderClient.state === 'Pendiente', 'text-warning': OrderClient.state === 'Enviado', 'text-success': OrderClient.state === 'Recibido'}]" @change="OrderUpdateState(OrderClient)">
            <option class="font-weight-bold text-danger" value="Pendiente">Pendiente</option>
            <option class="font-weight-bold text-warning"  value="Enviado">Enviado</option>
            <option class="font-weight-bold text-success" value="Recibido">Recibido</option>
            <option class="font-weight-bold text-success" value="Cancelado">Cancelado</option>
          </select>
        </td>
      </tr>
    </tbody>
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
    this.getDatas(['Users', 'Orders']);
  },
  computed: {
    ...mapState(['Users', 'Orders']),
    OrdersClient() {
      const UsersOrders = [];
      this.Orders.forEach(order => {
        this.Users.forEach(user => {
          if(order.user === user.id){
            delete order.user
            order.dateFull = order.date.day +', Hora: '+ order.date.time
            order.user = user
            UsersOrders.push(order);
          }
        });
      });
      
      return UsersOrders
    }
  },
  methods: {
    ...mapActions(['getDatas', 'updateData']),
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
