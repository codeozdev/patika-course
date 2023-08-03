const fs = require('fs')

//Veri okuma
fs.readFile('employees.json', 'utf8', (err, data) => {
    if (err) throw err
    console.log(data)
})

//Veri ekleme
fs.appendFile(
    'employees.json',
    '\n{"name": "Employee 2 Name", "salary": 4000}',
    'utf8',
    (err, data) => {
        if (err) throw err
        console.log(data)
    },
    console.log('Veri ekleme islemi tamamlandi.'),
)

//Veri silme
fs.unlink('employees.json', (err) => {
    if (err) throw err
    console.log('Dosya silindi.')
})
