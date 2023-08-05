const Photo = require('./../models/Photo')
const fs = require('fs')

//index.ejs dosyasindaki tum resimleri gosterme
exports.getAllPhotos = async (req, res) => {
    const page = req.query.page || 1 //baslangic sayfasi veya ilk sayfamiz
    const photosPerPage = 3 //her sayfada bulunacak resim sayisi

    const totalPhotos = await Photo.find({}).countDocuments() //mongodbdeki toplam veri sayisini donduruyor

    const photos = await Photo.find({})
        .sort('-dataCreated')
        .skip((page - 1) * photosPerPage) //Her sayfanın kendi fotoğrafları
        .limit(photosPerPage) //her sayfada gosterilecek resim sayisi limiti

    res.render('index', {
        photos: photos,
        current: page, 
        pages: Math.ceil(totalPhotos / photosPerPage), //sayfada kac tane resim olacagini belirliyor
    })
}

//photo.ejs dosyasindaki tek bir resmi gosterme
exports.getPhoto = async (req, res) => {
    const photoId = await Photo.findById(req.params.id)
    res.render('photo', {
        photoId,
    })
}

//Resim olusturma
exports.createPhoto = async (req, res) => {
    const uploadDir = 'public/uploads'

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir)
    }

    let uploadeImage = req.files.image
    let uploadPath = __dirname + '/../public/uploads/' + uploadeImage.name

    //Veritabanina kaydetme islemini yapiyoruz
    uploadeImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadeImage.name,
        })
        res.redirect('/')
    })
}

//edit.ejs dosyasindaki verileri guncelleme
exports.updatePhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    photo.title = req.body.title
    photo.description = req.body.description
    photo.save() //veritabanina kaydetme islemi

    res.redirect(`/photos/${req.params.id}`)
}

//edit.ejs dosyasindaki verileri silme
exports.deletePhoto = async (req, res) => {
    //ilk olarak buradaki islemler yapilacak
    const photo = await Photo.findOne({ _id: req.params.id }) //id'ye gore nesneyi sectik
    let deletedImage = __dirname + '/../public' + photo.image //photo objesinin image ozellini sectik
    fs.unlinkSync(deletedImage) //resmi sildik

    //sonra veritabanindan silme islemi yapilacak
    await Photo.findByIdAndRemove(req.params.id)
    res.redirect('/')
}


//safalandirma yapacagimiz html elementlerinin sifirdan buyuk olmasina gore for dongusu icerisine aldik