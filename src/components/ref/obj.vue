<template>
  
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      
      <template v-slot:activator="{ on }">
          <v-list-item v-on="on">
            <v-list-item-icon>
              <v-icon>mdi-format-section</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Объекты</v-list-item-title>
          </v-list-item>
      </template>

      <v-card>
        
        <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
        <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Объекты</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
        
        </v-toolbar-items>
        </v-toolbar>
      
        <v-card style="margin:10px; background-color: greenyellow; padding:8px">
            <v-text-field
            v-model="nameobj"
            label="Блок / Секция"
            ></v-text-field>

            <v-btn width="100%" color="success" @click="add_click">Добавить</v-btn>

        </v-card>
        


      <v-list>
        <v-list-item v-for="k in list" :key="k.id">
          <v-list-item-content>
            {{k.nameobj}} 
            <!-- <v-list-item-subtitle>
            {{k.name}}
            </v-list-item-subtitle> -->
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
            nameobj:""
        }
    },
    methods:{      
      add_click(){        
        this.$root.add_record('Objects',[
          {nameobj: this.nameobj},
        ]) 
        this.refresh()       
      },
      set_list(event){
        const cursor = event.target.result
        if(cursor) {
          
          this.list.push({
            id:cursor.key, 
            nameobj:cursor.value.nameobj, 
            })   

          cursor.continue()
        }  
      },
      del_rec(idnum){        
        if (confirm("Удалить выбранную запись?")){
          let id_ = idnum
          this.$root.connectDB(db => {
            let tx = db.transaction(['Objects'], 'readwrite')
            let store = tx.objectStore('Objects')
            let res = store.delete(id_)
            res.onsuccess = this.refresh
          })
        }
        
      },
      refresh(){
        this.$root.connectDB(db => {
          this.list = []
          let tx = db.transaction(['Objects'], 'readwrite')
          let store = tx.objectStore('Objects')
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