<template>
  <div class="container space-2">
    <h3 class="text-uppercase badge-info p-2">{{User.name}} {{User.lastName}} - Codigo: {{User.codeRef}}</h3>
    <v-card class="text-uppercase">
      <v-card-title>
        Referidos
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        :items-per-page="20"
        class="elevation-1"
      >
        <template v-slot:item.email='{item}'>
          <span class='text-lowercase'>{{item.email}}</span>
        </template>
        <template v-slot:item.active="{ item }">
          <span v-if='item.active' class="badge badge-pill badge-success">Activo</span>
          <span v-else class="badge badge-pill badge-danger">Inactivo</span>
        </template>
        <template v-slot:item.link-referrals='{item}'>
          <router-link :to="'/dashboard/referrals/'+item.id" class="badge badge-primary" title="ver" v-if='item.active'>
            <i class="fas fa-eye"></i>
          </router-link>
        </template>
      </v-data-table>
  </v-card>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
  export default {
    async created(){
      await this.getDatas(['Users'])
    },
    beforeUpdate(){
      this.getData([{ref:'Users', id: this.$route.params.id}])
    },
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Nombre Cliente',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          {
            text: 'Apellido Cliente',
            align: 'start',
            sortable: true,
            value: 'lastName',
          },
          { text: 'Correo', value: 'email' },
          { text: 'Codigo', value: 'codeRef' },
          { text: 'Tipo', value: 'type' },
          { text: 'Estado', value: 'active' },
          { text: 'Referidos', value: 'link-referrals' }
        ],
      }
    },
    computed:{
      ...mapState(['Users','User']),
      users(){
        const user1 = []
        if(this.Users.length){
          var user2 = this.Users.find(user => user.id === this.$route.params.id) 
          user2.referrals.forEach( ref => {
            const refs =  this.Users.find(user => user.id === ref) 
            user1.push(refs)
          })
        }
        return user1
      }
    },
    methods:{
      ...mapActions(['getDatas', 'getData'])
    }
  }
</script>
