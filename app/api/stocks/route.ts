import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name =
      typeof body?.name === "string" ? body.name.trim().toUpperCase() : "";
    const description =
      typeof body?.description === "string" ? body.description.trim() : "";
    const currentPrice = Number(body?.currentPrice);
    const volatility = Number(body?.volatility);

    // Validate request body
    if (!name || !description) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!Number.isFinite(currentPrice) || currentPrice <= 0) {
      return NextResponse.json(
        { message: "Current price must be a valid number greater than 0" },
        { status: 400 },
      );
    }
    // console.log("till here :: -------", currentPrice,currentPrice>=0);

    if (!Number.isFinite(volatility) || volatility < 0) {
      return NextResponse.json(
        { message: "Volatility must be a valid number 0 or higher" },
        { status: 400 },
      );
    }

    const stock = await prisma.stock.create({
      data: {
        name,
        description,
        currentPrice,
        volatility,
      },
    });

    return NextResponse.json(stock, { status: 201 });
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { message: "Stock with this name already exists" },
        { status: 409 },
      );
    }

    console.error("Error creating stock:", error);
    return NextResponse.json(
      { message: "An error occurred while creating the stock" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const stocks = await prisma.stock.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(stocks);
  } catch (error: unknown) {
    console.error("Error fetching stocks:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching stocks" },
      { status: 500 },
    );
  }
}
