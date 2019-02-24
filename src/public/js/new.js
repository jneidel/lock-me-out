const userIpt = document.querySelector( "input[name='user']" );
const passphraseIpt = document.querySelector( "input[name='passphrase']" );

function disablePassphrase( el ) {
  el.disabled = false;
  el.placeholder = "";
}
function enablePassphrase( el ) {
  if ( !el.disabled ) {
    el.disabled = true;
    el.placeholder = "The users passphrase";
  }
}
function passphraseEvent() {
  const { value: user } = userIpt;

  if ( user === "" )
    disablePassphrase( passphraseIpt );
  else
    enablePassphrase( passphraseIpt );
}

function changeNewUserUrl() {
  const newUserLink = document.querySelector( "button[class='second']" ).parentNode;
  const { value: user } = userIpt;
  const { href } = newUserLink;

  const url = new URL( `${href}` );
  url.search = `?user=${user}`;

  newUserLink.href = url.href;
}

userIpt.addEventListener( "keyup", () => {
  passphraseEvent();
  changeNewUserUrl();
} );

