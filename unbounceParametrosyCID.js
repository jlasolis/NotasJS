<script>
//este script resuelve un par de problemas en Unbounce, como son el paso de los UTMs y la creacion de un ID unico con el que identificar cada lead ademas de concatenarlos en los comentarios
// suponemos que el formulario tiene los campos ocultos valor_cid utm_source utm_medium utm_campaignid y comentario
// @jlasolis https://github.com/jlasolis/NotasJS/
//lo primero es declarar una funcion con la que extraer los parametros GET 

    function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}

//despues declaramos las variables temporales que utilizaremos

  let gclid = getParameterByName('gclid'); 
  let utm_source = getParameterByName('utm_source'); 
  let utm_medium = getParameterByName('utm_medium'); 
  let utm_campaignid = getParameterByName('utm_campaignid');
  
// ahora vamos a crear un ID unico cuando el DOM este listo  
document.addEventListener("DOMContentLoaded", function() {
  let cid = Math.random().toString(36).substr(2, 5);
  cid = cid + Math.random().toString(36).substr(2, 5); //generamos dis cadenas aleatorias que concatenamos para asegurarnos que sea unico
      if (typeof document.getElementById('valor_cid') != "undefined") {
   document.getElementById('valor_cid').value = cid; //aqui lo pasamos al formulario
}
        if (typeof document.getElementById('utm_campaignid') != "undefined") {
   document.getElementById('utm_campaignid').value = cid;
}
  
  
  console.log(cid);  //hacemos eco del CID mientras que hacemos debug
  //condicional por si existe GCLID"
  if ((gclid=='')||(gclid==null)){
  document.getElementById('valor_cid').value = cid; //aqui lo pasamos al formulario
  document.getElementById('utm_campaignid').value = cid;
    console.log('no hay GCLID');
  }
  else{
    if (typeof document.getElementById('valor_cid') != "undefined") {
   document.getElementById('valor_cid').value = gclid; //aqui lo pasamos al formulario
}
        if (typeof document.getElementById('utm_campaignid') != "undefined") {
   document.getElementById('utm_campaignid').value = gclid;
}
          if (typeof   document.getElementById('utm_source') != "undefined") {
   document.getElementById('utm_source').value = 'google';
}
  
          if (typeof   document.getElementById('utm_medium') != "undefined") {
   document.getElementById('utm_medium').value = 'cpc';
}
  
  console.log('hay GCLID Seteamos fuente y medio a google/cpc');
  }
  
  
  if (typeof   document.getElementById('comentarios') != "undefined") {
   document.getElementById('comentarios').value=document.getElementById('comentarios').value + " Fuente/medio:" + document.getElementById('utm_source').value + "/" + document.getElementById('utm_medium').value ;// +  " GC_"+gclid + "-C:" + document.getElementById('utm_campaignid').value + "-CID:" + cid
}

  
  var d = new Date();
  d.setTime(d.getTime() + (1*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = "stella_cid=" + cid + ";" + expires + ";path=/" +";SameSite=Lax";
  
if (typeof dataLayer !== 'undefined') {
    // the variable is defined
     dataLayer.push({'StellaCid': cid}); //aqui lo pasamos por GTM
}
 
  
  // para hacer debug lo mostramos todo en consola
  console.log("GC_"+gclid + "-S:" + document.getElementById('utm_source').value + "-M:" + document.getElementById('utm_medium').value + "-C:" + document.getElementById('utm_campaignid').value + "-CID:" + cid + "-Com:" + document.getElementById('comentarios').value);
  

  
  });
</script>
