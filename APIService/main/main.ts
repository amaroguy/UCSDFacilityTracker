import prisma from "./prisma.js"
import Fastify from "fastify"
import { FacilityRecordRequest } from "./types/types.js"
import { facilityReader } from "./db.js"
import { validateFacilityRecordRequestInput } from "./util.js"

const server = Fastify()
const db = facilityReader(prisma)
const PORT = 3080

server.get<FacilityRecordRequest>('/facilities/:facilityId', {
    preValidation: validateFacilityRecordRequestInput,
}, async (req, res) => {
    
    try {
        const {day, month, year} = req.query
        const {facilityId} = req.params
        const dbResult = await db.getFacilityRecords(Number(facilityId), day, month, year)
        
        res.status(200)
        return dbResult        

    } catch (error) {
        const e = error as Error
        res.status(500)
        res.send("Internal server error oopsies")
    }
})

//Get all available locations
server.get('/facilities', async (req, res) => {
    try {

        const dbResult = await db.getFacilities()
        
        res.status(200)
        return dbResult
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