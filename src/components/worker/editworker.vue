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
          
            <v-col cols="12" sm="3"><v-switch v-model="epsent" label="Отсутствует"></v-switch></v-col>

            <v-col cols="12" sm="9" v-if="epsent"><v-text-field v-model="commentFinish" label="Комментарий" outlined></v-text-field></v-col>                  
            
            <template v-else>
              <v-col cols="12" sm="5" >
                <v-text-field type="time" v-model="pickertimeStart" outlined label="Время начала"></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" >
                <v-text-field type="time" v-model="pickertime" outlined label="Время завершения"></v-text-field>
              </v-col>
            </template>

            
        </v-row>
        
        <AddWall :id_empl="key_empl" :datePlan="datePlan" @onAddWall="refresh_wall_plan"></AddWall>

    <table width="90%" v-for="k in listWall" :key="k.key" border="0" cellpadding="0" cellspacing="0"
    style="margin: 15px auto;box-shadow: 2px 2px 4px 1px #c1c1c1;padding: 5px;border-radius: 3px;">
      
      <tr>
        <td colspan="3" align="left" width="75%">
          <strong>  <v-icon>mdi-floor-plan</v-icon>{{ k.id_wall }} / {{ k.etaj }}</strong>
        </td>
        <td align="right" width="25%">
          <EditWall :id_plan="k.key" @onUpdatePlanWall="refresh_wall_plan"/>
        </td>
      </tr>
      <tr>
        <td width="25%">{{k.start}}</td>        
        <td width="25%">{{ Boolean(k.finish) ? k.finish : 'В работе'}}</td>
        <td width="25%"><v-icon>mdi-finance</v-icon>{{ k.coiff }}</td>
        <td width="25%" align="right"> 
          <strong style="color: darkgoldenrod;">{{ Boolean(k.fact) ? k.fact+' ч.ч.' : '' }}</strong> 
          {{ k.chch }} н.ч.
        </td>
      </tr>
    </table>
      
      
      <h3 style="      
      margin: 25px;
      color: cadetblue;">КТУ меньше 1:</h3>      

    <table width="90%" v-for="ktu in listWall_old" :key="'00'+ktu.key" 
           border="0" cellpadding="0" cellspacing="0"
           style="margin: 15px auto;box-shadow: 2px 2px 4px 1px #c1c1c1;padding: 5px;border-radius: 3px; background-color:gold;">
      
      <tr>
        <td colspan="3" align="left" width="75%">
          <strong>  <v-icon>mdi-floor-plan</v-icon>{{ ktu.id_wall }} / {{ ktu.etaj }}</strong>
        </td>
        <td align="right" width="25%">
          {{ktu.datePlan.toLocaleDateString()}}
        </td>
      </tr>
      <tr>
        <td width="25%"> {{ktu.start}}</td>        
        <td width="25%">{{ Boolean(ktu.finish) ? ktu.finish : 'В работе'}}</td>
        <td width="25%"><v-icon>mdi-finance</v-icon>{{ ktu.coiff }}</td>
        <td width="25%" align="right"> 
          <strong style="color: darkgoldenrod;">{{ Boolean(ktu.fact) ? ktu.fact+' ч.ч.' : '' }}</strong> 
          {{ ktu.chch }} н.ч.
        </td>
      </tr>
    </table>          

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
            pickertimeStart:this.$root.timeStart,
            pickertime: this.$root.timeFinish,
            commentFinish: "",
            listWall: [],
            listWall_old: [],
            epsent: false
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
              curecord.epsent = this.epsent
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
              if(this.datePlan.toLocaleDateString() == cursor.value.datePlan.toLocaleDateString() ) {                  
                  this.listWall.push(cursor.value);                  
              }
              if (Number(cursor.value.coiff) < 1) {
                this.listWall_old.push(cursor.value);
              }
            cursor.continue()
          }            
        }
    }
}
    
</script>

<style>

</style>