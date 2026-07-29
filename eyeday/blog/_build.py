#!/usr/bin/env python3
"""언어별 블로그 정적 페이지를 생성한다.

클라이언트 JS 로 본문을 갈아끼우면 구글은 URL 하나만 색인하므로 다국어 SEO 가
성립하지 않는다. 그래서 언어마다 별도 URL 을 만들고 canonical / hreflang 을 박는다.

  한국어  : /blog/<slug>/          (기존 URL 유지)
  그 외   : /<lang>/blog/<slug>/

본문은 _content/<lang>.json 에서 읽는다. 번역이 없는 언어는 그냥 건너뛰므로
언어를 하나씩 추가해도 된다.

사용법: cd ~/posiki && python3 eyeday/blog/_build.py
"""
import json, os, re, shutil, sys, html

HERE = os.path.dirname(os.path.abspath(__file__))
CONTENT = os.path.join(HERE, '_content')
REPO = os.path.abspath(os.path.join(HERE, '..', '..'))
ORIGIN = 'https://eyeday.posiki.com'

DEFAULT_LANG = 'ko'          # 루트 /blog/ 를 차지하는 언어
X_DEFAULT = 'en'             # hreflang="x-default" 가 가리킬 언어

APP_STORE = ('https://apps.apple.com/kr/app/'
             'eyeday-%EC%95%88%EC%95%BD-%EC%95%8C%EB%9E%8C-%EC%A0%90%EC%95%88-%EA%B8%B0%EB%A1%9D/'
             'id6759497954')
PLAY_HL = {'pt': 'pt-BR', 'zh-Hant': 'zh-TW', 'no': 'no', 'cs': 'cs', 'da': 'da'}


def play_store(lang):
    return ('https://play.google.com/store/apps/details'
            f'?id=com.eyedrop.reminder&hl={PLAY_HL.get(lang, lang)}')


def lang_dir(lang):
    """해당 언어 블로그의 저장소 내 경로 (repo 기준 상대)"""
    return 'eyeday/blog' if lang == DEFAULT_LANG else f'eyeday/{lang}/blog'


def url_for(lang, slug=None):
    base = f'{ORIGIN}/blog/' if lang == DEFAULT_LANG else f'{ORIGIN}/{lang}/blog/'
    return base + (f'{slug}/' if slug else '')


def css_href(lang, is_index):
    """언어별 디렉터리에서 공용 styles.css 까지의 상대 경로"""
    # /blog/<slug>/ -> ../styles.css   |  /<lang>/blog/<slug>/ -> ../../../blog/styles.css
    if lang == DEFAULT_LANG:
        return 'styles.css' if is_index else '../styles.css'
    return '../../../blog/styles.css' if is_index else '../../../../blog/styles.css'


def home_href(lang):
    return '/' if lang == DEFAULT_LANG else f'/?lang={lang}'


def esc(s):
    """속성값용 — 따옴표까지 이스케이프한다"""
    return html.escape(s, quote=True)


def txt(s):
    """텍스트 노드용 — 따옴표는 그대로 둔다"""
    return html.escape(s, quote=False)


def alternates(langs, slug=None):
    out = []
    for l in langs:
        out.append(f'<link rel="alternate" hreflang="{l}" href="{url_for(l, slug)}">')
    if X_DEFAULT in langs:
        out.append(f'<link rel="alternate" hreflang="x-default" href="{url_for(X_DEFAULT, slug)}">')
    return ''.join(out)


def lang_switcher(langs, names, cur, slug=None):
    opts = ''.join(
        f'<option value="{url_for(l, slug)}"{" selected" if l == cur else ""}>{txt(names[l])}</option>'
        for l in langs)
    return (f'<select class="blog-lang" aria-label="Language" '
            f'onchange="location.href=this.value">{opts}</select>')


def footer(ui):
    return ('<footer class="blog-footer"><div>'
            f'<a href="/privacy/">{txt(ui["privacy"])}</a>'
            f'<a href="/terms/">{txt(ui["terms"])}</a>'
            f'<a href="/contact/">{txt(ui["contact"])}</a>'
            '</div><div class="copyright">© 2026 posiki</div></footer>')


def render_article(lang, post, ui, langs, names):
    blocks = []
    for b in post['blocks']:
        if b['t'] == 'h2':
            blocks.append(f'<h2>{b["v"]}</h2>')
        elif b['t'] == 'p':
            blocks.append(f'<p>{b["v"]}</p>')
        elif b['t'] == 'ul':
            blocks.append('<ul>' + ''.join(f'<li>{i}</li>' for i in b['v']) + '</ul>')

    cta = post.get('cta') or {}
    cta_html = ''
    if cta.get('title'):
        cta_html = (
            f'<div class="cta"><h2>{cta["title"]}</h2><p>{cta["body"]}</p>'
            f'<div class="cta-links">'
            f'<a href="{APP_STORE}">{cta["appStore"]}</a>'
            f'<a class="secondary" href="{play_store(lang)}">{cta["playStore"]}</a>'
            f'</div></div>')

    return (
        f'<!DOCTYPE html><html lang="{lang}"{" dir=\"rtl\"" if lang == "ar" else ""}>'
        f'<head><meta charset="utf-8">'
        f'<meta name="viewport" content="width=device-width, initial-scale=1.0">'
        f'<title>{txt(post["title"])} - EyeDay</title>'
        f'<meta name="description" content="{esc(post["description"])}">'
        f'<link rel="canonical" href="{url_for(lang, post["slug"])}">'
        f'{alternates(langs, post["slug"])}'
        f'<meta property="og:type" content="article">'
        f'<meta property="og:title" content="{esc(post["title"])}">'
        f'<meta property="og:description" content="{esc(post["description"])}">'
        f'<meta property="og:url" content="{url_for(lang, post["slug"])}">'
        f'<link rel="stylesheet" href="{css_href(lang, False)}"></head>'
        f'<body><main class="blog-shell">'
        f'<nav class="blog-top"><a class="brand" href="{home_href(lang)}">eyeday</a>'
        f'<div class="top-links"><a href="../">{txt(ui["blog"])}</a>'
        f'<a href="{home_href(lang)}">{txt(ui["home"])}</a>'
        f'{lang_switcher(langs, names, lang, post["slug"])}</div></nav>'
        f'<article><span class="eyebrow">{post["eyebrow"]}</span>'
        f'<h1>{post["h1"]}</h1>'
        f'<div class="article-date">{post["date"]}</div>'
        f'<p class="summary">{post["summary"]}</p>'
        f'<div class="note">{post["note"]}</div>'
        f'{"".join(blocks)}{cta_html}</article>'
        f'<a class="back-blog" href="../">{txt(ui["back"])}</a></main>'
        f'{footer(ui)}'
        f'</body></html>')


def render_index(lang, posts, ui, langs, names):
    cards = ''.join(
        f'<a class="post-card" href="{p["slug"]}/">'
        f'<div class="post-meta">{p["eyebrow"]}</div>'
        f'<h2>{p["h1"]}</h2><p>{p["summary"]}</p></a>'
        for p in posts)
    return (
        f'<!DOCTYPE html><html lang="{lang}"{" dir=\"rtl\"" if lang == "ar" else ""}>'
        f'<head><meta charset="utf-8">'
        f'<meta name="viewport" content="width=device-width, initial-scale=1.0">'
        f'<title>{txt(ui["indexTitle"])}</title>'
        f'<meta name="description" content="{esc(ui["indexDescription"])}">'
        f'<link rel="canonical" href="{url_for(lang)}">'
        f'{alternates(langs)}'
        f'<meta property="og:type" content="website">'
        f'<meta property="og:title" content="{esc(ui["indexTitle"])}">'
        f'<meta property="og:description" content="{esc(ui["indexDescription"])}">'
        f'<meta property="og:url" content="{url_for(lang)}">'
        f'<link rel="stylesheet" href="{css_href(lang, True)}"></head>'
        f'<body><main class="blog-shell">'
        f'<nav class="blog-top"><a class="brand" href="{home_href(lang)}">eyeday</a>'
        f'<div class="top-links"><a href="./">{txt(ui["blog"])}</a>'
        f'<a href="{home_href(lang)}">{txt(ui["home"])}</a>'
        f'{lang_switcher(langs, names, lang)}</div></nav>'
        f'<div class="hero-copy"><span class="eyebrow">{txt(ui["eyebrow"])}</span>'
        f'<h1>{ui["indexHeading"]}</h1>'
        f'<p class="lead">{txt(ui["lead"])}</p>'
        f'<div class="note">{txt(ui["disclaimer"])}</div></div>'
        f'<div class="post-list">{cards}</div></main>'
        f'{footer(ui)}'
        f'</body></html>')


def sitemap(langs, slugs):
    """각 URL 에 xhtml:link 대체 링크를 함께 실어 언어 묶음을 명시한다."""
    rows = []
    for target in [None] + list(slugs):
        alts = ''.join(
            f'<xhtml:link rel="alternate" hreflang="{l}" href="{url_for(l, target)}"/>'
            for l in langs)
        for l in langs:
            rows.append(f'  <url><loc>{url_for(l, target)}</loc>{alts}</url>')
    return ('<?xml version="1.0" encoding="UTF-8"?>\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" '
            'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
            + '\n'.join(rows) + '\n</urlset>\n')


def main():
    if not os.path.isdir(CONTENT):
        sys.exit(f'번역 디렉터리가 없습니다: {CONTENT}')

    files = sorted(glob_json(CONTENT))
    if not files:
        sys.exit('_content 에 번역 파일이 없습니다')

    data = {}
    for f in files:
        lang = os.path.basename(f)[:-5]
        data[lang] = json.load(open(f, encoding='utf-8'))

    if DEFAULT_LANG not in data:
        sys.exit(f'기본 언어({DEFAULT_LANG}) 번역이 필요합니다')

    # 글 순서와 목록은 기본 언어를 기준으로 삼는다
    slugs = [p['slug'] for p in data[DEFAULT_LANG]['posts']]
    langs = list(data.keys())
    names = {l: data[l]['ui']['languageName'] for l in langs}

    written = 0
    for lang, d in data.items():
        by_slug = {p['slug']: p for p in d['posts']}
        missing = [s for s in slugs if s not in by_slug]
        if missing:
            sys.exit(f'{lang}: 글 누락 {missing}')
        ordered = [by_slug[s] for s in slugs]

        # 블록 구조가 기본 언어와 같은지 검사해 번역 누락·구조 어긋남을 잡는다
        if lang != DEFAULT_LANG:
            for s in slugs:
                ref = [b['t'] for b in {p['slug']: p for p in data[DEFAULT_LANG]['posts']}[s]['blocks']]
                got = [b['t'] for b in by_slug[s]['blocks']]
                if ref != got:
                    sys.exit(f'{lang}/{s}: 블록 구조 불일치\n  기준 {ref}\n  실제 {got}')
                for i, b in enumerate(by_slug[s]['blocks']):
                    if b['t'] == 'ul':
                        n = len({p['slug']: p for p in data[DEFAULT_LANG]['posts']}[s]['blocks'][i]['v'])
                        if len(b['v']) != n:
                            sys.exit(f'{lang}/{s}: 목록 {i} 항목 수 {len(b["v"])} != {n}')
                for k in ('title','description','eyebrow','h1','date','summary','note'):
                    if not by_slug[s].get(k):
                        sys.exit(f'{lang}/{s}: {k} 비어 있음')

        outdir = os.path.join(REPO, lang_dir(lang))
        os.makedirs(outdir, exist_ok=True)
        write(os.path.join(outdir, 'index.html'),
              render_index(lang, ordered, d['ui'], langs, names)); written += 1
        for p in ordered:
            pdir = os.path.join(outdir, p['slug'])
            os.makedirs(pdir, exist_ok=True)
            write(os.path.join(pdir, 'index.html'),
                  render_article(lang, p, d['ui'], langs, names)); written += 1

    write(os.path.join(REPO, 'eyeday', 'blog-sitemap.xml'), sitemap(langs, slugs))
    print(f'{len(langs)}개 언어 / 글 {len(slugs)}개 / 페이지 {written}개 생성')
    print('언어:', ', '.join(langs))


def glob_json(d):
    import glob as g
    return [p for p in g.glob(os.path.join(d, '*.json'))
            if not os.path.basename(p).startswith('_')]


def write(path, content):
    open(path, 'w', encoding='utf-8').write(content)


if __name__ == '__main__':
    main()
