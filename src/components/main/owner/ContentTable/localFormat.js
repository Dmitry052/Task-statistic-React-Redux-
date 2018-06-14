const lang = {
  set: (langUser: string, num: number, prescision: number): string => {
    switch (langUser) {
      case 'ru-RU':
        return num.toLocaleString('ru-RU', {
          maximumFractionDigits: prescision
        });
      case 'de-DE':
        return num.toLocaleString('de-DE', {
          maximumFractionDigits: prescision
        });
      default:
        return num.toLocaleString('en-EN', {
          maximumFractionDigits: prescision
        });
    }
  }
};

module.exports = lang;
