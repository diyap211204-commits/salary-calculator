export const isValidEmail = (v) => /^\S+@\S+\.\S+$/.test(v);
export const isValidPhone = (v) => /^\d{10}$/.test(v);
