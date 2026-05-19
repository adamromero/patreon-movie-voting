import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { User } from "@/app/types/user";

export function getSession() {
   return getServerSession(authOptions);
}

export async function getCurrentUser(): Promise<User | undefined> {
   const session = await getSession();
   return session?.user;
}
