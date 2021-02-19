export class ValidationError extends Error {
    public readonly cause?: ValidationError;

    constructor(message: string, cause?: ValidationError) {
        super(message);
        this.cause = cause;
    }
}
