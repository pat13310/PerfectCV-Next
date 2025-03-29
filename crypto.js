// Stub pour le module crypto
module.exports = {
  randomBytes: () => Buffer.from(''),
  createHash: () => ({
    update: () => ({
      digest: () => ''
    })
  })
};
