export const timeZone = 'America/Los_Angeles';

export const todayInCorrectTimeZone = (new Date()).toLocaleDateString('se-sv', {timeZone: timeZone});

export const toFormattedDate = date => {
  if (date instanceof Date) {
    return date.toLocaleDateString('se-sv');
  } else if (typeof date === 'string') {
    const pattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}/;
    if (pattern.test(date)) {
      return date;
    }
    try {
      const ddate = new Date(date);
      return toFormattedDate(ddate);;
    } catch (err) {
      console.error(err);
    }
  }
};