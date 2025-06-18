import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  try {
    const response = await fetch(
      "https://de-olho-no-foco.onrender.com/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    if (response.status !== 201)
      return new Response("Unauthorized", { status: 401 });

    const data = await response.text();
    return Response.json({
      token: data,
    });
  } catch (error) {
    console.log(error);
    return new Response("Internal server Error", { status: 500 });
  }
}
