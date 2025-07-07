import type { RequestHandler } from "@sveltejs/kit";
import { generateRandomCode } from "$lib/randomCode";
import { urlAllowed } from "$lib/urlChecker";
import { urlIsValid } from "$lib/validateUrl";

export const POST: RequestHandler = async ({ request, platform }) => {
  const { url } = await request.json();

  if (!urlIsValid(url)) {
    return new Response(JSON.stringify({ error: "URL is invalid." }), {
      status: 400,
    });
  }

  if (!url || typeof url !== "string") {
    return new Response(JSON.stringify({ error: "URL is invalid." }), {
      status: 400,
    });
  }

  // if (!(await urlAllowed(url))) {
  //   return new Response(JSON.stringify({ error: "URL is blocked." }), {
  //     status: 403,
  //   });
  // }

  // Check if the URL is already shortened using the reverse lookup k/v pair that has the URL as the key
  const existingCode = await platform?.env.LINKS.get(url);

  if (existingCode) {
    return new Response(JSON.stringify({ short: `/link/${existingCode}` }));
  }

  const code = generateRandomCode(12);
  await platform?.env.LINKS.put(code, url);
  await platform?.env.LINKS.put(url, code); // Add a 2nd K/V pair for reverse lookup

  return new Response(JSON.stringify({ short: `/link/${code}` }));
};
