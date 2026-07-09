// YE POORA BLOCK HATA DIYA
const existingOpen = await prisma.bugReport.findFirst({
  where: {
    userId: user.id,
    feature,
    issueType,
    status: "Open",
  },
});

if (existingOpen) {
  return NextResponse.json(
    { success: false, error: "You already have an open ticket..." },
    { status: 409 }
  );
}
