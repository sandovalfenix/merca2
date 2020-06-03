<template>
  <div class="js-custom-scroll sidebar sidebar-light sidebar-right sidebar-full-height unfold-css-animation unfold-hidden position-fixed" id="cartShop" aria-labelledby="cartShopInvoker">
    <div class="border-bottom d-flex align-items-center text-nowrap px-3 px-md-4 py-3">
      <h5 class="mb-0">
        <i class="nova nova-shopping-cart h4"></i> Carrito de Compras
      </h5>
      <a class="text-muted span ml-auto" id="cartShopClose" href="#" aria-controls="cartShop" aria-expanded="false" aria-haspopup="true" data-unfold-animation-in="fadeInRight" data-unfold-animation-out="fadeOutRight" data-unfold-duration="300" data-unfold-event="click" data-unfold-target="#cartShop" data-unfold-type="css-animation">
        <i class="nova-close icon-text"></i>
      </a>
    </div>
    <form action="">
      <section v-if="productsCart.length" class="p-2">
        <div v-if="totalCartPrices < 10000" class="card-header bg-danger text-center rounded p-2 border-bottom">
          <span class="text-white"><i class="fas fa-exclamation-circle"></i> El monto mínimo de compra es de $10.000</span>
        </div>
        <div class="card-body p-0 pb-10 mb-10">
          <div v-for="item in productsCart" :key="item.id" class="media border-bottom my-2 pr-3">
            <div class="u-avatar mr-3 w-25">
              <img class="img-fluid rounded" :src="item.img" alt="Image Description">
            </div>
            <div class="media-body">
              <div class="d-flex justify-content-between align-items-center">
                <span class="d-block font-weight-semi-bold">{{item.name}}</span>
                <a class="close" href="javascript:;" @click="removeItemCart(item.indexCart)">
                  <span aria-hidden="true">
                    <i class="fas fa-window-close text-danger h6"></i>
                  </span>
                </a>
              </div>
              <span class="d-block font-size-1">{{item.weight}}</span>
              <span class="input-group">
                <span class="text-muted mr-5">Cantidad:</span>
                <div class="input-group-prepend">
                  <a :class="['btn btn-bg-transparent btn-soft-primary btn-sm',{'disabled': item.quantity === 1}]" href="javascript:void(0)" @click="quantityIncrement(item.id, 'decrement')">
                    <i class="fa fa-minus-circle"></i>
                  </a>
                </div>
                <input class="form-control form-control-sm border-0 text-center p-0" name="quantity" type="text" min="1" v-model="item.quantity">
                <div class="input-group-prepend">
                  <a :class="['btn btn-bg-transparent btn-soft-primary btn-sm',{'disabled': item.quantity === 30}]" href="javascript:void(0)" @click="quantityIncrement(item.id)">
                    <i class="fa fa-plus-circle"></i>
                  </a>
                </div>
              </span>
              <span class="d-block text-primary h5 text-right"><b>Valor:</b> $ {{formatPrice(item.price)}}</span>
            </div>            
            <hr>
          </div>
          <a href="javascript:;" class="btn btn-soft-danger btn-block mb-5" @click="removeFullCart"><i class="fas fa-trash-alt mr-2"></i>Eliminar todo los productos</a>
        </div>
      </section>
      
      <section v-else class="p-5">
        <div class="u-sidebar__body">
          <div class="d-flex justify-content-center align-items-center u-sidebar__content">
            <!-- Body -->
            <div class="card-body text-center p-0">
              <span class="btn btn-icon btn-soft-primary btn-sm">
                <span class="fas fa-shopping-basket btn-icon__inner fa-2x"></span>
              </span>
              <h3>El carrito de compras está vacío</h3>
              <p>Agrega tu primer producto y disfruta del supermercado del ahorro</p>

              <div class="mb-2">
                <a class="btn btn-soft-primary transition-3d-hover disabled" href="javascript:void(0)" aria-controls="cartShop" aria-expanded="false" aria-haspopup="true" data-unfold-animation-in="fadeInRight" data-unfold-animation-out="fadeOutRight" data-unfold-duration="300" data-unfold-event="click" data-unfold-target="#cartShop" data-unfold-type="css-animation">Comprar Ahora</a>
              </div>
            </div>
            <!-- End Body -->
          </div>
        </div>
      </section>
      <section class="border-top position-fixed bottom-0 bg-white h-25 z-index-4" style="width: 25rem; max-width: 100%">
        <div class="card-footer text-center">
          <div class="mb-2">     
            <span class="d-block font-weight-semi-bold">Valor Total</span>
            <span class="d-block h3">${{new Intl.NumberFormat().format(totalCartPrices)}}</span>
          </div>
          <a v-if="UserAuth" href="/checkout" :class="['btn btn-soft-success transition-3d-hover btn-block', {'d-none': parseInt(totalCartPrices)<10000}]"> <i class="fas fa-cash-register mr-2"></i> Ir a Pagar</a>
          <a v-else href="/login" :class="['btn btn-soft-success transition-3d-hover btn-block', {'d-none': parseInt(totalCartPrices)<10000}]"> <i class="fas fa-cash-register mr-2"></i> Ir a Pagar</a>
        </div>
      </section>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: "SidebarCart",
  created(){
    this.getDatas(['Products'])
  },  
  computed: {
    ...mapState(['UserAuth','Products', 'shopCart']),    
    productsCart(){
      if(this.shopCart){
        const productsCart = [];
        this.shopCart.forEach((cart, index) => {
          this.Products.forEach(item =>{
            if(cart.product === item.id){
              item.quantity = cart.quantity
              item.indexCart = index
              productsCart.push(item)
            }
          })
        })
        return productsCart
      }else{
        return false
      }
    },  
    totalCartPrices(){
      if(this.shopCart){
        return this.productsCart.reduce((sum, product) => {
          return sum + (parseInt(product.price) * product.quantity)
        }, 0)
      }else{
        return 0
      }
    },   
  },
  methods: {
    ...mapActions(['getDatas', 'removeFullCart']),            
    formatPrice(value) {
      let val = (value / 1).toFixed().replace('.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    quantityIncrement(id, type = 'increment'){
      const cart = []
      this.shopCart.forEach((item)=> {
        if(item.product === id){
          if(type === 'decrement'){            
            item.quantity--
          }else{            
            item.quantity++
          }
        }
        cart.push(item)
      })

      localStorage.cart = JSON.stringify(cart);
    },
    removeItemCart(index){
      this.shopCart.splice(index, 1)
      localStorage.cart = JSON.stringify(this.shopCart);
    },
  }
};
</script>
