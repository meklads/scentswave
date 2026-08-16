"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GATE_COOKIE, GATE_VALUE, SITE_PASSWORD } from "@/lib/gate";

export async function unlockSite(formData: FormData) {
  const password = String(formData.get("password") || "");
  if (password !== SITE_PASSWORD) {
    redirect("/gate?error=1");
  }

  const jar = await cookies();
  jar.set(GATE_COOKIE, GATE_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/");
}
