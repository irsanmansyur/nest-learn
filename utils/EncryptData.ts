const CryptoT = require('crypto');
var path = require('path');
var fs = require('fs');

/**
 *
 * @param toEncrypt string = String Yang ingin di encrypt
 * @param relativeOrAbsolutePathToPublicKey string = Path ke file public key
 * @returns
 */
const encryptStringWithRsaPublicKey = function (
  toEncrypt,
  relativeOrAbsolutePathToPublicKey: string = './key/pkcs8_public.pem',
) {
  var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
  var publicKey = fs.readFileSync(absolutePath, 'utf8');
  var buffer = Buffer.from(toEncrypt);
  var encrypted = CryptoT.publicEncrypt(publicKey, buffer);
  return encrypted.toString('base64');
};

/**
 *
 * @param toDecrypt string = String Yang ingin di decrypt
 * @param relativeOrAbsolutePathtoPrivateKey string = Path ke file private key
 * @returns
 */
const decryptStringWithRsaPrivateKey = function (
  toDecrypt,
  relativeOrAbsolutePathtoPrivateKey: string = './key/pkcs8_private.key',
) {
  var absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
  var privateKey = fs.readFileSync(absolutePath, 'utf8');
  var buffer = Buffer.from(toDecrypt, 'base64');
  var decrypted = CryptoT.privateDecrypt(privateKey, buffer);
  return decrypted.toString('utf8');
};

module.exports = {
  encryptStringWithRsaPublicKey: encryptStringWithRsaPublicKey,
  decryptStringWithRsaPrivateKey: decryptStringWithRsaPrivateKey,
};
