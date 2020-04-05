<template>

    <v-dialog v-model="dialog">
      
      <template v-slot:activator="{ on }">
          <v-btn icon small v-on="on">
            <v-icon color="green">mdi-file-document-edit-outline</v-icon>
          </v-btn>          
      </template>

      <v-card style="padding:10px">
        <v-text-field type="time" label="Завершение работы" v-model="pickertime"></v-text-field>
        <v-text-field type="number" label="Коиффицент" v-model="koiff"></v-text-field>
        <v-btn color="success" @click="update"><v-icon>mdi-sticker-plus-outline</v-icon> Сохранить</v-btn>
      </v-card>
    </v-dialog>

</template>

<script>
export default {
    props: ['id_plan'],
    data(){
        return {
            dialog: false,
            pickertime: "",
            koiff: 1
        }
    },
    methods:{
      update(){
          this.$root.connectDB(db => {
            this.desserts = []
            let tx = db.transaction(['PlanWall'], 'readwrite')
            let plan = tx.objectStore('PlanWall')
            plan.openCursor().onsuccess = this.cursor_update       
          })        
      },
      cursor_update(event){
          const cursor = event.target.result
          if(cursor) { 
            if (cursor.value.key == this.id_plan) {
              let curecord = cursor.value
              curecord.finish = this.pickertime
              curecord.coiff = this.koiff
              
              let start = new Date(curecord.datePlan.toLocaleDateString() + ' ' + curecord.start)
              let finish = new Date(curecord.datePlan.toLocaleDateString() + ' ' + this.pickertime)
              curecord.fact = ((finish - start)/1000/60/60).toFixed(1)
              cursor.update(curecord)
              this.dialog = false
              this.$emit('onUpdatePlanWall')
            }                    
            cursor.continue()
          }
      }
    }
}
</script>

<style>

</style>