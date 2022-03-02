export type StatusError = {
    message: string;
    status: number;
};

export type FetchError = {
    error: StatusError;
};

export type FormObject = {
    name: string;
    model: string;
    brand: string;
    email: string;
    text: string;
    date?: Date;
}

export type FormErr = {
    name: boolean;
    model: boolean;
    brand: boolean;
    email: boolean;
    text: boolean;

}

export type QuestionObject = {
    name: string;
    model: string;
    brand: string;
    text: string;
    date?: Date;
}