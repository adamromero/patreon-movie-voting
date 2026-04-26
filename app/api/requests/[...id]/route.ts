import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { removeVote } from "@/lib/services/requests/removeVote";

connectDB();

export async function DELETE(
   req: Request,
   { params }: { params: { id: string } },
) {
   const user = await getCurrentUser();

   if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   try {
      const result = await removeVote({ requestId: params.id, user });
      return NextResponse.json(result);
   } catch (error) {
      return NextResponse.json({
         error: "Unable to update movie vote in the database.",
      });
   }
}
