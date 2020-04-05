<template>

    <v-dialog v-model="dialog">
      
      <template v-slot:activator="{ on }">
            <v-btn color="success" outlined  v-on="on" style="width: 250px;margin: 5px auto;display: block;">
                <v-icon>mdi-arrow-down-bold-box</v-icon> Стена на сегодня
            </v-btn>
      </template>

      <v-card style="padding:10px">

        <v-text-field style="width:80px; float:left;" label="Литер" type="number" v-model="liter.liter"></v-text-field>
        <v-text-field style="width:80px; float:left;" label="Бс" type="number" v-model="liter.bs"></v-text-field>
        <v-text-field style="width:80px; float:left;" label="Стена" type="number" v-model="liter.wall"></v-text-field>
        <v-text-field type="number" label="Этаж" v-model="etaj"></v-text-field>

        <v-text-field type="time" label="Начало работы" v-model="pickertime"></v-text-field>
        <v-btn color="success" @click="set_norm"><v-icon>mdi-sticker-plus-outline</v-icon> Добавить</v-btn>
      </v-card>
    </v-dialog>

</template>

<script>


export default {
    props:['id_empl', 'datePlan'],
    data(){
        return {
            dialog: false,
            pickertime: this.$root.timeStart,
            liter: {},
            etaj: 0,
            chch: 0
        }
    },
    methods:{
        set_norm(){
            this.$root.cursor('Walls', this.get_norm)
        },
        get_norm(){
          const cursor = event.target.result
          if(cursor) {
              if (
                  Number(this.liter.liter) == Number(cursor.value.liter) &&
                  Number(this.liter.bs) == Number(cursor.value.bloksec) &&
                  Number(this.liter.wall) == Number(cursor.value.wallnum)
              ) {
                  this.chch = Number(cursor.value.chch)
              }
            cursor.continue()
          } else {
              this.add_rec()
          }
        },
        add_rec(){
            let list = []
            list.push({
                id_wall: this.liter.liter+'-'+this.liter.bs+'-'+this.liter.wall,
                start: this.pickertime,
                finish: "",
                coiff: 1,
                etaj: this.etaj,
                key_empl: this.id_empl,
                datePlan: this.datePlan,
                chch: this.chch
            })
            this.$root.add_record('PlanWall', list)             
            this.dialog= false
            this.$emit('onAddWall')
        }

    }
}
</script>

<style>

</style>