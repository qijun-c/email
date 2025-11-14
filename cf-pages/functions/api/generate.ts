import { json, randLocal, withCORS } from "./_utils";

export const onRequestGet = withCORS(async (ctx: any) => {
  const env = ctx.env as any;
  const url = new URL(ctx.request.url);
  const localParam = (url.searchParams.get("local") || "").trim();
  let local = "";
  if (localParam) {
    const s = localParam.toLowerCase();
    if (!/^[a-z0-9._-]{1,64}$/.test(s)) {
      return json({ error: "invalid local (allowed: a-z 0-9 . _ - , length 1-64)" }, 400);
    }
    local = s;
  } else {
    local = randLocal();
  }
  const host = new URL(ctx.request.url).host;
  const domain = env.PUBLIC_DOMAIN || host;
  const address = `${local}@${domain}`;
  return json({ address, local });
});
