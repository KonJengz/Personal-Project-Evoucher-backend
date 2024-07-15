const bcrypt = require('bcryptjs')

const hashService = {}

hashService.hash = (plainText) => {
    return bcrypt.hash(plainText, 14)
}

hashService.compare = ( plainText, hashValue ) => {
    return bcrypt.compare(plainText, hashValue)
}

module.exports = hashService