import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

class MockUserRepo {
  async findOne({ id }: { id: string }) {
    if (id === '0') {
      return null;
    } else {
      const user: User = new User();
      user.id = id;
      return user;
    }
  }
}

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepo,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('findOneById', () => {
    it('should return one user who has id in input param', async () => {
      const userOptions = { id: '1' };
      const result = await service.findOne(userOptions);
      expect(result.id).toBe(userOptions.id);
    });

    it('should return NotFoundException when input id is 0', async () => {
      const userOptions = { id: '0' };
      try {
        const result = await service.findOne(userOptions);
        expect(result.id).toBe(userOptions.id);
      } catch (error) {
        expect(error.status).toBe(404);
      }
    });
  });
});
