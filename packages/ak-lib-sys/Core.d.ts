export declare const ErrorCode: {
    "-1": string;
    "0": string;
    "40400": string;
    "43001": string;
    "43002": string;
    "44000": string;
};
export declare const ErrorDesc: {
    SYS_ERR: string;
    NO_ERR: string;
    NOT_FOUND: string;
    REQ_MUST_POST: string;
    REQ_MUST_HTTPS: string;
    PARAMS_INVALID: string;
};
export declare const requestHook: (req: any, callback: any) => void;
export declare const json: (obj: any, replacer?: (key: string, value: any) => any, space?: string | number) => string;
export declare const parseJson: (str: any) => any;
export declare const alert: (msg: any) => void;
export declare const notify: (mesg: any) => void;
export declare const alertObj: (obj: any) => void;
export declare const pureObj: (obj: any) => any;
export declare const getUniId: () => string;
export declare const cast: <T>(obj: any) => T;
export interface ILog {
    info?: string;
    sign?: string;
}
export declare const log: (a: any, { sign, info }?: {
    sign: string;
    info: string;
}) => void;
export declare let Options: {
    IsDev: boolean;
    Point: {};
};
export declare function applyMixins(derivedCtor: any, baseCtors: any[]): void;
