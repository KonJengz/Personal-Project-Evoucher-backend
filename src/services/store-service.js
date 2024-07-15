const prisma = require('../models/prisma')

const storeService = {}

storeService.findStore = ( dataStore ) => {
    return prisma.store.findFirst({
        where: {
            OR: [
                { lineShoppingUrl: dataStore.lineShoppingUrl },
                { nameStore: dataStore.nameStore }
            ]
        }
    })
}

storeService.addStore = ( dataStore) => {
    return prisma.store.create({
        data: dataStore
    })
}

storeService.findStoreById = (userId) => {
    return prisma.store.findMany({
        where: {
            OR: [
                {userId}
            ]
        }
    })
}

storeService.updateStoreById = (userId, storeId, data) => {
    return prisma.store.updateMany({
        where: {
            AND : [
                {id: storeId},
                {userId: userId}
            ]
        },
        data
    })
}

storeService.findStoreByUserId = (userId) => {
    return prisma.store.findMany({
        where: {
            userId
        }
    })
}

storeService.findStoreByStoreId = (storeId, userId) => {
    return prisma.store.findFirst({
        where: {
            AND: [
                {
                    id:storeId,
                    userId
                }
            ]
        }
    })
}

storeService.editStoreById = (data) => {
    return prisma.store.update({
        where: {id: data.id},
        data
    })
}

storeService.getStoreUniqueById = (id) => {
    return prisma.store.findUnique({
        where:{id}
    })
}

module.exports = storeService