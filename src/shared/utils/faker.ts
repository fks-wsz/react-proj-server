import { zh_CN, en, base, Faker } from '@faker-js/faker';

const faker = new Faker({
  locale: [zh_CN, en, base],
});

export default faker;
