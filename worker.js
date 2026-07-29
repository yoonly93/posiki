// posiki.com        -> 저장소 루트를 그대로 서빙 (통합 랜딩)
// eyeday.posiki.com -> /eyeday 아래를 루트로 서빙 (EyeDay 상세페이지)
//
// 저장소 하나로 두 호스트를 서빙하기 때문에, 정적 자산을 그냥 내보내면
// eyeday.posiki.com/ 이 루트 index.html(포시키 통합 랜딩)을 보여준다.
// wrangler.toml 의 run_worker_first 로 이 스크립트가 항상 먼저 돌게 해두고,
// 여기서 호스트명을 보고 경로를 다시 매핑한다.

const EYEDAY_HOST = 'eyeday.posiki.com';
const EYEDAY_PREFIX = '/eyeday';

// 호스트 루트에서 그대로 찾아야 하는 파일들.
// app-ads.txt 는 AdMob 이 마케팅 URL 도메인의 루트에서 크롤링하므로 반드시 제외한다.
const ROOT_PASSTHROUGH = new Set([
  '/app-ads.txt',
  '/favicon.ico',
]);

// Cloudflare 가 넣어주는 기본 robots.txt 에는 Sitemap 지시가 없어서
// 크롤러가 사이트맵을 못 찾는다. 호스트에 맞는 경로를 직접 내려준다.
function robotsTxt(hostname) {
  const sitemap = hostname === EYEDAY_HOST
    ? `https://${EYEDAY_HOST}/sitemap.xml\nSitemap: https://${EYEDAY_HOST}/landing-sitemap.xml\nSitemap: https://${EYEDAY_HOST}/blog-sitemap.xml`
    : 'https://posiki.com/eyeday/blog-sitemap.xml';
  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`,
    { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}

// wrangler dev 는 request.url 의 호스트를 첫 번째 라우트로 고정해 버리기 때문에
// Host 헤더를 우선해서 읽는다. 프로덕션에서는 둘이 같은 값이다.
function resolveHostname(request) {
  const hostHeader = request.headers.get('host');
  if (hostHeader) return hostHeader.split(':')[0].toLowerCase();
  return new URL(request.url).hostname.toLowerCase();
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const hostname = resolveHostname(request);

    if (url.pathname === '/robots.txt') {
      return robotsTxt(hostname);
    }

    if (hostname !== EYEDAY_HOST) {
      return env.ASSETS.fetch(request);
    }

    // /assets 는 두 호스트가 공유하는 이미지 디렉터리라 다시 매핑하지 않는다.
    if (
      ROOT_PASSTHROUGH.has(url.pathname) ||
      url.pathname.startsWith('/.well-known/') ||
      url.pathname.startsWith('/assets/')
    ) {
      return env.ASSETS.fetch(request);
    }

    // 예전 주소(eyeday.posiki.com/eyeday/...)로 들어온 요청은 새 주소로 영구 이동.
    // App Store 심사에 제출된 support URL 이 아직 이 형태라 계속 살려둬야 한다.
    if (url.pathname === EYEDAY_PREFIX || url.pathname.startsWith(`${EYEDAY_PREFIX}/`)) {
      const redirectTo = new URL(url);
      redirectTo.pathname = url.pathname.slice(EYEDAY_PREFIX.length) || '/';
      return Response.redirect(redirectTo.toString(), 301);
    }

    const rewritten = new URL(url);
    rewritten.pathname = `${EYEDAY_PREFIX}${url.pathname}`;
    return env.ASSETS.fetch(new Request(rewritten, request));
  },
};
