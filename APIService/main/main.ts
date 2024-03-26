import prisma from "./prisma.js"
import Fastify from "fastify"
import { FacilityRecordRequest, SubfacilityRequest } from "./types/types.js"
import { facilityReader } from "./db.js"
import { validateFacilityRecordRequestInput } from "./util.js"
import cors from "@fastify/cors"

const server = Fastify()
const db = facilityReader(prisma)
const PORT = 3080

server.register(cors, {
    origin: "*"
})

//Get the records of a facility on a specific day
server.get<FacilityRecordRequest>('/records/:facilityId', {
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

//Get all available parent locations
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

//Get all available subfacilities of a facility
server.get<SubfacilityRequest>('/facilities/:subfacilityId', async (req, res) => {
    try {

        
        const {subfacilityId} = req.params

        console.log(subfacilityId)

        const dbResult = await db.getSubfacilities(Number(subfacilityId))

        res.status(200)
        return dbResult

    } catch(e) {
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