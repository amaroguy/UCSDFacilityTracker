import prisma from "./prisma.js"
import Fastify from "fastify"
import { FacilityRequest } from "./types/types.js"
import { pstDateToUtcRange } from "./util.js"

const server = Fastify()

server.get<FacilityRequest>('/', async (req, res) => {
    const {day, month, year} = req.query

    const [startTime, endTime] = pstDateToUtcRange(month,day,year)

    const records = await prisma.facilityRecord.findMany({
        where: {
           createdAt: {
                gte: startTime,
                lte: endTime
           } 
        }
    }) 

    return records
})

await server.listen({port: 3080})

process.on("SIGINT", async () => {
    await prisma.$disconnect()
    process.exit(1)
})