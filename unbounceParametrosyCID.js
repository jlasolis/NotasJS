//este script resuelve un par de problemas en Unbounce, como son el paso de los UTMs y la creación de un ID único con el que identificar cada lead además de concatenarlos en los comentarios
// suponemos que el formulario tiene los campos ocultos valor_cid utm_source utm_medium utm_campaignid y comentario
// @jlasolis https://github.com/jlasolis/NotasJS/

<script>
//lo primero es declarar una función con la que extraer los parámetros GET 

    function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}

//después declaramos las variables temporales que utilizaremos

  let gclid = getParameterByName('gclid'); 
  let utm_source = getParameterByName('utm_source'); 
  let utm_medium = getParameterByName('utm_medium'); 
  let utm_campaignid = getParameterByName('utm_campaignid');
  
// ahora vamos a crear un ID único cuando el DOM esté listo  
document.addEventListener("DOMContentLoaded", function() {
  let cid = Math.random().toString(36).substr(2, 5);
  cid = cid + Math.random().toString(36).substr(2, 5); //generamos dis cadenas aleatorias que concatenamos para asegurarnos que sea unico
  document.getElementById('valor_cid').value = cid; //aqui lo pasamos al formulario
  document.getElementById('utm_campaignid').value = cid;
  console.log(cid);  //hacemos eco del CID mientras que hacemos debug
  //condicional por si existe GCLID"
  if ((gclid=='')||(gclid==null)){
  document.getElementById('valor_cid').value = cid; //aqui lo pasamos al formulario
  document.getElementById('utm_campaignid').value = cid;
    console.log('no hay GCLID');
  }
  else{
    document.getElementById('valor_cid').value = gclid; //aqui lo pasamos al formulario
  document.getElementById('utm_campaignid').value = gclid;
  document.getElementById('utm_source').value = 'google';
  document.getElementById('utm_medium').value = 'cpc';
  console.log('hay GCLID Seteamos fuente y medio a google/cpc');
  }
  
document.getElementById('comentarios').value=document.getElementById('comentarios').value +  " GC_"+gclid + "-S:" + document.getElementById('utm_source').value + "-M:" + document.getElementById('utm_medium').value + "-C:" + document.getElementById('utm_campaignid').value + "-CID:" + cid
  
  var d = new Date();
  d.setTime(d.getTime() + (1*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = "stella_cid=" + cid + ";" + expires + ";path=/";
if (typeof dataLayer !== 'undefined') {
    // the variable is defined
     dataLayer.push({'StellaCid': cid}); //aqui lo pasamos por GTM
}
 
  
  // para hacer debug lo mostramos todo en consola
  console.log("GC_"+gclid + "-S:" + document.getElementById('utm_source').value + "-M:" + document.getElementById('utm_medium').value + "-C:" + document.getElementById('utm_campaignid').value + "-CID:" + cid + "-Com:" + document.getElementById('comentarios').value);
  
  });
</script>
