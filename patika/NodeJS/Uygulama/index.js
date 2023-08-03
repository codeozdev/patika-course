const fs = require('fs')

fs.rmdir('patika', { recursive: true }, (err) => {
    if (err) throw err
    console.log('Klasorler silindi.')
})

//fs.mkdir('patika/img' boyle yazarsak patika klasoru varsa icine img klasoru olusturur. patika klasoru yoksa hata verir.
//patika klasoru yokken iki klasor birden olusturmak istiyorsak `{ recursive: true }` yazmamiz gerekir.
