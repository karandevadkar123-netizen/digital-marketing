import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(request: Request) {
  try {
    if (!supabaseUrl || !supabaseSecretKey) {
      return NextResponse.json(
        { success: false, message: "Server is not configured. Add the Supabase keys to .env." },
        { status: 500 }
      );
    }

    const body = await request.json();

    // Honeypot: real people never fill this hidden field.
    if (clean(body.website, 100)) {
      return NextResponse.json({ success: true, message: "Thank you." });
    }

    const fullName = clean(body.fullName, 120);
    const phone = clean(body.phone, 25);
    const email = clean(body.email, 160);

    if (!fullName || !phone) {
      return NextResponse.json(
        { success: false, message: "Full name and phone number are required." },
        { status: 400 }
      );
    }
    if (!/^\+?[0-9\s-]{7,18}$/.test(phone)) {
      return NextResponse.json(
        { success: false, message: "Enter a valid phone number, with country code if outside India." },
        { status: 400 }
      );
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Enter a valid email address." },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseSecretKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { error } = await supabase.from("enquiries").insert({
      full_name: fullName,
      phone,
      email: email || null,
      service: clean(body.service, 60) || null,
      property_city: clean(body.city, 80) || null,
      budget: clean(body.budget, 60) || null,
      message: clean(body.message, 2000) || null,
      status: "New",
    });

    if (error) {
      console.error("ENQUIRY INSERT ERROR:", error);
      const missingTable = error.code === "42P01" || error.code === "PGRST205";
      return NextResponse.json(
        {
          success: false,
          message:
            missingTable && process.env.NODE_ENV !== "production"
              ? "Database table 'enquiries' not found. Run supabase/schema.sql in Supabase first."
              : "We could not save your enquiry. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you. Our team will contact you shortly.",
    });
  } catch (err) {
    console.error("ENQUIRY ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
