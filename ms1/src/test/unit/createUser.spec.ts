import 'reflect-metadata';
import CreateUserUseCase from "./createUserUseCase";
import { IUserRepository } from '../../domain/repos/IUserRepo';
import { VerifyEmailUseCase } from '../verifyEmail';

// Mock do repositório de usuários para simular comportamento
const mockUserRepository: IUserRepository = {
  async exists(email) {
    return false; // Simula que o e-mail não existe no banco de dados
  },
  async create(user) {
    // Simula a criação de usuário
    return Promise.resolve(null);
  },
  async findById(id: string) {
    return Promise.resolve(null);
  },
  async save(user) {
    // Implementação básica para save
    return Promise.resolve();
  },
  async findUserByEmail(email) {
    // Implementação básica para findUserByEmail
    return Promise.resolve(null);
  },
};

// Mock da instância de SendEmailVerifyUseCase
const mockVerifyEmailUseCase: VerifyEmailUseCase = {
  execute: jest.fn(), // Mock a função execute para evitar realmente enviar e-mails durante os testes
};

describe('CreateUserUseCase', () => {
  it('deve criar um novo usuário com sucesso', async () => {
    const createUserUseCase = new CreateUserUseCase(
      mockUserRepository,
      mockVerifyEmailUseCase
    );

    const createUserDTO = {
      name: 'Teste',
      email: 'teste@example.com',
      password: '123456',
    };

    // Simular comportamento de sucesso do UserRepository.exists
    mockUserRepository.exists = jest.fn().mockResolvedValue(false);

    await expect(createUserUseCase.execute(createUserDTO)).resolves.toBeUndefined();
  });

  it('deve lançar um erro se o e-mail já estiver em uso', async () => {
    const createUserUseCase = new CreateUserUseCase(
      mockUserRepository,
      mockVerifyEmailUseCase
    );

    const createUserDTO = {
      name: 'Teste',
      email: 'teste@example.com',
      password: '123456',
    };

    // Simular comportamento do UserRepository.exists retornando true para indicar que o e-mail já existe
    mockUserRepository.exists = jest.fn().mockResolvedValue(true);

    await expect(createUserUseCase.execute(createUserDTO)).rejects.toThrow(
      `The email ${createUserDTO.email} associated for this account already exists`
    );
  });
});
