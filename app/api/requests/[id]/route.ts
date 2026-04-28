import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { deleteRequest } from "@/lib/db/requests";

export async function DELETE(
   req: Request,
   { params }: { params: { id: string } },
) {
   const user = await getCurrentUser();

   //TODO: prevent anyone but creator from deleting also
   if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   try {
      const result = await deleteRequest(params.id);
      return NextResponse.json(result);
   } catch (error) {
      return NextResponse.json({
         error: "Unable to update movie vote in the database.",
      });
   }
}
