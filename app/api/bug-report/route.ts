import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getToken } from "next-auth/jwt";

export async function POST(req: any) {
  try {
    // Step 1: Check token
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.email) {
      return NextResponse.json({ 
        success: false, 
        error: "STEP 1 FAILED: No token found. User not logged in.",
        tokenExists: !!token
      }, { status: 401 });
    }

    // Step 2: Find user
    let user;
    try {
      user = await prisma.user.findUnique({
        where: { email: token.email },
      });
    } catch (dbError: any) {
      return NextResponse.json({ 
        success: false, 
        error: "STEP 2 FAILED: Database error finding user: " + dbError.message 
      }, { status: 500 });
    }

    if (!user) {
      return NextResponse.json({ 
        success: false, 
        error: "STEP 2 FAILED: User not found for email: " + token.email 
      }, { status: 404 });
    }

    // Step 3: Parse body
    let body;
    try {
      body = await req.json();
    } catch (parseError: any) {
      return NextResponse.json({ 
        success: false, 
        error: "STEP 3 FAILED: Cannot parse request body: " + parseError.message 
      }, { status: 400 });
    }

    const { feature, issueType, description } = body;

    // Step 4: Validate fields
    if (!feature || !issueType || !description) {
      return NextResponse.json({ 
        success: false, 
        error: "STEP 4 FAILED: Missing fields",
        received: { feature: feature || "EMPTY", issueType: issueType || "EMPTY", description: description || "EMPTY" }
      }, { status: 400 });
    }

    // Step 5: Create bug report
    let newBug;
    try {
      newBug = await prisma.bugReport.create({
        data: {
          userId: user.id,
          feature,
          issueType,
          description,
          status: "Open",
        },
      });
    } catch (createError: any) {
      return NextResponse.json({ 
        success: false, 
        error: "STEP 5 FAILED: Cannot create bug report: " + createError.message,
        code: createError.code,
        meta: createError.meta
      }, { status: 500 });
    }

    // Success
    return NextResponse.json({ 
      success: true, 
      message: "Bug reported successfully!",
      step: "ALL STEPS PASSED",
      bugId: newBug.id,
      userId: user.id
    });

  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: "FINAL CATCH: " + (error?.message || String(error)),
      stack: error?.stack?.split("\n")?.slice(0, 3)
    }, { status: 500 });
  }
}
