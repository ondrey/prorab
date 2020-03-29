<template>
  
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" @click="refresh_wall_plan">
      
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
          <v-toolbar-title>{{nameEmp}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="update"> <v-icon style="color: darkseagreen;">mdi-marker-check</v-icon> Завершить работу</v-btn>

          </v-toolbar-items>
        </v-toolbar>
        <v-row style="margin:15px">
          <v-col cols="12" sm="3"><v-text-field type="time" v-model="pickertimeStart" outlined label="Время начала"></v-text-field></v-col>
          <v-col cols="12" sm="3"><v-text-field type="time" v-model="pickertime" outlined label="Время завершения"></v-text-field></v-col>
          <v-col cols="12" sm="6"><v-text-field v-model="commentFinish" label="Комментарий" outlined></v-text-field></v-col>

        </v-row>


      
      <AddWall :id_empl="key_empl" :datePlan="datePlan"></AddWall>      

      <v-list rounded>
        <v-list-item v-for="k in listWall" :key="k.key">
          <v-list-item-content>
            {{k.text_object}} / {{k.text_wall}}
            <v-list-item-subtitle>
              {{k.start}} / {{k.finish}}
            </v-list-item-subtitle>
          </v-list-item-content>

        <v-list-item-action>
          <v-list-item-action-text>{{k.datePlan}}</v-list-item-action-text>         
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
    props: ['nameEmp', 'key_empl', 'datePlan', 'key_plan'],
    data(){
        return {
            dialog: false,
            pickertimeStart:"09:00",
            pickertime: "17:00",
            commentFinish: "",
            listWall: [],
            listWall_old: []
        }
    },
    watch: {
      dialog: function (val) {
        if(val) {
          this.refresh_wall_plan()
        }
      }
    },
    methods:{
        update(){
          this.$root.connectDB(db => {
            this.desserts = []
            let tx = db.transaction(['Plan'], 'readwrite')
            let plan = tx.objectStore('Plan')
            plan.openCursor().onsuccess = this.update_cursor       
          })          
        },
        update_cursor(event){
          const cursor = event.target.result
          if(cursor) {    
            console.log(cursor.value.key , this.key_plan)
            if (cursor.value.key == this.key_plan) {
              let curecord = cursor.value
              curecord.finish = this.pickertime
              curecord.start = this.pickertimeStart
              curecord.comment = this.commentFinish
              cursor.update(curecord)
              this.dialog = false
              this.$emit('close')
            }                    
            cursor.continue()
          }  
        },


        refresh_wall_plan(){          
            this.$root.connectDB(db => {
            
            this.listWall = []
            this.listWall_old = []

            let tx = db.transaction(['PlanWall'], 'readwrite')
            let PlanWall = tx.objectStore('PlanWall')
            
            PlanWall.openCursor().onsuccess = this.get_list_wall_plan
            })            
        },
        get_list_wall_plan(){
          
          const cursor = event.target.result
          if(cursor) {     
            if (cursor.value.key_empl == this.key_empl)
              this.listWall.push(cursor.value)
            else 
              this.listWall_old.push(cursor.value)

            cursor.continue()
          }            
        }


    }
}
    
</script>

<style>

</style>