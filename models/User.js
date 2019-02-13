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

var schema = {
    'id': {type:String, match:/^[a-z0-9]+$/i,  minlength:3, maxlength:30, required:true,index: { unique: true }},
    "name": {type:String, default:'-'},
    "username": {type:String, match:/^[a-z0-9]+$/i,  minlength:3, maxlength:30, required:true,index: { unique: true }},
    "email": {type:String,minlength:2, maxlength:40, match:/^([\w-\.]+@([\w-]+\.)+[\w-]{2,11})?$/, required:true, index: { unique: true }},
    "password": {type:String,required:true},
    "createdon": {type:Number, required:true, default:new Date().getTime()},
    "modifiedon": {type:Number, required:true, default:new Date().getTime()},
    "role": {type:Number, default: 100}, //1=super admin, 2=admin 3=content team, 4=partner, 100 = user biasa
    "scope": {type:Number, default: 100}, //1=super admin, 2=admin 3=content team, 4=partner, 100 = user biasa
    "status": {type:String, require:true, enum:['temp','active', 'inactive', 'admin', 'locked'], default:'temp'}, //temp, active, inactive, admin
}

module.exports = {
   schema
}