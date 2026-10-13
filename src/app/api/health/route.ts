import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Open http://localhost:3000/api/health to check the database connection.
 * It reports setup problems only; it never returns keys or stored enquiries.
 */
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    return NextResponse.json(
      { connected: false, problem: "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY in .env" },
      { status: 500 }
    );
  }

  const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { count, error } = await supabase.from("enquiries").select("id", { count: "exact", head: true });

  if (error) {
    const missingTable = error.code === "42P01" || error.code === "PGRST205";
    return NextResponse.json(
      {
        connected: !missingTable,
        problem: missingTable
          ? "Table 'enquiries' not found. Run supabase/schema.sql in the Supabase SQL Editor."
          : "Database rejected the request. Check that SUPABASE_SECRET_KEY is correct.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ connected: true, table: "enquiries", enquiries: count ?? 0 });
}
