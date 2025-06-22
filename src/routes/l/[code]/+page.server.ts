import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, platform }) => {
  const code: string = params.code;
  const url: URL = await platform?.env.URL_SHORTENER.get(code);

  if (url) {
    throw redirect(302, url);
  } else {
    console.error("Link not found for code:", code);
    throw redirect(302, "/linknotfound");
  }
};
