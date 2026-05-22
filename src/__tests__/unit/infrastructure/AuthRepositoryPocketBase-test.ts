import AuthRepositoryPocketBase from '../../../infrastructure/repository/AuthRepositoryPocketBase';
import User from '../../../domain/core/User';

// Test relatif a l'uc : Connexion
// Utilisation de l'ia dans l'écriture complète

const mockAuthWithPassword = jest.fn();
const mockClear = jest.fn();

jest.mock('../../../infrastructure/pocketbaseClient', () => ({
    pb: {
        collection: jest.fn(() => ({ authWithPassword: mockAuthWithPassword })),
        authStore: {
            clear: mockClear,
            record: null,
            isValid: false,
        },
    },
}));

jest.mock('../../../infrastructure/utils', () => ({
    sanitize: jest.fn((input) => input),
}));


const makeRecord = (overrides = {}) => ({
    name: 'Jean',
    surname: 'Dupont',
    email: 'jean@test.com',
    role: "User",
    ...overrides,
});


describe('AuthRepositoryPocketBase - login', () => {
    let repo: AuthRepositoryPocketBase;

    beforeEach(() => {
        repo = new AuthRepositoryPocketBase();
        jest.clearAllMocks();
    });

    it('retourne un User correctement construit après authentification', async () => {
        mockAuthWithPassword.mockResolvedValueOnce({ record: makeRecord() });

        const user = await repo.login('jean@test.com', 'motdepasse');

        expect(user).toBeInstanceOf(User);
        expect(user.name).toBe('Jean');
        expect(user.surname).toBe('Dupont');
        expect(user.email).toBe('jean@test.com');
        expect(user.role).toBe("User");
    });

    it('appelle authWithPassword avec les bons arguments', async () => {
        mockAuthWithPassword.mockResolvedValueOnce({ record: makeRecord() });

        await repo.login('jean@test.com', 'motdepasse');

        expect(mockAuthWithPassword).toHaveBeenCalledWith('jean@test.com', 'motdepasse');
    });

    it('passe les données dans sanitize avant l\'appel PocketBase', async () => {
        const { sanitize } = require('../../../infrastructure/utils');
        mockAuthWithPassword.mockResolvedValueOnce({ record: makeRecord() });

        await repo.login('jean@test.com', 'motdepasse');

        expect(sanitize).toHaveBeenCalledWith({ email: 'jean@test.com', password: 'motdepasse' });
    });

    it('lève "Email ou mot de passe invalide" si PocketBase échoue', async () => {
        mockAuthWithPassword.mockRejectedValueOnce(new Error('Unauthorized'));

        await expect(repo.login('jean@test.com', 'mauvais'))
            .rejects.toThrow('Email ou mot de passe invalide');
    });

    it('lève la même erreur peu importe l\'erreur PocketBase originale', async () => {
        mockAuthWithPassword.mockRejectedValueOnce({ code: 400, message: 'Bad request' });

        await expect(repo.login('jean@test.com', 'mauvais'))
            .rejects.toThrow('Email ou mot de passe invalide');
    });

    it('mappe correctement un rôle Admin', async () => {
        mockAuthWithPassword.mockResolvedValueOnce({ record: makeRecord({ role: "Admin" }) });

        const user = await repo.login('admin@test.com', 'motdepasse');

        expect(user.role).toBe("Admin");
    });
});