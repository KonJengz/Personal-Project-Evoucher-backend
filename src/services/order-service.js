const prisma = require('../models/prisma')
const transporter = require('../config/mail')

const orderService = {}

orderService.createOrder = (data) =>{
    return prisma.orderVoucher.create({data})
}

orderService.sendEmail = (createOrder,dataVoucherSendEmail) =>{
    const mailOptions = {
        from: 'digital_mkt@emeraldhotel.com',  // sender address
        to: createOrder.emailEnduser,   // list of receivers
        subject: `voucher ${dataVoucherSendEmail.nameVoucher}`,
        html: `<div style="border-radius: 30px; overflow: hidden; margin: 15px; margin: auto; width: 80vw;">
        <div>
          <img style="width: 100%;" src=${dataVoucherSendEmail.imageVoucher} alt="voucher">
        </div>
    
        <div style="padding: 10px;">
            <div style="padding-block: 30px;">
                <div style="text-align: center; padding: 2px; margin: 10px;">
                    <h2 style="font-size: 20; margin: 0;">${dataVoucherSendEmail.nameVoucher}</h2>
                </div>
            
                <div style="text-align: center; padding: 2px; margin: 10px;">
                    <h2 style="font-size: 14px; margin: 0;">ชื่อคุณลูกค้า: ${createOrder.nameEnduser}</h2>
                </div>
    
                <div style="text-align: center; padding: 2px; margin: 10px;">
                    <h2 style="font-size: 14px; margin: 0;">number voucher: ${createOrder.voucherId}</h2>
                </div>
            </div>
    
            <div style="text-align: center; padding: 2px; margin: 10px;">
                <img style="width: 70%;" src=${dataVoucherSendEmail.qrCode} alt="qrCode">
            </div>
    
            <div style="padding-block: 30px;">
                <div style="text-align: center; padding: 2px; margin: 10px;">
                    <h2 style="font-size: 14px; margin: 0;">เริ่มใช้ได้ตั้งแต่วันที่: ${new Date(dataVoucherSendEmail.startDate).toLocaleDateString("en-GB")}</h2>
                </div>
            
                <div style="text-align: center; padding: 2px; margin: 10px;">
                    <h2 style="font-size: 14px; margin: 0;">วันหมดอายุ: ${new Date(dataVoucherSendEmail.endDate).toLocaleDateString("en-GB")}</h2>
                </div>
    
                <div style="text-align: center; padding: 2px; margin: 10px;">
                    <small style="margin: 0; font-size: 12px;">รายละเอียด: ${dataVoucherSendEmail.detailVoucher}</small>
                </div>
            </div>
        </div>
    </div>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}

orderService.getVoucherByStoreId = (storeId) => {
    return prisma.evoucher.findMany({
        where:{storeId, statusVoucher: true}
    })
}

orderService.getorderByStoreId = (numberVoucher) => {
    return prisma.orderVoucher.findMany({
        where:{voucherId:numberVoucher}
    })
}

orderService.getDataOrderById = (orderId) => {
    return prisma.orderVoucher.findUnique({
        where:{id:orderId},
        include: {
            evoucher: true
        }
    })
}

orderService.updateStatusVoucher = (orderId) => {
    return prisma.orderVoucher.update({
        where: {id:orderId.id},
        data: {statusUseVoucher:true,
            branchId: orderId.branchId
        }
    })
}

module.exports = orderService