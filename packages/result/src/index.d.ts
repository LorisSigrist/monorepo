type TypeMap = {
	[key: string]: any;
};

type Entries<T extends TypeMap> = {
	[K in keyof T]: [K, T[K]];
}[Extract<keyof T, string>];

export type OkResult<OkVal> = {
	ok: true;
	value: OkVal;
};

type BadResultFromEntry<E extends Entries<any>> = E extends [infer K, infer V]
	? BadResult<Extract<K, string>, V>
	: never;

export type BadResult<ErrorKey extends string, ErrorValue> = {
	ok: false;
	error: ErrorKey;
	value: ErrorValue;
};

/**
 * Represents a result of an operation that can either be successful or failed.
 * If successful, it contains the value of the operation.
 * If failed, it contains the error key and the value of the operation.
 */
export type Result<OkVal, ErrorMap extends TypeMap> =
	| OkResult<OkVal>
	| BadResultFromEntry<Entries<ErrorMap>>;

export declare const Result: {
	ok<V>(value: V): OkResult<V>;
	bad<E extends string, V_1>(error: E, value: V_1): BadResult<E, V_1>;
};
