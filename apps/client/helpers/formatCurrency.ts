type Args = {
  language?: string;
  currency?: string;
  amount?: number;
};

const formatCurrency = ({ currency, language, amount = 0 }: Args) => {
  return new Intl.NumberFormat(language, { style: 'currency', currency: currency }).format(amount);
};

export default formatCurrency;
