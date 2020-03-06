<template>

    <v-dialog v-model="dialog">
      
      <template v-slot:activator="{ on }">
            <v-btn color="success" v-on="on" style="width: 250px;margin: 5px auto;display: block;">
                <v-icon>mdi-sticker-plus-outline</v-icon> Стена
            </v-btn>
      </template>

      <v-card style="padding:10px">
        <v-select :items="objects" label="Объект" v-model="objectsSel" @focus="refresh" ></v-select>   
        <v-select :items="wall" label="Стена" v-model="wallSel" @focus="refresh"></v-select>
        <v-text-field type="time" label="Начало работы" v-model="pickertime"></v-text-field>        
        <v-btn color="success" @click="add_rec"><v-icon>mdi-sticker-plus-outline</v-icon> Добавить</v-btn>
      </v-card>
    </v-dialog>

</template>

<script>
export default {
    props:['id_empl', 'datePlan'],
    data(){
        return {
            dialog: false,
            objects: [],
            wall: [],
            pickertime: "",
            objectsSel:{},
            wallSel:{}
        }
    },
    methods:{
        refresh(){
            this.$root.connectDB(db => {
            
            this.wall = []
            this.objects = []

            let tx = db.transaction(['Walls', 'Objects'], 'readwrite')
            let Walls = tx.objectStore('Walls')
            let Objects = tx.objectStore('Objects')
            
            Walls.openCursor().onsuccess = this.set_wall_list       
            Objects.openCursor().onsuccess = this.set_obj_list

            })
        },

        set_wall_list(event){
        const cursor = event.target.result
        if(cursor) {         
          this.wall.push({
                value: [cursor.key, cursor.value.nameobj], 
                text:  cursor.value.nameobj
            })   
          cursor.continue()
        }             

        },

        set_obj_list(event){
        const cursor = event.target.result
        if(cursor) {         
          this.objects.push({
                value: [cursor.key, cursor.value.nameobj], 
                text:  cursor.value.nameobj
            })   
          cursor.continue()
        }             

        },
        add_rec(){
            let list = []            
            list.push({
                id_wall: this.wallSel[0],
                text_wall: this.wallSel[1],
                id_object: this.objectsSel[0],
                text_object: this.objectsSel[1],
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