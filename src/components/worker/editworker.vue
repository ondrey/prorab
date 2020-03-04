<template>
  
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      
      <template v-slot:activator="{ on }">
            <v-btn color="success" icon v-on="on">
                <v-icon>mdi-comment-edit</v-icon>
            </v-btn>
      </template>

      <v-card>
        
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Редактирование</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">Сохранить</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-list subheader color="#eaeaea">
          <v-list-item>
            <v-list-item-content>
            <v-list-item-subtitle>
              Установите время конца рабочего дня, для <strong>{{nameEmp}}</strong>

            </v-list-item-subtitle>
            <v-text-field type="time" v-model="pickertime"></v-text-field>

            </v-list-item-content>
          </v-list-item>          
        </v-list>
      
      <AddWall></AddWall>
      

      <v-list rounded>
        <v-list-item v-for="k in listWall" :key="k">
          <v-list-item-content>
            Блок / Секция / Стена
            <v-list-item-subtitle>
              8:00 / --:--
            </v-list-item-subtitle>
          </v-list-item-content>

        <v-list-item-action>
          <v-list-item-action-text>12.02.2020</v-list-item-action-text>
          
          <EditWall />

        </v-list-item-action>

        </v-list-item>

      </v-list>

      </v-card>

    </v-dialog>


</template>

<script>
import AddWall from "../wall/addwall";
import EditWall from '../wall/editwall';
export default {
    components:{
      AddWall, EditWall
    },
    props: ['nameEmp'],
    data(){
        return {
            dialog: false,
            pickertime: "17:00",
            listWall: new Array(200)
        }
    }
}
</script>

<style>

</style>