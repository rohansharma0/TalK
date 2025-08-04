export interface ApiResponse<T = any> {
    code: number;
    info: string | null;
    data: T | null;
}

export const successResponse = <T>(
    code: number,
    info: string,
    data: T
): ApiResponse<T> => ({
    code,
    info,
    data,
});

export const errorResponse = (
    code: number,
    info: string
): ApiResponse<null> => ({
    code,
    info,
    data: null,
});
