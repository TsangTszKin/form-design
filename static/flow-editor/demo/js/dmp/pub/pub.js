
String.prototype.replaceAll = function(o, n, i) {
    if(!RegExp.prototype.isPrototypeOf(o)) {
       return this.replace(new RegExp(o, (i ? "gi": "g")), n);
    }else{
        return this.replace(o, n);
    }
};