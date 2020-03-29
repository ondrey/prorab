<template>
  
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      
      <template v-slot:activator="{ on }">
          <v-list-item v-on="on">
            <v-list-item-icon>
              <v-icon>mdi-castle</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Стены</v-list-item-title>
          </v-list-item>
      </template>

      <v-card>
        
        <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
        <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Стены</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
        
        </v-toolbar-items>
        </v-toolbar>
      
        <v-card style="margin:10px; background-color: greenyellow; padding:8px">
            <v-text-field
            v-model="liter"
            label="Литер"
            type="number"
            style="width:30%; margin-left:8px; float:left;"
            ></v-text-field>            
            <v-text-field
            v-model="bloksec"
            label="Блок-секция"
            type="number"
            style="width:30%; margin-left:8px; float:left;"
            ></v-text-field>

            <v-text-field
            v-model="wallnum"
            label="Стена"
            type="number"
            style="width:30%; margin-left:8px; float:left;"
            ></v-text-field>
      <br />
            <v-text-field
            v-model="vstoun"
            label="Кол-во кирпича"
            type="number"
            style="width:20%; margin-left:8px; float:left;"
            ></v-text-field>              
            <v-text-field
            v-model="v2"
            label="М2"
            type="number"
            style="width:20%; margin-left:8px; float:left;"
            ></v-text-field>          
            <v-text-field
            v-model="v3"
            label="М3"
            type="number"
            style="width:20%; margin-left:8px; float:left;"
            ></v-text-field>                   
            <v-text-field
            v-model="chch"
            label="Норма. часов"
            type="number"
            style="width:20%; margin-left:8px; float:left;"
            ></v-text-field>    
            <v-btn width="100%" color="success" @click="add_click">Добавить</v-btn>
        </v-card>
        


      <v-list>
        <v-list-item v-for="k in list" :key="k.id">
          <v-list-item-content>
            Литер:{{k.liter}} / Блок-секция:{{k.bloksec}} / Стена № {{k.wallnum}} 
            <v-list-item-subtitle>
            {{k.vstoun}} шт., {{k.v2}} м2., {{k.v3}} м3., {{k.chch}} чч.. 
            </v-list-item-subtitle>
          </v-list-item-content>

        <v-list-item-action>
                    
          <v-btn icon @click="del_rec(k.id)">
            <v-icon color="red">mdi-delete-alert-outline</v-icon>
          </v-btn>

        </v-list-item-action>

        </v-list-item>

      </v-list>

      </v-card>

    </v-dialog>

</template>

<script>

export default {
    
    data(){
        return {
            dialog: false,
            list: [],
            liter: null,
            bloksec: null,
            wallnum: null,

            vstoun: null,
            v2: null,
            v3: null,
            chch: null
        }
    },
    methods:{      
      add_click(){        
        this.$root.add_record('Walls',[
          {liter: this.liter, 
          bloksec: this.bloksec, 
          wallnum: this.wallnum, 
          vstoun: this.vstoun,
          v2: this.v2,
          v3: this.v3,
          chch: this.chch
          },
        ]) 
        this.refresh()       
      },
      set_list(event){
        const cursor = event.target.result
        if(cursor) {
          
          this.list.push({
            id:cursor.key, 
            liter:cursor.value.liter, 
            bloksec:cursor.value.bloksec, 
            wallnum:cursor.value.wallnum,

            vstoun:cursor.value.vstoun,
            v2:cursor.value.v2,
            v3:cursor.value.v3,
            chch:cursor.value.chch
            })   

          cursor.continue()
        }  
      },
      del_rec(idnum){        
        if (confirm("Удалить выбранную запись?")){
          let id_ = idnum
          this.$root.connectDB(db => {
            let tx = db.transaction(['Walls'], 'readwrite')
            let store = tx.objectStore('Walls')
            let res = store.delete(id_)
            res.onsuccess = this.refresh
          })
        }
        
      },
      refresh(){
        this.$root.connectDB(db => {
          this.list = []
          let tx = db.transaction(['Walls'], 'readwrite')
          let store = tx.objectStore('Walls')
          store.openCursor().onsuccess = this.set_list       
        })
      }
    },
    created(){
      this.refresh()   
    }
}
</script>

<style>

</style>