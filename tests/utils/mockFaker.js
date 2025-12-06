const crypto = require(`crypto`);

const randomString = (length = 10) => crypto.randomBytes(length).toString(`hex`).substring(0, length);

const randomNumber = (min = 0, max = 1000) => Math.floor(Math.random() * (max - min + 1)) + min;

const mockFaker = {
  string: {
   uuid: () =>
     ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => 
        ((crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)),
    alphanumeric: (len = 10) =>
      randomString(len)
        .replace(/[^a-zA-Z0-9]/g, `a`)
        .substring(0, len),
    sample: () => randomString(8),
  },

  number: {
    int: (opts = {}) => {
      const min = opts.min ?? 0;
      const max = opts.max ?? 9999;
      return randomNumber(min, max);
    },
  },

  internet: {
    email: () => `${randomString(5)}@example.com`,
    userName: () => randomString(8),
    url: () => `https://www.${randomString(6)}.com`,
  },

  person: {
    firstName: () => ['John', 'Amit', 'Yogi', 'Ravi', 'Julia'][randomNumber(0, 4)],
    lastName: () => ['Singh', 'Kumar', 'Shah', 'Smith', 'Brown'][randomNumber(0, 4)],
    fullName() {
      return `${this.firstName()} ${this.lastName()}`;
    },
  },

  phone: {
    number: () => `+91${randomNumber(6000000000, 9999999999)}`,
  },

  location: {
    city: () => ['Delhi', 'Mumbai', 'Bangalore', 'Pune'][randomNumber(0, 3)],
    country: () => ['India', 'USA', 'UK', 'Canada'][randomNumber(0, 3)],
  },
};

module.exports = mockFaker;
