// private String id;
// private String name;
// private String email;
// private String username = this.email;
// private String msisdn;
// private String appId;
// private long createdon = new Date().getTime();
// private long modifiedon = new Date().getTime();
// private String createdby = "system";
// private String modifiedby = "system";
// const uuidv1 = require('uuid/v1')

var schema = {
  'id': {
    type: String,
    match: /^[a-z0-9]+$/i,
    minlength: 3,
    maxlength: 30,
    required: true,
    index: {
      unique: true
    },
    default: new Date().getTime()
  },
  'name': {
    type: String,
    default: '-'
  },
  'username': {
    type: String,
    match: /^[a-z0-9]+$/i,
    minlength: 3,
    maxlength: 30,
    required: true,
    index: {
      unique: true
    }
  },
  'email': {
    type: String,
    minlength: 2,
    maxlength: 40,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,11})?$/,
    required: true,
    index: {
      unique: true
    }
  },
  'password': {
    type: String,
    required: true
  },
  'createdon': {
    type: Number,
    required: true,
    default: new Date().getTime()
  },
  'modifiedon': {
    type: Number,
    required: true,
    default: new Date().getTime()
  },
  'createdby': {
    type: String,
    default: 'system'
  },
  'modifiedby': {
    type: String,
    default: 'system'
  },
  'first_name': {
    type: String,
    default: ''
  },
  'last_name': {
    type: String,
    default: ''
  },
  'phone_number': {
    type: String,
    default: ''
  },
  'user_roles': {
    type: Array,
    default: []
  },
  // 'role': {
  //   type: Number,
  //   default: 100
  // }, // 1=super admin, 2=admin 3=content team, 4=partner, 100 = user biasa
  'scope': {
    type: Number,
    default: 200
  }, // 1=root, 2=super admin 5=admin 3=content team, 4=partner, 100 = fasilitator, 200 = user biasa
  'status': {
    type: String,
    require: true,
    enum: ['temp', 'active', 'inactive', 'admin', 'locked', 'publish', 'remove', 'delete'],
    default: 'publish'
  } // temp, active, inactive, admin
}

var convertToSchemaForUpdate = (body) => {
  let userModel = schema
  let dataObj = {}
  for (var key in body) {
    const fieldDesc = userModel[key]
    if (fieldDesc) {
      if (fieldDesc.type === Array) dataObj[key] = body[key]
      if (fieldDesc.type === String) dataObj[key] = body[key]
      if (fieldDesc.type === Number) dataObj[key] = parseInt(body[key] || 0)
    }
  }

  //   for (var key in userModel) {
  //     const fieldDesc = userModel[key]
  //     dataObj[key] = fieldDesc['default'] || (fieldDesc['type'] === String ? '' : 0)
  //     if (body[key]) {
  //       if (fieldDesc['type'] === String) {
  //         dataObj[key] = '' + body[key]
  //       }
  //       if (fieldDesc['type'] === Number) {
  //         dataObj[key] = parseInt(body[key])
  //       }
  //     }
  //   }
  return dataObj
}
var convertToSchemaForCreate = (body) => {
  let userModel = schema
  let dataObj = {}
  for (var key in userModel) {
    const fieldDesc = userModel[key]
    dataObj[key] = fieldDesc['default'] || (fieldDesc['type'] === String ? '' : 0)
    if (key === 'id' || key === 'createdon' || key === 'modifiedon') dataObj[key] = new Date().getTime()
    if (body[key]) {
      if (fieldDesc['type'] === String) {
        dataObj[key] = '' + body[key]
      }
      if (fieldDesc['type'] === Number) {
        dataObj[key] = parseInt(body[key] || 0)
      }
      if (fieldDesc['type'] === Array) {
        dataObj[key] = parseInt(body[key] || [])
      }
    }
  }

  //   for (var key in userModel) {
  //     const fieldDesc = userModel[key]
  //     dataObj[key] = fieldDesc['default'] || (fieldDesc['type'] === String ? '' : 0)
  //     if (body[key]) {
  //       if (fieldDesc['type'] === String) {
  //         dataObj[key] = '' + body[key]
  //       }
  //       if (fieldDesc['type'] === Number) {
  //         dataObj[key] = parseInt(body[key])
  //       }
  //     }
  //   }
  return dataObj
}
var mandatoryValidation = (fieldName, value) => {
  const fieldDesc = schema[fieldName]
  if (fieldDesc.required) {
    if (value === '' || value === null || value === 'undefined' || value === 'NULL' || typeof value === 'undefined' || value === undefined) return false
  }
  return true
}
var isDataNotValid = (body) => {
  for (var key in body) {
    if (!mandatoryValidation(key, body[key])) {
      return {
        'validation_messages': {
          [key]: {
            'isEmpty': "Value is required and can't be empty"
          }
        },
        'type': 'http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html',
        'title': 'Unprocessable Entity',
        'status': 422,
        'detail': 'Failed Validation'
      }
    }
  }
  return false
}

module.exports = {
  schema,
  convertToSchemaForUpdate,
  convertToSchemaForCreate,
  isDataNotValid
}
