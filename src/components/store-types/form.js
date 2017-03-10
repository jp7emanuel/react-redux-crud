export default {
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
      "panelId" : "form-store-types"
    }
  ],
  "questionPanels" : [
    {
      "panelId" : "form-store-types",
      "panelHeader" : "Cadastro de Store-Types",
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
        "questionSetId" : "save-store-type"
      }]
    }
  ],
  "questionSets" : [
    {
      "questionSetId" : "save-store-type",
      "questions" : [
        {
          "questionId": "name",
          "question": "Name:",
          "input": {
            "type": "textInput",
            "placeholder": "",
            "default": ""
          }
        }
      ]
    }
  ]
}
