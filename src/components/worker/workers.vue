<template>

<div>
  <div style="text-align:right">
    Добвать отчет по сотруднику
    <AddWorker @close="get_list"></AddWorker>
  </div>
  
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Дата</th>  
          <th class="text-left">Сотруд.</th>
          <th class="text-left">Начало</th>
          <th class="text-left">Финиш</th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.key">
          <td>{{ item.date }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.start }}</td>
          <td>{{ item.finish }}</td>
          <td>
              <EditWorker @close="get_list" :nameEmp="item.name" :key_plan="item.key"/>
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
            
            if (cursor.value.finish == "")        
              this.desserts.push(cursor.value)
              cursor.continue()
          }  
        },

    }
  }
</script>

<style>

</style>