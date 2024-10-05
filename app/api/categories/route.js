import { db } from "@/firebase";
import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
    try {
      const categoriesQuery = collection(db, 'categories', "allCategories");
      const snapshot = await getDocs(categoriesQuery);
      const categories = snapshot.docs.map(doc => doc.data().name);
  
      return NextResponse.json(categories);
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }