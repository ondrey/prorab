export default{
    timeStart: "09:00",
    timeFinish: "18:00",

    cursor(table, func) {
        this.connectDB(db => {
            let tx = db.transaction([table], 'readwrite')
            let empl = tx.objectStore(table)
            empl.openCursor().onsuccess = func      
          })

    },
    
    connectDB(f){
        var request = indexedDB.open("prorab", 1);

        request.onsuccess = function(){
            // При успешном открытии вызвали коллбэк передав ему объект БД
            f(request.result);
        }
        request.onupgradeneeded = function(e){
            // Если БД еще не существует, то создаем хранилище объектов.

            e.currentTarget.result.createObjectStore(
                'Emploeys', {
                keyPath: 'key',
                autoIncrement: true
            })

            e.currentTarget.result.createObjectStore(
                'Walls', {
                keyPath: 'key',
                autoIncrement: true
            })       
            
            e.currentTarget.result.createObjectStore(
                'Objects', {
                keyPath: 'key',
                autoIncrement: true
            })     
            
            e.currentTarget.result.createObjectStore(
                'Plan', {
                keyPath: 'key',
                autoIncrement: true
            })                  

            e.currentTarget.result.createObjectStore(
                'PlanWall', {
                keyPath: 'key',
                autoIncrement: true
            })                   
                               
        }
    },
 
    add_record(name_table, records){
        this.connectDB(db => {
            let tx = db.transaction([name_table], 'readwrite');
            let store = tx.objectStore(name_table)
            // Добаляем заметку в хранилище объектов
            for (let i = 0; i < records.length; i++) {
                store.put(records[i])                
            }
                            
        })
    }

}