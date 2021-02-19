export class ResolutionError extends Error {
    public readonly cause?: ResolutionError;

    constructor(message: string, cause?: ResolutionError) {
        super(message);
        this.cause = cause;
    }
}
