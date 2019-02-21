import Item from "./models/Item";

export async function createItem( data: { name: String, date: Date, user: String } ) {
  const item = new Item( data );

  try {
    await item.save()
    return item.id;
  } catch ( err ) {
    return err
  }
}
