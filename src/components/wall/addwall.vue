<template>

    <v-dialog v-model="dialog">
      
      <template v-slot:activator="{ on }">
            <v-btn color="success" v-on="on" style="width: 250px;margin: 5px auto;display: block;">
                <v-icon>mdi-sticker-plus-outline</v-icon> Стена
            </v-btn>
      </template>

      <v-card style="padding:10px">

        <v-text-field label="Л-БС-С (01-01-002)" placeholder="##-##-###" v-mask="litermask" v-model="liter"></v-text-field>
        <v-text-field type="number" label="Этаж" v-model="etaj"></v-text-field>

        <v-text-field type="time" label="Начало работы" v-model="pickertime"></v-text-field>
        <v-btn color="success" @click="add_rec"><v-icon>mdi-sticker-plus-outline</v-icon> Добавить</v-btn>
      </v-card>
    </v-dialog>

</template>

<script>
import { mask } from 'vue-the-mask'

export default {
    directives: {
        mask,
    },
    props:['id_empl', 'datePlan'],
    data(){
        return {
            dialog: false,
            pickertime: "",
            liter: "",
            litermask: "##-##-###"
        }
    },
    methods:{
        add_rec(){
            let list = []            
            list.push({
                id_wall: this.liter,
                start: this.pickertime,
                finish: "",
                coiff: 1,
                key_empl: this.id_empl,
                datePlan: this.datePlan
            })
            this.$root.add_record('PlanWall', list)
            this.dialog= false
        }

    }
}
</script>

<style>

</style>