const bcrypt = require('bcrypt');

export const HashingText = (text: string) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(text, salt);
  return hash;
};
export const HashingCompare = (text: string, hashing: string) => {
  return bcrypt.compareSync(text, hashing); // true
};
