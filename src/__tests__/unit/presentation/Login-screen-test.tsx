import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import Login from '../../../presentation/screen/account/Login';

// COMMANDE POUR DEMARRER LES TESTS : npm test
// "jest --watchAll" dans package.json si on veut une vue detaillée
// Comporte les tests unitaire sur l'us : Connexion
// Je me suis aider de l'IA claude (claude sonnet 4.6) pour mettre en place Jest, setUp les mocks et correction / écriture des tests

const mockNavigate = jest.fn();
const mockReset = jest.fn();
const mockGetParent = jest.fn(() => ({ navigate: mockNavigate }));
const mockNavigation = {
    navigate: mockNavigate,
    reset: mockReset,
    getParent: mockGetParent,
};

const mockExecute = jest.fn();
jest.mock('../../../presentation/hooks/ioc.react', () => ({
    useInjection: () => ({ execute: mockExecute }),
}));

jest.mock('lucide-react-native', () => ({
    CircleUserIcon: () => null,
}));

const renderLogin = () =>
    render(<Login navigation={mockNavigation as any} route={{} as any} />);

// Describe regroupe un ensemble de tests du même thème
describe('vue', () => {
    // Représente un test
    test('titre Connexion', () => {
        const { getByText } = renderLogin();
        expect(getByText('Connexion')).toBeTruthy();
    });

    test('champs email et mot de passe', () => {
        const { getByTestId } = renderLogin();
        expect(getByTestId('email-input')).toBeTruthy();
        expect(getByTestId('pwd-input')).toBeTruthy();
    });

    test('bouton ENVOYER', () => {
        const { getByText } = renderLogin();
        expect(getByText('ENVOYER')).toBeTruthy();
    });

    test('lien Inscription', () => {
        const { getByText } = renderLogin();
        expect(getByText('Inscription')).toBeTruthy();
    });
});

describe('validation formulaire', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('affiche erreur si email vide', async () => {
        const { getByText } = renderLogin();
        fireEvent.press(getByText('ENVOYER'));
        await waitFor(() => {
            expect(getByText('Email requis')).toBeTruthy();
        });
    });

    test('affiche une erreur si email invalide', async () => {
        const { getByTestId, getByText } = renderLogin();
        fireEvent.changeText(getByTestId('email-input'), 'pasunemail');
        fireEvent.press(getByText('ENVOYER'));
        await waitFor(() => {
            expect(getByText('Email invalide')).toBeTruthy();
        });
    });

    test('affiche une erreur si mot de passe vide', async () => {
        const { getByTestId, getByText } = renderLogin();
        fireEvent.changeText(getByTestId('email-input'), 'test@test.com');
        fireEvent.press(getByText('ENVOYER'));
        await waitFor(() => {
            expect(getByText('Mot de passe requis')).toBeTruthy();
        });
    });

    test('affiche une erreur si mot de passe trop court', async () => {
        const { getByTestId, getByText } = renderLogin();
        fireEvent.changeText(getByTestId('email-input'), 'test@test.com');
        fireEvent.changeText(getByTestId('pwd-input'), '1234');
        fireEvent.press(getByText('ENVOYER'));
        await waitFor(() => {
            expect(getByText('Minimum 8 caractères')).toBeTruthy();
        });
    });

    test('efface l erreur email quand l utilisateur retape', async () => {
        const { getByTestId, getByText, queryByText } = renderLogin();
        fireEvent.press(getByText('ENVOYER'));
        await waitFor(() => expect(getByText('Email requis')).toBeTruthy());
        fireEvent.changeText(getByTestId('email-input'), 'a');
        await waitFor(() => {
            expect(queryByText('Email requis')).toBeNull();
        });
    });

    test('efface l erreur mot de passe quand l utilisateur retape', async () => {
        const { getByTestId, getByText, queryByText } = renderLogin();
        fireEvent.changeText(getByTestId('email-input'), 'test@test.com');
        fireEvent.press(getByText('ENVOYER'));
        await waitFor(() => expect(getByText('Mot de passe requis')).toBeTruthy());
        fireEvent.changeText(getByTestId('pwd-input'), 'a');
        await waitFor(() => {
            expect(queryByText('Mot de passe requis')).toBeNull();
        });
    });
});

describe('envoi', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('appelle loginUser.execute avec les bons identifiants', async () => {
        mockExecute.mockResolvedValueOnce(undefined);
        const { getByTestId, getByText } = renderLogin();
        fireEvent.changeText(getByTestId('email-input'), 'test@test.com');
        fireEvent.changeText(getByTestId('pwd-input'), 'motdepasse123');
        fireEvent.press(getByText('ENVOYER'));
        await waitFor(() => {
            expect(mockExecute).toHaveBeenCalledWith('test@test.com', 'motdepasse123');
        });
    });

    test('ne soumet pas si le formulaire est invalide', async () => {
        const { getByText } = renderLogin();
        fireEvent.press(getByText('ENVOYER'));
        await waitFor(() => {
            expect(mockExecute).not.toHaveBeenCalled();
        });
    });

    test('navigue vers Accueil après connexion réussie', async () => {
        mockExecute.mockResolvedValueOnce(undefined);
        const { getByTestId, getByText } = renderLogin();
        fireEvent.changeText(getByTestId('email-input'), 'test@test.com');
        fireEvent.changeText(getByTestId('pwd-input'), 'motdepasse123');
        fireEvent.press(getByText('ENVOYER'));
        await waitFor(() => {
            expect(mockReset).toHaveBeenCalledWith({ index: 0, routes: [{ name: 'Settings' }] });
            expect(mockNavigate).toHaveBeenCalledWith('Accueil');
        });
    });

    test('affiche le message d erreur renvoyé par le serveur', async () => {
        mockExecute.mockRejectedValueOnce(new Error('Identifiants incorrects'));
        const { getByTestId, getByText } = renderLogin();
        fireEvent.changeText(getByTestId('email-input'), 'test@test.com');
        fireEvent.changeText(getByTestId('pwd-input'), 'motdepasse123');
        fireEvent.press(getByText('ENVOYER'));
        await waitFor(() => {
            expect(getByText('Identifiants incorrects')).toBeTruthy();
        });
    });

    test('affiche un message générique si l erreur n est pas une instance d Error', async () => {
        mockExecute.mockRejectedValueOnce('erreur inattendue');
        const { getByTestId, getByText } = renderLogin();
        fireEvent.changeText(getByTestId('email-input'), 'test@test.com');
        fireEvent.changeText(getByTestId('pwd-input'), 'motdepasse123');
        fireEvent.press(getByText('ENVOYER'));
        await waitFor(() => {
            expect(getByText('Une erreur est survenue')).toBeTruthy();
        });
    });
});

describe('navigation', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('navigue vers Signup au clic sur Inscription', () => {
        const { getByText } = renderLogin();
        fireEvent.press(getByText('Inscription'));
        expect(mockNavigate).toHaveBeenCalledWith('Signup');
    });
});

