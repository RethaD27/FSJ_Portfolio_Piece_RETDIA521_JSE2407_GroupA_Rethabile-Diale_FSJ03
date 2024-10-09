import { db } from "@/firebase";
import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";

/**
 * Retrieves all unique product categories from the Firestore database.
 * 
 * @async
 * @function GET
 * @returns {Promise<NextResponse>} A JSON response containing an array of unique product categories or an error message.
 * 
 * @example
 * // Example usage:
 * // Fetch product categories
 * const response = await GET();
 * 
 * // Expected output:
 * // ["Electronics", "Clothing", "Home", ...]
 */
export async function GET() {
  try {
    // Reference to the 'products' collection in Firestore
    const productsRef = collection(db, 'products');
    
    // Fetch all product documents
    const snapshot = await getDocs(productsRef);

    // Initialize a Set to store unique categories
    const categories = new Set();

    // Iterate over each document and extract categories
    snapshot.forEach(doc => {
      const product = doc.data();
      
      // Add category to the Set if it exists
      if (product.category) {
        categories.add(product.category);
      }
    });

    // Return the unique categories as a JSON response
    return NextResponse.json(Array.from(categories));
  } catch (error) {
    // Return an error response in case of failure
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
