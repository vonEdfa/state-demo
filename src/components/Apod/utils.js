export const timeZone = 'America/Los_Angeles';
export const regexPattern = /^(([1-2][0-9]{3})-(0[1-9]|[1][0-2])-(0[1-9]|[12][0-9]|3[01]))$/;
export const minSupportedDate = new Date(1995, 5, 16);
export const todayInCorrectTimeZone = (new Date()).toLocaleDateString('se-sv', {timeZone: timeZone});
export const maxSupportedDate = new Date(todayInCorrectTimeZone);

export const isValidDateFormat = date => (date && typeof date === 'string' ? regexPattern.test(date) : false);
export const isValidDate = date => (date instanceof Date && !isNaN(date));

export const isValidAposDate = date => {
  let ddate;
  if (!(date instanceof Date)) {
    ddate = new Date(date);
    if (!isValidDate(ddate)) {
      return false;
    }
  } else {
    ddate = date;
  }

  if (ddate.getTime() >= minSupportedDate.getTime() && ddate.getTime() <= maxSupportedDate.getTime()) {
    return true;
  }

  return false;
};

export const toFormattedDate = date => {
  if (date instanceof Date) {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    return `${y}-${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
  } else if (typeof date === 'string') {
    if (isValidDateFormat(date)) {
      return date;
    }

    let ddate = new Date(date);
    if (!isValidDate(ddate)) {
      console.error(`Failed to format date '${date}'. Reason:`, ddate.toString());
      return ''; 
    }
    
    return toFormattedDate(ddate);;
  }
};
