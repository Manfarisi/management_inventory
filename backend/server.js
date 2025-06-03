import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import bahanBakuRouter from './routes/bahanBakuRoute.js'
import pengeluaranRouter from './routes/PengeluaranRoute.js'
import pemasukanRouter from './routes/pemasukanRouter.js'
import ProdukKeluarRouter from './routes/ProdukKeluar.js'
// import penjualanMasuk from './routes/penjualanMasukRoute.js'

// app config
const app = express()
const port = process.env.PORT || 4000



// middleware
app.use(cors())
app.use(express.json())

// api endpoint
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))


app.use("/api/bahanBaku",bahanBakuRouter)
app.use("/api/bahanKeluar",ProdukKeluarRouter)
app.use("/api/pengeluaran",pengeluaranRouter)
app.use("/api/pemasukan",pemasukanRouter)






//db connec
await connectDB()




app.get("/",(req,res)=>{
    res.send("API WORKING!!!")
})

app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`)
})

