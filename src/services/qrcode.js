const QRCode = require('qrcode')

const url = req.query.url; // เอาค่า URL จาก query parameter ที่ชื่อว่า url
        if (!url) {
            return res.status(400).json({ message: 'Missing URL parameter' });
        }

        // สร้าง QR Code
        const qrCode = await qr.toDataURL(url);

        // ส่งรูปภาพ QR Code กลับเป็น response
        res.send(`<img src="${qrCode}" alt="QR Code"/>`);