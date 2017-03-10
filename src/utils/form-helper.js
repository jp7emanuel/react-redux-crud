const getValidations = (rules) => {
  if (!rules || !rules.length) {
    return null;
  }

  return rules.map(rule => {
    let validation = {};
    if (rule.type) {
      validation.type = rule.type;
    }
    if (rule.params) {
      validation.params = rule.params;
    }

    return validation;
  });
}

export default (inputValues) => {
  let inputs = inputValues.map(input => {
    const result = {
      questionId: input.data.id,
      question: input.data.description + ":",
      input: {
        type: `${input.data.type}Input`,
        placeholder: input.data.placeholder,
        default: input.data.value
      },
    };

    if (input.rules) {
      result.validations = getValidations(input.rules);
      result.validateOn = "blur";
    }

    if (input.data.options) {
      result.input.options = input.data.options;
      result.input.default = input.data.options[0].value;
    }

    return result;
  });

  return inputs;
}

