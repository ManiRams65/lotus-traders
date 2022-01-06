export const baseUrl = process.env.BASE_URL;
export const freeMiles = process.env.FREE_MILES;
export const chargePerMile = process.env.CHARGE_PER_MILES;

export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

export const app_url = process.env.NODE_ENV == 'development' ? 'http://localhost:3000/' : 'https://lotusdecoreandrental.com/'