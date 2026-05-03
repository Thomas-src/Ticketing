type PocketBaseFieldError = {
    code: string;
    message: string;
};

type PocketBaseValidationData = {
    [key: string]: PocketBaseFieldError;
};

type PocketBaseErrorResponse = {
    status: number;
    message: string;
    data: PocketBaseValidationData;
};

export type PocketBaseClientError = {
    response?: PocketBaseErrorResponse;
};