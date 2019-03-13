const axios = require( "axios" );
const statusIpt = document.querySelector("input");
const decryptBtn = document.querySelector( "#decryptBtn" );
const deleteLink = document.querySelector( "#delete" );

// Change button url on input field change
statusIpt.addEventListener( "keyup", () => {
  const getStatusLink = document.querySelector( "button" ).parentNode;
  const { value } = statusIpt;
  const isItem = value.length === 36;

  const { href } = getStatusLink;
  const url = new URL( `${href}` );
  url.search = isItem ? `?item=${value}` : `?user=${value}`;

  getStatusLink.href = url.href;
} );

// Crate textarea for the decrypted value
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

// Get item id from the url
function getItemId() {
  const urlParams = (new URL( window.location.href )).searchParams;
  return urlParams.get( "item" );
}

// isItem view only
try {
  decryptBtn.addEventListener( "click", async () => {
    const passphrase = document.querySelector( "#decryptIpt" ) ? document.querySelector( "#decryptIpt" ).value : null;
    const itemId = getItemId();

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

  deleteLink.addEventListener( "click", async () => {
    const itemId = getItemId();

    axios.post( "/api/remove-item", { item: itemId } )
      .then( res => res.data )
      .then( data => {
        if ( !data.error ) {
          // Redirect to /status
          const url = String( window.location.href ).match( /([^\?]+)/ )[1];
          window.location = url;
        } else {
          console.log( "Removal error:", data.msg )
        }
      } );
  } );
} catch( err ) {}

