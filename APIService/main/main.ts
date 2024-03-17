import prisma from "./prisma.js"
import Fastify from "fastify"
import { FacilityRequest } from "./types/types.js"
import { pstDateToUtcRange } from "./util.js"
import { facilityReader } from "./db.js"

const server = Fastify()
const db = facilityReader(prisma)
const PORT = 3080

//get a specific sublocation
server.get<FacilityRequest>('/facility/:facilityId', async (req, res) => {
    const {day, month, year} = req.query
    const {facilityId} = req.params

    try {
        res.status(200)
        return await db.getFacilityRecords(Number(facilityId), day, month, year)
    } catch (e) {
        res.status(500)
        return
    }


})

//Get all available locations
server.get('/facility', async (req, res) => {
    try {
        res.status(200)
        return await db.getFacilities()
    } catch (e) {
        res.status(500)
        return
    }
})


await server.listen({port: PORT})
console.log("Listening on port: ", PORT)

process.on("SIGINT", async () => {
    await db.cleanup()
    console.log("Shutting down service...")
    process.exit(1)
})