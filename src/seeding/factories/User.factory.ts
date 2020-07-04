import Faker from 'faker';
import User from '@/entities/User';
import { define } from 'typeorm-seeding';


define(User, (faker: typeof Faker) => {
  const user = User.create({
    email: faker.internet.email(),
    name: faker.name.firstName(),
    passwordHash: 'secret',
    phoneNumber: faker.phone.phoneNumber(),
  });
  return user;
});
