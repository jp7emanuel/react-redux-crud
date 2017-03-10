import getFields from '../../utils/form-helper';

function generateData(id, description, placeholder, value, type, options = null) {
  let data = {
    id: id,
    description: description,
    placeholder: placeholder,
    value: value,
    type: type
  }

  if (options) {
    data.options = options;
  }

  return data;
}

function getInputs() {
  return [
    {
      data: generateData("name", "Name", '', '', "text")
    },
    {
      data: generateData("address", "Location Address", '', '', "text"),
      rules: [
        {
          type: "isAlphanumeric",
          params: null
        }
      ]
    },
    {
      data: generateData("place", "Place Reference", '', '', "text"),
      rules: [
        {
          type: "isAlphanumeric",
          params: null
        }
      ]
    },
    {
      data: generateData("telephone", "Telephone", '', '', "text"),
      rules: [
        {
          type: "isNumeric",
          params: null
        }
      ]
    },
    {
      data: generateData("description", "Description", '', '', "text")
    }
  ];
}


function getSchemaData(inputs) {
  return {
    "classes" : {
      "input" : "form-control",
      "select" : "form-control",
      "question" : "form-group",
      "radioListItem" : "radio",
      "radioList" : "clean-list",
      "checkboxInput" : "checkbox",
      "checkboxListItem" : "checkbox",
      "checkboxList" : "clean-list",
      "controlButton" : "btn btn-primary pull-right",
      "backButton" : "btn btn-default pull-left",
      "errorMessage" : "alert alert-danger",
      "questionPostText" : "push-top",
      "buttonBar" : "button-bar"
    },
    "formPanels" : [
      {
        "index" : 1,
        "panelId" : "form-stores"
      }
    ],
    "questionPanels" : [
      {
        "panelId" : "form-stores",
        "panelHeader" : "Cadastro de Stores",
        "action" : {
          "default" : {
            "action" : "SUBMIT"
          }
        },
        "button" : {
          "text" : "Submit"
        },
        "questionSets" : [{
          "index" : 1,
          "questionSetId" : "save-store"
        }]
      }
    ],
    "questionSets" : [
      {
        "questionSetId" : "save-store",
        "questions" : getFields(inputs)
      }
    ]
  }
}

export default (storeTypes) => {
  let inputs = getInputs();
  let options = storeTypes.map(item => {
    return {
      text: item.name,
      value: item._id
    }
  });
  let storeTypesInput = {
    data: generateData('type', 'Type', '', null, 'select', options)
  };

  inputs.push(storeTypesInput);
  let schemaData = getSchemaData(inputs);

  return schemaData;
}
