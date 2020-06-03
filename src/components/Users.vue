<template>
  <div class="container-fluid">
    <div class="table-responsive-md overflow-scroll">
      <table class="table table-info table-hover">
        <thead>
          <tr class="text-uppercase small">
            <th scope="col" class="font-weight-medium">
              <div class="d-flex justify-content-between align-items-center">
                ID
              </div>
            </th>
            <th scope="col" class="font-weight-medium">
              <div class="d-flex justify-content-between align-items-center">
                CC
              </div>
            </th>
            <th scope="col" class="font-weight-medium">
              <div class="d-flex justify-content-between align-items-center">
                Nombre
              </div>
            </th>
            <th scope="col" class="font-weight-medium">
              <div class="d-flex justify-content-between align-items-center">
                Apellido
              </div>
            </th>
            <th scope="col" class="font-weight-medium">
              <div class="d-flex justify-content-between align-items-center">
                Email
              </div>
            </th>
            <th scope="col" class="font-weight-medium">
              <div class="d-flex justify-content-between align-items-center">
                Consumo
              </div>
            </th>
            <th scope="col" class="font-weight-medium">
              <div class="d-flex justify-content-between align-items-center">
                Estado
              </div>
            </th>
          </tr>
        </thead>
        <tbody v-for="(User, index) in UsersRef" :key="index">
          <tr v-if="User.id !== UserAuth.id">
            <td class="align-middle text-secondary font-weight-normal">REF{{User.codeRef}}</td> 
            <td class="align-middle text-dark">{{User.ID}}</td>
            <td class="align-middle text-dark text-uppercase">{{User.name}}</td>
            <td class="align-middle text-dark text-uppercase">{{ User.lastName }}</td>
            <td class="align-middle">
              <div class="media align-items-center">
                <span class="btn btn-sm btn-icon btn-soft-indigo rounded-circle mr-2">
                  <span class="btn-icon__inner font-weight-medium"><i class="fa fa-user-circle"></i></span>
                </span>
                <span>{{User.email}}</span>
              </div>
            </td>
            <td v-if="UserAuth.admin" class="align-middle">
              <div class="d-flex justify-content-between">
              <label class="mr-2">Personal</label>
              $<input type="number" v-model="User.consumptionPersonal" @change="UsersRefComp(User.id)">
              </div>
              <div class="d-flex justify-content-between">
              <label class="mr-2">G1</label>
              $<input type="number" v-model="User.consumptionG1" @change="UsersRefComp(User.id)">
              </div>
              <div class="d-flex justify-content-between">
              <label class="mr-2">G2</label>
              $<input type="number" v-model="User.consumptionG2" @change="UsersRefComp(User.id)">
              </div>
              <div class="d-flex justify-content-between">
              <label class="mr-2">G3</label>
              $<input type="number" v-model="User.consumptionG3" @change="UsersRefComp(User.id)">
              </div>
            </td>
            <td v-if="UserAuth.admin" class="align-middle">
              <select :class="['form-control font-bold',{'text-success':User.active, 'text-danger':!User.active,}]" v-model="User.active" id="UserState" @change="updateData([{ref: 'Users', data: User}])">
                <option class="text-success" :value="true">Activo</option>
                <option class="text-danger" :value="false">Inactivo</option>S
              </select>
            </td>
            <td v-else class="align-middle">
              <span :class="['font-bold',{'text-success':User.active, 'text-danger':!User.active}]">
                <span v-if="User.active">Activo</span>
                <span v-else>Inactivo</span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Users',
  created() {
    this.getDatas(['Users']);
  },
  computed: {
    ...mapState(['Users', 'UserAuth']),
    UsersRef(){
      let refs = [];
      if(this.Users && this.UserAuth){
        if(this.UserAuth.admin){ 
          this.Users.forEach(user => {
              refs.push(user)
          })
        }else{
          this.UserAuth.referrals.forEach(ref => {
            this.Users.forEach(user => {
              if(user.id === ref){
                refs.push(user)
              }
            })
          }) 
        }
      }

      return refs;
    }
  },
  methods: {
    ...mapActions(['getDatas', 'updateData']),
    UsersRefComp(id){
      let User = this.UsersRef.find(user => user.id === id);
      this.updateData([{ref: 'Users', id: id, data: User}])
    }
  },

};
</script>
