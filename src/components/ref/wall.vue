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
      
        <v-card style="margin:10px; background-color: honeydew; padding:8px">
            <v-text-field
            v-model="liter"
            label="Литер"
            type="number"
            style="width:80px; margin-left:8px; float:left;"
            ></v-text-field>
            <v-text-field
            v-model="bloksec"
            label="Блок-секция"
            type="number"
            style="width:118px; margin-left:8px; float:left;"
            ></v-text-field>

            <v-text-field
            v-model="wallnum"
            label="Стена"
            type="number"
            style="width:80px; margin-left:8px; float:left;"
            ></v-text-field>                             
            <v-text-field
            v-model="chch"
            label="Норма. часов"
            type="number"
            style="width:115px; margin-left:8px; float:left;"
            ></v-text-field>    
            <v-btn width="100%" color="success" @click="add_click">Добавить</v-btn>
        </v-card>
        

        <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Литер</th>
                  <th class="text-left">Блок-секция</th>
                  <th class="text-left">Стена</th>
                  <th class="text-left">Норма часов</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr  v-for="k in list" :key="k.id">
                  <td>{{k.liter}}</td>
                  <td>{{k.bloksec}}</td>
                  <td>{{k.wallnum}}</td>
                  <td>{{k.chch}}</td>
                  <td>
                    <v-btn icon @click="del_rec(k.id)">
                    <v-icon color="red">mdi-delete-alert-outline</v-icon>
                  </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

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
      compare( a, b ) {
        if ( Number(a.liter) < Number(b.liter) ){
          return -1;
        }
        if ( Number(a.liter) > Number(b.liter) ){
          return 1;
        }
        return 0;
      },      
      
      add_click(){        
        this.$root.add_record('Walls',[
          {liter: this.liter, 
          bloksec: this.bloksec, 
          wallnum: this.wallnum, 
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
            chch:cursor.value.chch
            })   

          cursor.continue()
        } else {
          this.list.sort(this.compare);
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