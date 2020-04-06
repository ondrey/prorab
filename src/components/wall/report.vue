<template>
    <v-simple-table dense style="width:90%; margin:15px auto;">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Всего часов</th>
          <th class="text-left">КТУ</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{preCH.toFixed(2)}} / {{CH.toFixed(2)}}</td>
          <td>{{ (preCnt>0 ? (preK/preCnt) : 0).toFixed(2)}} / {{ (cnt>0 ? (K/cnt) : 0).toFixed(2)}}</td>
          <td style="text-align:right">
            <v-btn @click="recalculete">
              <v-icon>mdi-update</v-icon>Обновить отчет
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
    props:['id_empl'],
    data(){
        return {
          preCH:0,
          CH:0,          
          K:0,
          preK:0,
          preCnt:0,
          cnt:0
        }
    },
    created(){
      this.recalculete()
    },
    methods:{
      recalculete(){
              
                this.cnt = 0
                this.CH = 0
                this.K = 0              
                this.preCnt = 0
                this.preCH = 0
                this.preK = 0
                      
        this.$root.cursor('PlanWall', this.cursorPlanWall)
      },
      cursorPlanWall(event){
        const cursor = event.target.result
        if(cursor) {          
          let curDate = new Date()
          let preDate = new Date()
          preDate.setMonth(preDate.getMonth()-1)
          
          if (Number(cursor.value.key_empl) == Number(this.id_empl)) {
            if(cursor.value.finish) {
              if(curDate.toLocaleDateString() == cursor.value.datePlan.toLocaleDateString()) {
                this.cnt += 1
                this.CH += Number(cursor.value.fact)
                this.K += Number(cursor.value.coiff)
              }
              if(preDate.toLocaleDateString() == cursor.value.datePlan.toLocaleDateString()) {
                this.preCnt += 1
                this.preCH += Number(cursor.value.fact)
                this.preK += Number(cursor.value.coiff)
              }
            }
          }

          cursor.continue()
        }
      }
    }
}
</script>

<style>

</style>