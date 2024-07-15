const prisma = require('../models/prisma')

const voucherService = {}

voucherService.createVoucher = (data) => {
    // console.log('data createVoucher', data)
    return prisma.evoucher.create({
        data: data
    })
}

voucherService.getVoucher = (storeId) => {
    return prisma.evoucher.findMany({
        where: {
            AND: [
                {storeId}
            ]
        }
    })
}

voucherService.findVoucher = (numberVoucher) => {
    return prisma.evoucher.findFirst({
        where: {
            numberVoucher
        }
    })
}

voucherService.updateStatusVoucher = (data,idVoucher) => {
    return prisma.evoucher.update({
        where: {
                id: idVoucher
        },
        data: {
            statusVoucher: true
        }
    })
}

voucherService.updateVoucher = (data) => {
    return prisma.evoucher.update({
        where: {id: data.id
            // AND: [
            //     {storeId},
            //     { id: data.id}
            // ]
        },
        data
    })
}

voucherService.updateCountSendEmail= (numberVoucher,data) => {
    return prisma.evoucher.update({
        where: {numberVoucher
        },
        data: {
            countSendVoucher: data
        }
    })
}

voucherService.findUser = (numberVoucher) => {
    return prisma.evoucher.findMany({
        where: {numberVoucher
        },
        include:{
            store: {
                include: {user: true}
            }
        }
    })
}

voucherService.getcountSendEmailCurrent = (numberVoucher) => {
    return prisma.evoucher.findFirst({
        where: {numberVoucher
        }
    })
}

module.exports = voucherService