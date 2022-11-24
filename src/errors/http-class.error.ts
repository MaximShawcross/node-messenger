export default class HTTPError extends Error {
	private _statusCode: number;
	private _message: string;
	private _context?: string;

	public get statusCode(): number {
		return this._statusCode;
	}

	public get context(): string | void {
		return this._context;
	}

	public get message(): string {
		return this._message;
	}

	constructor(statusCode: number, message: string, context?: string) {
		super(message);

		this._statusCode = statusCode;
		this._message = message;
		this._context = context;
	}
}
