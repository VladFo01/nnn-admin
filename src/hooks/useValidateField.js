import { useState } from 'react';

import { GET_REGEXP_BY_FIELD_TYPE, GET_MAX_LENGTH_BY_FIELD_TYPE } from '../constants';

const useValidatedField = (initialValue, fieldType, isRequired = false) => {
  const [fieldValue, setFieldValue] = useState(initialValue);

  const [validationError, setValidationError] = useState(null);

  const handleSetFieldValue = e => {
    if (e?.target) setFieldValue(e.target.value);
    else setFieldValue(e);
  };

  const validateField = () => {
    const regexp = GET_REGEXP_BY_FIELD_TYPE(fieldType, isRequired);

    const isFieldFormatValid = regexp ? regexp.test(fieldValue?.trim() || '') : true;

    if (!isFieldFormatValid) {
      setValidationError(true);
    } else setValidationError(false);

    return isFieldFormatValid;
  };

  const maxFieldLength = GET_MAX_LENGTH_BY_FIELD_TYPE(fieldType);

  return [maxFieldLength, fieldValue, handleSetFieldValue, validationError, validateField];
};

export default useValidatedField;
