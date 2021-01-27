/* eslint-disable max-len */

// email address validation
export const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
  return re.test(String(email));
};

// Colombian email address validation
export const endsWithCo = (email: string) => {
  const re = /\.co$/gi;
  return re.test(String(email));
};

// Get provider from email address
export const getProvider = (email: string) => {
  const re = /@\S+\./gi;
  const provider = email.match(re)?.toString().toLowerCase();
  if (provider) {
    return provider
      .replace(provider.charAt(provider.length - 1), '')
      .replace(provider.charAt(0), '');
  }
  return 'invalid';
};
