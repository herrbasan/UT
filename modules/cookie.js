export default {
    getCookies: function(){
        var pairs = document.cookie.split(";");
        var cookies = {};
        for (var i=0; i<pairs.length; i++){
            var pair = pairs[i].split("=");
            cookies[(pair[0]+'').trim()] = decodeURI(pair.slice(1).join('='));
        }
        return cookies;
    },

    setCookie: function(name, value, hours, path=''){
        let d = new Date();
        d.setTime(d.getTime() + (hours*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + `;path=/${path}`;
    },

    getCookie: function(cname) {
     let name = cname + "=";
     let decodedCookie = decodeURIComponent(document.cookie);
     let ca = decodedCookie.split(';');
     for(let i = 0; i <ca.length; i++) {
       let c = ca[i];
       while (c.charAt(0) == ' ') {
         c = c.substring(1);
       }
       if (c.indexOf(name) == 0) {
         return c.substring(name.length, c.length);
       }
     }
     return "";
    },

    deleteCookie: function(cname, path=''){
       document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/${path};`;
    },

    checkCookie: function(cname, value) {
       let check = false;
       let cookie = this.getCookie(cname);
       if( cookie != ""){
           if(value){
               if(cookie == value){
                   check = true;
               }
           }
           else {
               check = true;
           }
       }
       return check; 
    }
};