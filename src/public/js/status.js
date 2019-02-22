const axios = require( "axios" );

const submitButton = document.querySelector( "button" );
const inputField = document.querySelector( "input" );

submitButton.addEventListener( "click", async () => {
  const { value } = inputField;

  axios.post( "/api/get-status", { value } )
    .then( res => res.data )
    .then( data => console.log( data ) );
} );
