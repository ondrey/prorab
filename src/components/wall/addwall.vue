<template>

    <v-dialog v-model="dialog">
      
      <template v-slot:activator="{ on }">
            <v-btn color="success" v-on="on" style="width: 250px;margin: 5px auto;display: block;">
                <v-icon>mdi-sticker-plus-outline</v-icon> Стена
            </v-btn>
      </template>

      <v-card style="padding:10px">
        <v-select :items="objects" label="Объект"></v-select>   
        <v-select :items="wall" label="Стена"></v-select>
        <v-text-field type="time" label="Начало работы" v-model="pickertime"></v-text-field>        
        <v-btn color="success"><v-icon>mdi-sticker-plus-outline</v-icon> Добавить</v-btn>
      </v-card>
    </v-dialog>

</template>

<script>
export default {
    data(){
        return {
            dialog: false,
            objects: [],
            wall: [],
            pickertime: ""
        }
    }
}
</script>

<style>

</style>