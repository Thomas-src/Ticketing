export default class CreditCard {
    #cvc: number;
    #iban: string;
    #expirationMonth: number;
    #expirationYear: number;

    constructor(iban: string, cvc: number, expirationMonth: number, expirationYear: number) {
        if (!CreditCard.isValidIban(iban)) throw new Error("IBAN invalide");
        if (!CreditCard.isValidCvc(cvc)) throw new Error("CVC invalide");
        if (!CreditCard.isValidExpiration(expirationMonth, expirationYear)) throw new Error("Carte expirée ou date invalide");

        this.#iban = iban;
        this.#cvc = cvc;
        this.#expirationMonth = expirationMonth;
        this.#expirationYear = expirationYear;
    }

    private static isValidIban(iban: string): boolean {
        const cleaned = iban.replace(/\s/g, '').toUpperCase();
        return /^[A-Z]{2}[0-9A-Z]{2,32}$/.test(cleaned);
    }

    private static isValidCvc(cvc: number): boolean {
        return Number.isInteger(cvc) && cvc >= 100 && cvc <= 9999;
    }

    private static isValidExpiration(month: number, year: number): boolean {
        if (month < 1 || month > 12) return false;

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;

        if (year < currentYear) {
            return false;
        }
        if (year === currentYear && month < currentMonth) {
            return false;
        }

        return true;
    }

    get isValid(): boolean {
        return CreditCard.isValidExpiration(this.#expirationMonth, this.#expirationYear);
    }

}