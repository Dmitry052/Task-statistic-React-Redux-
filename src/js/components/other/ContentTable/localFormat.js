const lang = {
  set: (langUser, num, prescision) => {
    switch (langUser) {
      case 'ru':
        return num.toLocaleString('ru-RU', {
          maximumFractionDigits: prescision
        });
      case 'de':
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
