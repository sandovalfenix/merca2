import Vue from 'vue'
import Vuex from 'vuex'

import { db, storage, auth } from '@/firebase'
import $ from "jquery";
import router from '../router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    UserAuth: false,
    User:{},
    Products: [],
    Product: {},
    Sections: [],
    Section: {},
    file: false,
    alert: {},
    Users: [],
    Orders: [],
    Order: {},
    Search: '',
    shopCart: (localStorage.cart) ? JSON.parse(localStorage.cart) : [],
  },
  mutations: {
    setDatas(state, obj) {
      eval('state.' + obj.ref + ' = obj.Datas');
    },
    setData(state, obj) {
      eval('state.' + obj.ref + ' = obj.Data');
    },
    setFile(state, file) {
      state.file = file;
    },
    setAlerts(state, alert) {
      state.alert = alert;
      $(".toast").toast("show");
    },
  },
  actions: {
    userAuthOnState({ dispatch, commit }) {
      auth.onAuthStateChanged(user => {
        if (user) {
          db.collection("Users").where("uid", "==", user.uid).get()
            .then(function (querySnapshot) {
                let Data = {}
                
                querySnapshot.forEach(function (doc) {
                  Data = doc.data();
                  Data.id = doc.id;
                  Data.online = true;
                  Data.isAnonymous = user.isAnonymous;
                  Data.email = user.email;
                });
              
                if (!Data.active && Data.referrals) {
                  delete Data.referrals
                }

                dispatch('updateData', [{
                  ref: 'Users',
                  data: Data
                }])

                if (Data.name) {
                  Data.username = Data.name;
                } else if (Data.email) {
                  Data.username = Data.email.split('@')[0]
                }

                commit('setData', {
                  ref: 'UserAuth',
                  Data: Data
                })
            })
            .catch(function (error) {
              commit('setAlerts', { type: 1, title: 'Error: ' + error.code, msg: error.message });
              // eslint-disable-next-line no-console
              console.log(error)
            })
        }
      });
    },
    signUp({ dispatch, commit }, userAuth) {
      dispatch('openLoader')
      const Auth = (this.state.UserAuth) ? this.state.UserAuth : {}
      auth.createUserWithEmailAndPassword(userAuth.email, userAuth.password).then(() => {
        auth.onAuthStateChanged(function (user) {
          if (user) {
            const UserRef = userAuth.ref
            Auth.ID = userAuth.ID
            Auth.name = userAuth.name
            Auth.lastName = userAuth.lastName
            Auth.email = user.email
            Auth.isAnonymous = user.isAnonymous
            Auth.uid = user.uid
            Auth.cart = (Auth.cart) ? Auth.cart : []

            Auth.email = user.email
            Auth.isAnonymous = user.isAnonymous            
            Auth.uid = user.uid
            Auth.type = (UserRef.type === 1) ? 2 : 3;
            Auth.active = false;
            Auth.codeRef = (userAuth.refs < 10) ? '000' + (userAuth.refs).toString() : (userAuth.refs < 100) ? '00' + (userAuth.refs).toString() : (userAuth.refs < 1000) ? '0' + (userAuth.refs).toString() : (userAuth.refs).toString();

            if (Auth.referrals) {
              delete Auth.referrals
            }

            dispatch('addData', [{ ref: 'Users', data: Auth, userRef: UserRef }]);

            Auth.username = Auth.email.split('@')[0];
          }
        });
      }).catch(function (error) {
        dispatch('closeLoader')
        if (error.code == 'auth/email-already-in-use') {
          error.code = 'Email ya esta registrado!'
          
          error.message = 'La dirección de correo electrónico ya está en uso por otra cuenta'
        }
        commit('setAlerts', { type: 1, title: 'Error: ' + error.code, msg: error.message });
      });
    },
    signIn({ dispatch, commit }, userAuth) {
      dispatch('openLoader')
      auth.signInWithEmailAndPassword(userAuth.email, userAuth.password)
        .then(resp => {
          commit('setAlerts', {
            type: 0, title: 'Bienvenido', msg: 'Inicio de sesión: <b>' + resp.user.email + '</b>',
          })
          
          setTimeout(() => {
            window.location.href = "/"
          }, 500)
        })
        .catch(error => {
          dispatch('closeLoader')
          commit('setAlerts', { type: 1, title: 'Error', msg: error.message });
        });
    },
    signOut({ dispatch, commit }) {

      delete this.state.UserAuth.username;
      this.state.UserAuth.online = false;
      dispatch('updateData', [{ ref: 'Users', data: this.state.UserAuth }]);
      auth.signOut().then(() => {
        commit('setAlerts', {
          type: 0, title: 'Notificación', msg: 'Haz Cerrado la sesión',
        });
      });
      setTimeout(() => {
        window.location.href = "/"
      }, 500);

    },
    recoverPass({ commit }, emailAddress) {

      auth.sendPasswordResetEmail(emailAddress).then(function () {
        commit('setAlerts', {
          type: 0, title: 'Notificación', msg: 'Se ha enviado un correo de recuperación',
        });
      }).catch(function (error) {
        commit('setAlerts', { type: 1, title: 'Error', msg: error.message });
      });
    },
    getDatas({ commit }, refs) {
      refs.forEach(ref => {
        const Datas = [];
        db.collection(ref).orderBy("createTime", "desc").onSnapshot(querySnapshot => {
          Datas.length = 0;
          querySnapshot.forEach(doc => {
            let Data = doc.data();
            Data.id = doc.id;
            Datas.push(Data);
          });
        });
        commit('setDatas', { Datas, ref });
      });

    },
    getData({ commit }, objects) {
      objects.forEach(obj => {
        if (obj.id) {
          db.collection(obj.ref).doc(obj.id)
            .onSnapshot(doc => {
              let Data = doc.data();
              Data.id = doc.id;
              //creación de la variable para el global states
              let ref = obj.ref.slice(0, -1);

              commit('setData', { Data, ref });
            })
        } else {
          let Data = [];
          //creación de la variable para el global states
          let ref = obj.ref.slice(0, -1);
          commit('setData', { Data, ref });
        }
      })

    },
    updateData({ dispatch, commit }, objects) {

      objects.forEach(obj => {
        const Doc = Object.assign({}, obj.data);
        delete Doc.id
        Doc.updateTime = Date.now()
        db.collection(obj.ref).doc(obj.data.id).update(Doc)
          .then(() => {
            if (obj.file) {
              dispatch('uploadFiles', obj);
            }
            if(obj.route){
              window.location.href = obj.route;
            }
            
            dispatch('closeLoader')
          })
          .catch((error) => {
            commit('setAlerts', { type: 1, title: 'Error', msg: error.message });
          });
      })
    },
    addData({ dispatch, commit }, objects) {
      objects.forEach(obj => {
        var Doc = Object.assign({}, obj.data);
        Doc.createTime = Date.now()
        db.collection(obj.ref)
          .add(Doc)
          .then((resp) => {
            obj.data.id = resp.id;
            dispatch('closeLoader')
            commit('setAlerts', { type: 0, title: 'Notificación', msg: 'El registro fue <b>agregado</b> con éxito!' });

            if (obj.file) {
              dispatch('uploadFiles', obj);
            }

            if (obj.userRef) {
              const UserRef = obj.userRef
              if (!UserRef.referrals) {
                UserRef.referrals = [resp.id];
              } else {
                UserRef.referrals.push(resp.id)
              }

              dispatch('updateData', [{ref: 'Users', data: UserRef, route: "/"}]);
            }
            if(obj.route){
              router.push(obj.route);
            }
          })
          .catch((error) => {
            commit('setAlerts', { type: 1, title: 'Error', msg: error.message });
          });
      });
    },
    deleteData({ dispatch, commit }, objects) {

      objects.forEach(obj => {
        db.collection(obj.ref).doc(obj.id).delete()
          .then(() => {
            if (obj.file) {
              dispatch('deleteFiles', obj);
            }
            commit('setAlerts', { type: 1, title: 'Notificación', msg: 'El registro fue <b>eliminado</b> con éxito!' });
          })
          .catch((error) => {
            commit('setAlerts', { type: 1, title: 'Error', msg: error.message });
          })
      });
    },
    handleFileUpload({ commit }, event) {
      const file = event.target.files[0];

      if (file.type.split("/")[0] === 'image') {
        file.photoURL = URL.createObjectURL(file);
        commit('setFile', file);
      } else {
        alert('Error: El archivo no es una image. Por favor ingresar una imagen valida: JPG, PNG, GIF...');
        commit('setFile', false);
      }
    },
    async uploadFiles({ dispatch, commit }, obj) {
      try {
        const refImg = storage.ref().child(obj.file.type.split("/")[0] + '/' + obj.ref + '/' + obj.data.id + '.' + obj.file.type.split("/")[1]);
        const res = await refImg.put(obj.file);
        delete obj.file;

        if (res.state) {
          obj.data.img = await refImg.getDownloadURL();
          dispatch('updateData', [obj]);
        } else {
          alert('Error al subir el archivo/imagen');
        }
      } catch (error) {
        commit('setAlerts', { type: 1, title: 'Error', msg: error.message });
      }
    },
    async deleteFiles({ commit }, obj) {
      try {
        // Create a reference to the file to delete
        const desertRef = storage.ref().child(obj.file.type.split("/")[0] + '/' + obj.ref + '/' + obj.id + '.' + obj.file.type.split("/")[1]);

        // Delete the file
        await desertRef.delete();
      } catch (error) {
        commit('setAlerts', { type: 1, title: 'Error', msg: error.message });
      }
    },
    addCartItems({ commit }, Product) {
      let cart = this.state.shopCart;

      if (cart) {
        if (!(cart.filter(item => { return item.product === Product.id }).length)) {
          cart.push({ product: Product.id, quantity: 1, price: Product.price })
        } else {
          cart.forEach((item, index) => {
            if (item.product === Product.id) {
              ++cart[index].quantity
            }
          })
        }
      } else {
        cart = [{ product: Product.id, quantity: 1, price: Product.price }]
      }
      
      commit('setAlerts', { type: 0, title: 'Notificación', msg: 'El producto fue <b>agregado</b> con éxito!' });

      localStorage.cart = JSON.stringify(cart);
    },
    removeFullCart({ commit }) {
      localStorage.removeItem('cart');
      commit('setData', { ref: 'shopCart', Data: [] });
    },
    setSearch({ commit }, search) {
      if (search.length > 2) {
        commit('setData', { ref: 'Search', Data: search });
      } else {
        commit('setData', { ref: 'Search', Data: '' });
      }
    },
    balanceLv1({ commit }, month) {
      let UserAuth = this.state.UserAuth;
      
      if (!UserAuth.point) {
        UserAuth.point = {};
        UserAuth.point.lv1 = 0;
      } 

      if (this.state.Orders && this.state.Users && this.state.UserAuth.referrals) {
        this.state.UserAuth.referrals.forEach(ref => {
          this.state.Orders.forEach(order => {
            UserAuth.point.lv1 += (new Date(order.createTime).getMonth() === month && order.user === ref) ? order.total / 1000 : 0;
          });
        })
      }
      commit('setData', { ref: 'UserAuth', Data: UserAuth });
    },
    balanceLv2({ commit }, month) {
      let UserAuth = this.state.UserAuth;

      if (!UserAuth.point.lv2) {
        UserAuth.point.lv2 = 0;
      } 
      
      if (this.state.Orders && this.state.Users && this.state.UserAuth.referrals) {
        this.state.UserAuth.referrals.forEach(ref => {
          let User = this.state.Users.find(user => user.id === ref);
          if (User) {
            if (User.referrals) {
              User.referrals.forEach(ref2 => {
                this.state.Orders.forEach(order => {
                  UserAuth.point.lv2 += (new Date(order.createTime).getMonth() === month && order.user === ref2) ? order.total / 1000 : 0;
                });
              })
            }
          }
        })
      }
      commit('setData', { ref: 'UserAuth', Data: UserAuth });
    },

    closeLoader() {
      setTimeout(function () {
        $('#jsPreloader').fadeOut(500);
      }, 500);
    },

    openLoader() {
      $('#jsPreloader').removeAttr('style');
    }
  }
});