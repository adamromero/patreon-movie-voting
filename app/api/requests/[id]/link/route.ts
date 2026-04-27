import { NextResponse } from "next/server";
import { setLinks } from "@/lib/services/requests/setLinks";
import { getCurrentUser } from "@/lib/session";

export async function PUT(
   req: Request,
   { params }: { params: { id: string } },
) {
   const user = await getCurrentUser();

   if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   const links = await req.json();

   try {
      const result = await setLinks({ requestId: params.id, links });
      return NextResponse.json(result);
   } catch (error) {
      return NextResponse.json({
         error: "Unable to update movie vote in the database.",
      });
   }
}
