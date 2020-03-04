export default{
    connectDB(f){
        var request = indexedDB.open("prorab", 1);

        request.onerror = function(err){
            console.log(err);
        };
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
            
            tx.oncomplete = () => {
                console.log('close')
            }
            tx.onerror = (event) => {
                console.log(event)
            }                
        })
    }

}