<template>
  
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      
      <template v-slot:activator="{ on }">
          <v-list-item v-on="on">
            <v-list-item-icon>
              <v-icon>mdi-card-account-details-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Отчет по сотруднику</v-list-item-title>
          </v-list-item>
      </template>

      <v-card>
        
        <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
        <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Отчет по сотруднику</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
        
        </v-toolbar-items>
        </v-toolbar>
      
        <div style="text-align:right;margin:25px;margin-right:150px;" v-if="chch_all">
            <div>всего часов: <strong style="color:gold;">{{chch_all}}</strong></div>
            <div>средняя КТУ:<strong style="color:grey;">{{ktu / countWall}}</strong></div>
            <div>сумма без КТУ: <strong style="color:red;">{{ chch_all*price }}</strong></div>
            <div>сумма итоговая: <strong style="color:green;">{{ (chch_all*price)*(ktu / countWall) }}</strong></div>
        </div>

        <v-card style="margin:10px; background-color: honeydew; padding:8px">            
            <v-select
                :items="emplList"
                label="Сотрудник"
                v-model="empl_id"
                item-text="name"
                item-value="id"
            ></v-select>
            <v-text-field
            type="number"
            v-model="year"
            label="Год"
            style="width:80px;float:left;"
            ></v-text-field>
            <v-text-field
            type="number"
            v-model="month_id"
            label="Месяц"
            style="width:80px;float:left;"
            ></v-text-field>
            <v-text-field
            type="number"
            v-model="price"
            label="Стоимость чч."
            style="width:150px;float:left;"
            ></v-text-field>

            <v-btn width="100%" color="success" @click="getRep">Получить</v-btn>

        </v-card>

      </v-card>
    </v-dialog>

</template>

<script>

export default {
    data(){
        return {
            dialog: false,
            empl_id: -1,
            month_id: new Date().getMonth()+1,
            year: new Date().getFullYear(),
            price: 0,
            emplList: [],
            wallList: [],

            chch_all:0,
            ktu:0,
            countWall:0

        }
    },
    created(){
        this.emplList = []
        this.$root.cursor('Emploeys', this.cursor_empl);
    },
    methods:{
        getRep(){
            this.$root.cursor('PlanWall', this.cursor_wallplan)
        },
        cursor_wallplan(event){
            const cursor = event.target.result
                if(cursor) {
                    if(cursor.value.datePlan.getMonth()+1 == Number(this.month_id) && cursor.value.datePlan.getFullYear() == Number(this.year)){
                        if(this.empl_id == cursor.value.key_empl){
                            this.countWall += 1
                            this.chch_all += Number(cursor.value.fact)
                            this.ktu += Number(cursor.value.coiff)
                        }
                        
                    }
                    cursor.continue()
                }
        },
        cursor_empl(event) {
          const cursor = event.target.result
          if(cursor) {
              this.emplList.push({
                  'name':cursor.value.familiya + ' ' + cursor.value.name,
                  'id': cursor.value.key
              })
              cursor.continue()            
            }            
        }
    }
}
</script>

<style>

</style>