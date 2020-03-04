<template>


    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      
      <template v-slot:activator="{ on }">
        <v-btn color="success" v-on="on" style="margin:8px;">
            <v-icon>mdi-message-plus</v-icon> 
        </v-btn>
      </template>

      <v-card>
        
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Регистрация работ</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="add_record">Добавить</v-btn>
          </v-toolbar-items>
        </v-toolbar>


       <div style="padding:25px">

        <v-combobox
          v-model="selectEmp"
          :items="empl"
          label="Выбрать сотрудников"
          multiple
          chips
          @focus="refresh"
        ></v-combobox>

            <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="picker"
                transition="scale-transition"
                offset-y
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                <v-text-field
                    v-model="picker"
                    label="Выбрать дату"                    
                    readonly
                    v-on="on"
                ></v-text-field>
                </template>
                    <v-date-picker locale="ru" v-model="picker" no-title scrollable :first-day-of-week="1">
                <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">Отмена</v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(picker)">Ок</v-btn>
                </v-date-picker>
            </v-menu> 

            <v-switch
            v-model="epsent"
            label="Отсутствует"
            ></v-switch>


            <v-textarea
            v-if="epsent"
            solo
            v-model="comment"
            label="Комментарий"
            ></v-textarea>  
            
            <v-text-field label="Время начала" v-else type="time" v-model="pickertime"></v-text-field>
            

       </div>


      </v-card>
    </v-dialog>

</template>

<script>
export default {
    data () {
      return {
        dialog: false,
        empl: [],
        selectEmp: "",
        picker: new Date().toISOString().substr(0, 10),
        pickertime: "",
        menu:false,
        comment: "",
        epsent: false
      }
    },
    created(){
      this.refresh()
    },
    methods:{
      refresh(){
        this.$root.connectDB(db => {
          this.empl = []
          let tx = db.transaction(['Emploeys'], 'readwrite')
          let empl = tx.objectStore('Emploeys')
          empl.openCursor().onsuccess = this.set_empl_list       
        })
      },
      add_record(){
        let list = []
        this.selectEmp.forEach(el => {
          list.push({
            key_empl: el.value,
            name: el.text,
            date: this.picker,
            start: this.pickertime,
            finish: "",
            comment: this.comment,
            epsent: this.epsent
          })
        });

        this.$root.add_record('Plan', list)

        this.selectEmp = []
        this.picker = new Date().toISOString().substr(0, 10)
        this.pickertime = ""
        this.comment = ""
        this.epsent = false

        this.dialog = false 

        this.$emit('close')     
      },
      set_empl_list(event){
        const cursor = event.target.result
        if(cursor) {
         
          this.empl.push({
            value:cursor.key, 
            text:`${cursor.value.familiya} ${cursor.value.name}`
            })   

          cursor.continue()
        }  
      },      
    }
  }
</script>

<style>

</style>