import * as utils from '../utils';

describe('Apod', () => {
  
  describe('Utils', () => {

    describe('isInValidDateFormat', () => {

      it('date strings in the correct format returns true', () => {
        const test = utils.isValidDateFormat('2010-10-10');
        expect(test).toBe(true);
      });

      it('date strings in an incorrect format returns false', () => {
        const test = utils.isValidDateFormat('2010/10/10');
        expect(test).toBe(false);
      });

      it('non strings return false', () => {
        const number = utils.isValidDateFormat(2010);
        expect(number).toBe(false);
        const date = utils.isValidDateFormat(new Date());
        expect(date).toBe(false);
      });

    });

    describe('isValidAposDate', () => {

      it('dates over max date are invalid', () => {
        const max = utils.maxSupportedDate;
        const tomorrow = new Date();
        tomorrow.setDate(max.getDate() + 1);
        const test = utils.isValidAposDate(tomorrow);
        expect(test).toBe(false);
      });

      it('dates lower than minimum date are invalid', () => {
        const lowDate = new Date(1991, 11, 12);
        const test = utils.isValidAposDate(lowDate);
        expect(test).toBe(false);
      });

      it('dates within the supported period returns true', () => {
        const validDate = new Date(2019, 9, 31);
        const test = utils.isValidAposDate(validDate);
        expect(test).toBe(true);
      });

      it('invalid dates returns false', () => {
        const invalid = new Date('2010-100-1');
        const test = utils.isValidAposDate(invalid);
        expect(test).toBe(false);
      });

    });

    describe('isValidDate', () => {

      it('valid dates returns true', () => {
        const test = utils.isValidDate(new Date());
        expect(test).toBe(true);
      });

      it('invalid dates returns false', () => {
        const invalid = new Date('2010-100-1');
        const test = utils.isValidDate(invalid);
        expect(test).toBe(false);
      });

    });

    describe('toFormattedDate', () => {

      it('converts Date objects to the correct string format', () => {
        const valentines = utils.toFormattedDate(new Date(2019, 1, 14));
        expect(valentines).toBe('2019-02-14');
      });

      it('convers dates in string format to the correct format', () => {
        const valentines = utils.toFormattedDate('2019/2/14');
        expect(valentines).toBe('2019-02-14');

        const halloween = utils.toFormattedDate('2019-10-31');
        expect(halloween).toBe('2019-10-31');
      });

      it('returns an empty string and loggs an error upon failure', () => {
        console.error = jest.fn();
        const invalid = utils.toFormattedDate('2010-100-02');
        expect(invalid).toBe('');
        expect(console.error).toHaveBeenCalledTimes(1);
      });

    });
    
  });

});
