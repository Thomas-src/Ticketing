import LoginUser from '../../../application/usecase/LoginUser';
import User from '../../../domain/core/User';
import { Role } from '../../../domain/core/Role';

// Test relatif a l'uc : Connexion
// Utilisation de l'ia dans l'écriture de ceux-ci

const user = new User(
    'Jean',
    'Dupont',
    'jean@test.com',
    "user"
);
const repository = {
    login: jest.fn(),
};

const loginUser = new LoginUser(repository as any);

describe('LoginUser', () => {
    beforeEach(() => jest.clearAllMocks());

    it('retourne un User si le repo marche', async () => {
        repository.login.mockResolvedValueOnce(user);
        const result = await loginUser.execute('johnDoe@test.com', 'johnDoe1234$');
        expect(result).toBe(user);
    });

    it('verification appel .login', async () => {
        repository.login.mockResolvedValueOnce(user);
        await loginUser.execute('johnDoe@test.com', 'johnDoe1234$');
        expect(repository.login).toHaveBeenCalledWith('johnDoe@test.com', 'johnDoe1234$');
        expect(repository.login).toHaveBeenCalledTimes(1);
    });

    it('renvoi derreur si le repo échoue', async () => {
        repository.login.mockRejectedValueOnce(new Error('Email ou mot de passe invalide'));
        await expect(loginUser.execute('johnDoe@test.com', 'INVALIDE'))
            .rejects.toThrow('Email ou mot de passe invalide');
    });
});