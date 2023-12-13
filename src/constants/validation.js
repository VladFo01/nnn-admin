const ANY_FIELD = 'any';

const EMAIL_FIELD = 'email';
const NAME_FIELD = 'name';
const USERNAME_FIELD = 'username';
const NUMBER_FIELD = 'numbers';
const URL_FIELD = 'url';
const SHORT_DESCRIPTION_FIELD = 'short-description';
const LONG_DESCRIPTION_FIELD = 'long-description';

const GET_REGEXP_BY_FIELD_TYPE = (type, isRequired) => {
  switch (type) {
    case ANY_FIELD:
    case USERNAME_FIELD:
      return isRequired ? /^.+$/ : /^.*$/;
    case EMAIL_FIELD:
      return isRequired
        ? /^\w+([.+-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        : /^$|\w+([.+-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    case NAME_FIELD:
      return isRequired ? /^[A-Za-z -]+$/ : /^[A-Za-z -]*$/;
    case URL_FIELD:
      return /^(?:(ftp|http|https)?:\/\/)?(?:[\w-]+\.)+([a-z]|[A-Z]|[0-9]){2,6}$/gi;
    case NUMBER_FIELD:
      return /[^0-9.]/g;
    default:
      return null;
  }
};

const GET_MAX_LENGTH_BY_FIELD_TYPE = type => {
  switch (type) {
    case EMAIL_FIELD:
      return 64;
    case NAME_FIELD:
    case USERNAME_FIELD:
      return 20;
    case SHORT_DESCRIPTION_FIELD:
      return 50;
    case LONG_DESCRIPTION_FIELD:
      return 500;
    default:
      return 2000;
  }
};

const DATE_IS_VALID = date => {
  if (date === null) {
    return true;
  }

  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  const dateLocalStr = date.toLocaleString('en-GB', { timeZone: 'UTC' });
  const dateStr = dateLocalStr.slice(0, dateLocalStr.indexOf(','));

  if (dateStr.match(regex) === null) {
    return false;
  }

  const [day, month, year] = dateStr.split('/');

  const isoFormattedStr = `${year}-${month}-${day}`;

  const dateRes = new Date(isoFormattedStr);

  const timestamp = dateRes.getTime();

  if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
    return false;
  }

  return dateRes.toISOString().startsWith(isoFormattedStr);
};

export {
  DATE_IS_VALID,
  GET_REGEXP_BY_FIELD_TYPE,
  GET_MAX_LENGTH_BY_FIELD_TYPE,
  EMAIL_FIELD,
  NAME_FIELD,
  USERNAME_FIELD,
  NUMBER_FIELD,
  URL_FIELD,
  SHORT_DESCRIPTION_FIELD,
  LONG_DESCRIPTION_FIELD,
};
