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

function createTextArea() {
  const decryptTable = document.querySelector( "table" );
  const decryptArea = document.createElement( "textarea" );
  decryptArea.id = "decryptArea";
  decryptArea.readOnly = true;

  decryptTable.appendChild( decryptArea );
  return decryptArea;
}
function getTextArea() {
  let decryptArea = document.querySelector( "#decryptArea" );

  if ( decryptArea === null ) {
    decryptArea = createTextArea();
  }

  return decryptArea;
}

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
        const decryptArea = getTextArea();
        decryptArea.innerText = data.error ? data.msg : data.value;
      } );
  } );
} catch( err ) {}

