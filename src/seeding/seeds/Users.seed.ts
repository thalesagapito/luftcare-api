/* eslint-disable no-console */
import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { UserRole } from '@/enums';
import { hashPassword } from '@/services/AuthService';
import UserRepository from '@/repositories/UserRepository';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const defaultAdminEmail = 'admin@luftcare.com.br';
    const secondAdminEmail = 'lucas@luftcare.com.br';
    const defaultPatientEmail = 'paciente@luftcare.com.br';

    console.info('\n🙍‍♂️ Searching for existing users 🔍');
    const userRepository = connection.getCustomRepository(UserRepository);
    const adminExists = await userRepository.findUserByEmail(defaultAdminEmail) !== undefined;
    const secondAdminExists = await userRepository.findUserByEmail(secondAdminEmail) !== undefined;
    const patientExists = await userRepository.findUserByEmail(defaultPatientEmail) !== undefined;

    if (adminExists) console.info('🙍‍♂️ Default admin already exists 🚫');
    if (secondAdminExists) console.info('🙍‍♂️ Second admin already exists 🚫');
    if (patientExists) console.info('🙍‍♂️ Default patient already exists 🚫');

    const shouldCreateAdmin = !adminExists;
    const shouldCreateSecondAdmin = !secondAdminExists;
    const shouldCreatePatient = !patientExists;

    const admin = {
      email: defaultAdminEmail,
      name: 'Administrador',
      role: UserRole.ADMIN,
      phoneNumber: '(99) 99999-9999',
      passwordHash: await hashPassword('luftcaresecret'),
    };

    const secondAdmin = {
      email: secondAdminEmail,
      name: 'Lucas Moreira',
      role: UserRole.ADMIN,
      phoneNumber: '(99) 99999-9999',
      passwordHash: await hashPassword('luftcaresecret'),
    };

    const patient = {
      email: defaultPatientEmail,
      name: 'Paciente',
      role: UserRole.PATIENT,
      phoneNumber: '(99) 99999-9999',
      passwordHash: await hashPassword('luftcaresecret'),
    };

    // i know these could be concurrent, it's just easier this way
    if (shouldCreateAdmin) await userRepository.save(admin);
    if (shouldCreateSecondAdmin) await userRepository.save(secondAdmin);
    if (shouldCreatePatient) await userRepository.save(patient);
  }
}
