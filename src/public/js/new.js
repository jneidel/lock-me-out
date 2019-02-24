const userIpt = document.querySelector( "input[name='user']" );
const passphraseIpt = document.querySelector( "input[name='passphrase']" );

function disablePassphrase( el ) {
  el.disabled = false
  el.placeholder = ""
}
function enablePassphrase( el ) {
  if ( !el.disabled ) {
    el.disabled = true
    el.placeholder = "The users passphrase"
  }
}

function passphraseEvent() {
  const { value: user } = userIpt;

  if ( user === "" ) {
    disablePassphrase( passphraseIpt );
  } else {
    enablePassphrase( passphraseIpt );
  }
}

userIpt.addEventListener( "keyup", passphraseEvent);

