const Koa = require('koa')
const app = new Koa()

// response
app.use(async (ctx) => {
    if (ctx.url === '/') {
        ctx.body = '<h1>INDEX SAYFASINA HOSGELDINIZ</h1>'
    } else if (ctx.url === '/hakkimda') {
        ctx.body = '<h1>HAKKIMDA SAYFASINA HOSGELDINIZ</h1>'
    } else if (ctx.url === '/iletisim') {
        ctx.body = '<h1>ILETISIM SAYFASINA HOSGELDINIZ</h1>'
    } else {
        ctx.body = '<h1>404 SAYFA BULUNAMADI</h1>'
    }
})

app.listen(3000)
