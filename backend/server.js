import  express  from "express"
import dotenv from "dotenv"
import colors from "colors"
import connectDB from "./config/db.js"
import { notFoundPage,errorHandler } from "./middleware/errorMiddleWare.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"


dotenv.config()
connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send("api is runnig")
})

app.use('/api/users', userRoutes)
//Products Routes
app.use('/api/products/',productRoutes);

//handle 404 error (not found Page)
app.use(notFoundPage)
// Error handler
app.use(errorHandler)



const PORT= process.env.PORT
app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV} mode on port: ${PORT}`.yellow.bold))