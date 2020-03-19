<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">

      <v-app-bar-nav-icon @click="drawer=true"></v-app-bar-nav-icon>

      </div>

      <v-spacer></v-spacer>      

    </v-app-bar>


  <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-subheader>Справочники</v-subheader>
        <v-list-item-group>
          <Obj />
          <Empl />                   
          <Wall />
        <v-subheader>Действия</v-subheader>
        
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-file-excel</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Выгрузить в excel</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Очистить списки</v-list-item-title>
          </v-list-item>          

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>


    <v-content>
      <Workers/>
    </v-content>
   
    
  </v-app>
</template>

<script>
import Workers from './components/worker/workers'

import Empl from './components/ref/empl'
import Obj from './components/ref/obj'

import Wall from './components/ref/wall'
export default {
  name: 'App',

  components: {
    Workers, Obj, Empl, Wall
  },
  created(){
    this.$root.connectDB(function(db){
      console.log(`Версия программы ${db.version}v.`)
    })
  },
  data: () => ({
    drawer: false
  }),
};
</script>
