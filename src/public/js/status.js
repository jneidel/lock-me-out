const statusIpt = document.querySelector("input");

statusIpt.addEventListener( "keyup", () => {
  const getStatusLink = document.querySelector( "button" ).parentNode;
  const { value } = statusIpt;
  const isItem = value.length === 36;

  const { href } = getStatusLink;
  const url = new URL( `${href}` );
  url.search = isItem ? `?item=${value}` : `?user=${value}`;

  getStatusLink.href = url.href;
} );

