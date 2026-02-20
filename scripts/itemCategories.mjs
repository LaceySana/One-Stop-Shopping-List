export const itemCategories = {
  // --- Grocery / Food ---
  "milk": "supermarket",
  "eggs": "supermarket",
  "bread": "bakery",
  "cheese": "supermarket",
  "butter": "supermarket",
  "yogurt": "supermarket",
  "cereal": "supermarket",
  "rice": "supermarket",
  "pasta": "supermarket",
  "fruit": "supermarket",
  "vegetables": "supermarket",
  "meat": "supermarket",
  "chicken": "supermarket",
  "snacks": "supermarket",
  "chips": "supermarket",
  "soda": "supermarket",
  "water": "supermarket",

  // --- Pharmacy / Drugstore ---
  "vitamins": "pharmacy",
  "medicine": "pharmacy",
  "ibuprofen": "pharmacy",
  "bandages": "pharmacy",
  "shampoo": "drugstore",
  "conditioner": "drugstore",
  "soap": "drugstore",
  "toothpaste": "drugstore",
  "toothbrush": "drugstore",
  "deodorant": "drugstore",

  // --- Hardware ---
  "hammer": "hardware_store",
  "nails": "hardware_store",
  "screws": "hardware_store",
  "drill": "hardware_store",
  "light bulbs": "hardware_store",
  "paint": "hardware_store",
  "wrench": "hardware_store",
  "tape measure": "hardware_store",

  // --- Pet Supplies ---
  "cat food": "pet_store",
  "dog food": "pet_store",
  "cat litter": "pet_store",
  "pet treats": "pet_store",
  "pet toys": "pet_store",

  // --- Office / School Supplies ---
  "notebook": "book_store",
  "pens": "store",
  "pencils": "store",
  "printer paper": "store",
  "markers": "store",
  "folders": "store",

  // --- Clothing ---
  "shirt": "clothing_store",
  "pants": "clothing_store",
  "shoes": "shoe_store",
  "socks": "clothing_store",
  "jacket": "clothing_store",

  // --- Electronics ---
  "headphones": "electronics_store",
  "charger": "electronics_store",
  "batteries": "electronics_store",
  "keyboard": "electronics_store",
  "mouse": "electronics_store",

  // --- Home Goods ---
  "towels": "home_goods_store",
  "bedding": "home_goods_store",
  "pillows": "home_goods_store",
  "cleaning supplies": "home_goods_store",
  "laundry detergent": "home_goods_store",

  // --- Baby ---
  "diapers": "store",
  "baby wipes": "store",
  "formula": "supermarket",

  // --- Misc ---
  "gift card": "store",
  "candle": "home_goods_store"
};


export function categorizeItem(item) {
  const key = item.toLowerCase().trim();
  return itemCategories[key] || "store";
}
