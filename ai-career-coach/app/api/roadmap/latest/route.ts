import { NextResponse } from "next/server";
import { db } from "../../../../configs/db"; // adjust path if needed
import { roadMapGeneratorTable } from "../../../../configs/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    // Fetch all resume_analysis ordered by createdAt descending
    const latestResumes = await db
      .select()
      .from(roadMapGeneratorTable)
      .orderBy(desc(roadMapGeneratorTable.createdAt));

    // Keep only the latest per user
    const latestPerUser = latestResumes.reduce<Record<number, typeof latestResumes[0]>>(
      (acc, row) => {
        if (!acc[row.userId]) {
          acc[row.userId] = row;
        }
        return acc;
      },
      {}
    );

    return NextResponse.json(Object.values(latestPerUser));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
