/* eslint-disable no-console */
import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { UserRole } from '@/enums';
import { hashPassword } from '@/services/AuthService';
import UserRepository from '@/repositories/UserRepository';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    console.info('\nSearching for existing users');
    const userRepository = connection.getCustomRepository(UserRepository);
    const adminExists = await userRepository.findUserByEmail('admin@luftcare.com.br') !== undefined;
    const patientExists = await userRepository.findUserByEmail('paciente@luftcare.com.br') !== undefined;

    if (adminExists) console.info('Default admin already exists');
    if (patientExists) console.info('Default patient already exists');

    const shouldCreateAdmin = !adminExists;
    const shouldCreatePatient = !patientExists;

    const admin = {
      email: 'admin@luftcare.com.br',
      name: 'Administrador',
      role: UserRole.ADMIN,
      phoneNumber: '(99) 99999-9999',
      passwordHash: await hashPassword('luftcaresecret'),
    };

    const patient = {
      email: 'paciente@luftcare.com.br',
      name: 'Paciente',
      role: UserRole.PATIENT,
      phoneNumber: '(99) 99999-9999',
      passwordHash: await hashPassword('luftcaresecret'),
    };

    // i know these could be concurrent, it's just easier this way
    if (shouldCreateAdmin) await userRepository.save(admin);
    if (shouldCreatePatient) await userRepository.save(patient);
  }
}
