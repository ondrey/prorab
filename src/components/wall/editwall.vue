<template>

    <v-dialog v-model="dialog">
      
      <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon color="green">mdi-file-document-edit-outline</v-icon>
          </v-btn>

      </template>

      <v-card style="padding:10px">
        <v-text-field type="time" label="Завершение работы" v-model="pickertime"></v-text-field>
        <v-text-field type="number" label="Коиффицент" v-model="koiff"></v-text-field>
        <v-btn color="success"><v-icon>mdi-sticker-plus-outline</v-icon> Сохранить</v-btn>
      </v-card>
    </v-dialog>

</template>

<script>
export default {
    data(){
        return {
            dialog: false,
            pickertime: "",
            koiff: 1
        }
    }
}
</script>

<style>

</style>