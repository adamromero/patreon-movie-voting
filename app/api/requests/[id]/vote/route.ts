import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { addVote } from "@/lib/services/requests/addVote";
import { removeVote } from "@/lib/services/requests/removeVote";

export async function PUT(
   req: Request,
   { params }: { params: { id: string } },
) {
   const user = await getCurrentUser();

   if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   try {
      const result = await addVote({ requestId: params.id, user });
      return NextResponse.json(result);
   } catch (error) {
      return NextResponse.json({
         error: "Unable to update movie vote in the database.",
      });
   }
}

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
