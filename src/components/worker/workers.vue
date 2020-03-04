<template>

<div>
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
        <tr v-for="item in desserts" :key="item.name">
          <td>{{ item.date }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.start }}</td>
          <td>{{ item.finish }}</td>
          <td>
              <EditWorker :nameEmp="item.name"/>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

</div>

</template>

<script>
import EditWorker from '../worker/editworker'
 export default {
     
     components:{
         EditWorker
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
            this.desserts = [
          {
            name: 'Frozen Yogurt',
            start: '8:00',
            finish: '9:00',
            date: '12.02.2020'
          },
                  {
            name: 'Frozen Yogurt',
            start: '8:00',
            finish: '9:00',
            date: '12.02.2020'
          },
                  {
            name: 'Frozen Yogurt',
            start: '8:00',
            finish: '9:00',
            date: '12.02.2020'
          },
                  {
            name: 'Frozen Yogurt',
            start: '8:00',
            finish: '9:00',
            date: '12.02.2020'
          },
                  {
            name: 'Frozen Yogurt',
            start: '8:00',
            finish: '9:00',
            date: '12.02.2020'
          },
                  {
            name: 'Frozen Yogurt',
            start: '8:00',
            finish: '9:00',
            date: '12.02.2020'
          },
                  {
            name: 'Frozen Yogurt',
            start: '8:00',
            finish: '9:00',
            date: '12.02.2020'
          },
                  {
            name: 'Frozen Yogurt',
            start: '8:00',
            finish: '9:00',
            date: '12.02.2020'
          },
        ]
        }
    }
  }
</script>

<style>

</style>