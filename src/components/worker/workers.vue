<template>

<div>
  <div style="text-align:right">
    <span style="
    margin: 25px;
    font-weight: lighter;
    font-size: x-large;
    ">Табель <strong style="color:blue;">{{curDate.toLocaleDateString()}}</strong></span>
      
    <AddWorker @close="get_list"></AddWorker>
  </div>
  
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Начало</th> 
          <th class="text-left">Сотруд.</th>          
          <th class="text-left">Комментарий</th>
          <th class="text-left">Финиш</th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.key">
          <td>{{ item.start }}</td>
          <td>{{ item.name }}</td>  
          <td>{{ item.comment }}</td>          
          <td>{{ item.finish }}</td>
          <td>
              <EditWorker @close="get_list" :nameEmp="item.name" :key_empl="item.key_empl" :datePlan="item.date" :key_plan="item.key"/>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>


</div>

</template>

<script>
import EditWorker from '../worker/editworker'
import AddWorker from '../worker/addworker'
 export default {
     
     components:{
         EditWorker, AddWorker
     },

    data () {
      return {
        desserts: [],
        desserts_old: [],
        curDate: new Date(),
        timeStart: "09:00"
      }
    },
    created(){
        this.get_list()
    },
    methods:{
        get_list(){
          this.$root.connectDB(db => {
            this.desserts = []
            let tx = db.transaction(['Plan'], 'readwrite')
            let plan = tx.objectStore('Plan')
            plan.openCursor().onsuccess = this.set_list       
          })          
        },
        set_list(event){
          const cursor = event.target.result
          if(cursor) { 
            
            if(this.curDate.toLocaleDateString() == cursor.value.date.toLocaleDateString()) {
              this.desserts.push(cursor.value)
            }
            
            cursor.continue()
          } else {
            
            this.create_today_list()
          }  
        },
        
        create_today_list() {
          // Создать список сотрудников на сегодня
          
          if (this.desserts.length == 0) {
            
          
          this.$root.connectDB(db => {
              this.desserts = []
              let tx = db.transaction(['Emploeys'], 'readwrite')
              let empl = tx.objectStore('Emploeys')
              empl.openCursor().onsuccess = this.create_empl_list       
            })
          }
        },
        create_empl_list(event){
          const cursor = event.target.result
          if(cursor) {
            
            let plan = {
              key_empl: cursor.value.key,
              name: cursor.value.familiya + ' ' + cursor.value.name,
              date: this.curDate,
              start: this.timeStart,
              finish: "",
              comment: "",
              epsent: false
            }
            this.desserts.push(plan)
            this.$root.add_record('Plan', [plan, ])

            cursor.continue()
          }
        }


    }
  }
</script>

<style>

</style>