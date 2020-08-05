import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import User from '@/entities/User';
import { UserRole } from '@/enums';
import { hashPassword } from '@/services/AuthService';

export default class CreateAdminUser implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection.getRepository(User).save(
      {
        email: 'admin@luftcare.com.br',
        name: 'admin',
        role: UserRole.ADMIN,
        phoneNumber: '(99) 99999-9999',
        passwordHash: await hashPassword('secret'),
      },
    );
  }
}
