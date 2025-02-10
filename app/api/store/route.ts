import { error } from "console";
import { NextResponse } from "next/server";

async function fetchProduct(){
    const res = await fetch(" https://api.escuelajs.co/api/v1/products");

    if(!res.ok){
        return null;
    }

}


export async function GET(){
    const products = await fetchProduct();

    if(!products){
        return NextResponse.json({error:"Failed to load data"},{status:500});
    }

    return NextResponse.json(products)
}