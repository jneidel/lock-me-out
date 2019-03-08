const axios = require( "axios" );
const statusIpt = document.querySelector("input");
const decryptBtn = document.querySelector( "#decryptBtn" );

statusIpt.addEventListener( "keyup", () => {
  const getStatusLink = document.querySelector( "button" ).parentNode;
  const { value } = statusIpt;
  const isItem = value.length === 36;

  const { href } = getStatusLink;
  const url = new URL( `${href}` );
  url.search = isItem ? `?item=${value}` : `?user=${value}`;

  getStatusLink.href = url.href;
} );

try { // Not available in DefaultView and UserView
  decryptBtn.addEventListener( "click", async () => {
    const passphrase = document.querySelector( "#decryptIpt" ) ? document.querySelector( "#decryptIpt" ).value : null;
    const urlParams = (new URL( window.location.href )).searchParams;
    const itemId = urlParams.get( "item" );

    axios.post( "/api/status-decrypt", {
      item: itemId,
      passphrase,
    } )
      .then( res => res.data )
      .then( data => {
        console.log( data )
      } );
  } );
} catch( err ) {}

