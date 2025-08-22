const faker = require('faker');

const generate = (schema = {}) => {
  const obj = {};
  Object.keys(schema).forEach(key => {
    const type = schema[key];
    if (typeof type === 'object') {
      obj[key] = generate(type);
    } else {
      switch (type) {
        case 'string':
          obj[key] = faker.lorem.word();
          break;
        case 'number':
          obj[key] = faker.datatype.number();
          break;
        case 'boolean':
          obj[key] = faker.datatype.boolean();
          break;
        case 'uuid':
          obj[key] = faker.datatype.uuid();
          break;
        case 'email':
          obj[key] = faker.internet.email();
          break;
        default:
          obj[key] = null;
      }
    }
  });
  return obj;
};

module.exports = generate;
