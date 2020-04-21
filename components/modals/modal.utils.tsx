export const createhasErrors = (formInstance) =>
    (fieldName: string) =>
        formInstance.touched[fieldName] && formInstance.errors[fieldName];
