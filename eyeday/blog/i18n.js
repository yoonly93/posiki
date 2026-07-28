(function () {
  const GA_ID = "G-1RH70WMQY5";
  const LANGS = [
    ["ko", "한국어"], ["en", "English"], ["ja", "日本語"], ["fr", "Français"], ["es", "Español"],
    ["ru", "Русский"], ["de", "Deutsch"], ["it", "Italiano"], ["pt", "Português"]
  ];
  const COMMON = {
    ko: { home: "홈", blog: "블로그", privacy: "개인정보 처리방침", terms: "서비스 이용약관", contact: "문의", back: "← 블로그 목록", date: "2026.07.27", eyebrow: "EYE DROP GUIDE", lead: "안약은 처방 자체도 중요하지만, 정해진 시간과 간격을 지키는 일이 생각보다 어렵습니다. EyeDay 블로그에서는 진료실에서 자주 나오는 질문을 바탕으로 안약 알림, 점안 기록, 안압 관리에 필요한 내용을 쉽게 정리합니다.", disclaimer: "*수술 후 안약 종류와 횟수는 병원마다 다를 수 있습니다. 이 글은 일반적인 관리 방법이며, 실제 처방은 수술받은 병원의 안내를 따르세요.", ctaTitle: "안약 전용 관리가 필요하다면", ctaBody: "EyeDay에서 점안 스케줄, 완료 기록, 안압 기록을 함께 관리해보세요.", appStore: "아이폰은 App Store에서", playStore: "삼성, 구글픽셀, 샤오미 등을 사용한다면 Google Play에서", core: "핵심 정리", tips: "관리 팁", eyeday: "EyeDay로 관리하기" },
    en: { home: "Home", blog: "Blog", privacy: "Privacy Policy", terms: "Terms", contact: "Contact", back: "← Blog", date: "Jul 27, 2026", eyebrow: "EYE DROP GUIDE", lead: "Eye drops are not only about the prescription itself. Keeping the right time and interval is often the difficult part. EyeDay Blog explains common eye-drop questions in a practical clinic-style tone.", disclaimer: "*Eye drop types and frequency after surgery can vary by clinic. This article is general information; always follow the instructions from the clinic that treated you.", ctaTitle: "Need eye-drop-specific management?", ctaBody: "Use EyeDay to manage schedules, completion logs, interval checks, and IOP records together.", appStore: "On iPhone, download from the App Store", playStore: "On Samsung, Google Pixel, Xiaomi and other Android phones, get it on Google Play", core: "Key Points", tips: "Practical Tips", eyeday: "Using EyeDay" },
    ja: { home: "ホーム", blog: "ブログ", privacy: "プライバシーポリシー", terms: "利用規約", contact: "お問い合わせ", back: "← ブログ一覧", date: "2026年7月27日", eyebrow: "点眼ガイド", lead: "目薬は処方内容だけでなく、決められた時間と間隔を続けることが大切です。EyeDayブログでは、診察室でよく聞かれる点眼管理の疑問をわかりやすく整理します。", disclaimer: "*手術後の目薬の種類や回数は医療機関によって異なります。この記事は一般的な情報であり、実際の処方は手術を受けた医療機関の指示に従ってください。", ctaTitle: "目薬専用の管理が必要なら", ctaBody: "EyeDayで点眼スケジュール、完了記録、間隔チェック、眼圧記録をまとめて管理できます。", appStore: "iPhoneならApp Storeで", playStore: "シャープ、Google Pixel、Xperia、Galaxyなら Google Playで", core: "要点", tips: "管理のコツ", eyeday: "EyeDayでの管理" },
    fr: { home: "Accueil", blog: "Blog", privacy: "Confidentialité", terms: "Conditions", contact: "Contact", back: "← Blog", date: "27 juillet 2026", eyebrow: "GUIDE DES COLLYRES", lead: "Les collyres ne se résument pas à l'ordonnance. Respecter l'heure et l'intervalle est souvent le plus difficile. Le blog EyeDay répond aux questions fréquentes de façon pratique.", disclaimer: "*Les types et fréquences de collyres après une chirurgie varient selon les cliniques. Cet article est général; suivez toujours les consignes de votre établissement.", ctaTitle: "Besoin d'une gestion dédiée aux collyres ?", ctaBody: "EyeDay réunit horaires, journal d'application, vérification des intervalles et suivi de la pression intraoculaire.", appStore: "Sur iPhone, App Store", playStore: "Sur Samsung, Google Pixel, Xiaomi et autres Android, Google Play", core: "À retenir", tips: "Conseils pratiques", eyeday: "Avec EyeDay" },
    es: { home: "Inicio", blog: "Blog", privacy: "Privacidad", terms: "Términos", contact: "Contacto", back: "← Blog", date: "27 jul 2026", eyebrow: "GUÍA DE COLIRIOS", lead: "Con los colirios, no basta con tener la receta. Lo difícil suele ser respetar horarios e intervalos. El blog de EyeDay resume dudas habituales de forma práctica.", disclaimer: "*Los tipos y la frecuencia de colirios tras una cirugía pueden variar según la clínica. Este artículo es general; sigue siempre las indicaciones de tu centro.", ctaTitle: "¿Necesitas gestionar colirios?", ctaBody: "EyeDay reúne horarios, registro de dosis, revisión de intervalos y registros de PIO.", appStore: "En iPhone, desde App Store", playStore: "En Samsung, Google Pixel, Xiaomi y otros Android, desde Google Play", core: "Puntos clave", tips: "Consejos", eyeday: "Con EyeDay" },
    ru: { home: "Главная", blog: "Блог", privacy: "Конфиденциальность", terms: "Условия", contact: "Контакты", back: "← Блог", date: "27.07.2026", eyebrow: "КАПЛИ ДЛЯ ГЛАЗ", lead: "Важна не только сама схема назначения, но и регулярность: время, интервалы и фактическое выполнение. Блог EyeDay кратко объясняет частые вопросы о глазных каплях.", disclaimer: "*Виды и частота капель после операции зависят от клиники. Это общая информация; следуйте указаниям врача и клиники.", ctaTitle: "Нужно вести капли отдельно?", ctaBody: "EyeDay помогает вести расписание, отметки, интервалы между каплями и записи ВГД.", appStore: "На iPhone - в App Store", playStore: "На Samsung, Google Pixel, Xiaomi и других Android - в Google Play", core: "Главное", tips: "Практические советы", eyeday: "С EyeDay" },
    de: { home: "Start", blog: "Blog", privacy: "Datenschutz", terms: "Nutzungsbedingungen", contact: "Kontakt", back: "← Blog", date: "27.07.2026", eyebrow: "AUGENTROPFEN-GUIDE", lead: "Bei Augentropfen zählt nicht nur das Rezept. Zeiten und Abstände zuverlässig einzuhalten ist oft der schwierige Teil. Der EyeDay-Blog erklärt häufige Fragen praxisnah.", disclaimer: "*Art und Häufigkeit der Augentropfen nach einer Operation können je nach Klinik variieren. Dieser Artikel ist allgemein; folgen Sie den Anweisungen Ihrer Klinik.", ctaTitle: "Augentropfen gezielt verwalten?", ctaBody: "EyeDay bündelt Zeitplan, Protokoll, Abstandskontrolle und IOD-Verlauf.", appStore: "Auf dem iPhone im App Store", playStore: "Auf Samsung, Google Pixel, Xiaomi und anderen Android-Geräten bei Google Play", core: "Kurz erklärt", tips: "Praktische Tipps", eyeday: "Mit EyeDay" },
    it: { home: "Home", blog: "Blog", privacy: "Privacy", terms: "Termini", contact: "Contatti", back: "← Blog", date: "27 lug 2026", eyebrow: "GUIDA AI COLLIRI", lead: "Con i colliri non conta solo la prescrizione: rispettare orari e intervalli è spesso la parte più difficile. Il blog EyeDay spiega le domande frequenti in modo pratico.", disclaimer: "*Tipo e frequenza dei colliri dopo un intervento possono variare per clinica. Questo articolo è generale; segui le istruzioni del tuo medico.", ctaTitle: "Serve una gestione dedicata ai colliri?", ctaBody: "EyeDay gestisce orari, completamenti, intervalli e registri della PIO in un unico posto.", appStore: "Su iPhone, dall'App Store", playStore: "Su Samsung, Google Pixel, Xiaomi e altri Android, da Google Play", core: "Punti chiave", tips: "Consigli pratici", eyeday: "Con EyeDay" },
    pt: { home: "Início", blog: "Blog", privacy: "Privacidade", terms: "Termos", contact: "Contato", back: "← Blog", date: "27 jul 2026", eyebrow: "GUIA DE COLÍRIOS", lead: "Com colírios, não basta ter a prescrição. Manter horários e intervalos é a parte difícil. O blog EyeDay organiza dúvidas comuns de forma prática.", disclaimer: "*Tipos e frequência de colírios após cirurgia variam conforme a clínica. Este artigo é geral; siga sempre as orientações do local onde você foi atendido.", ctaTitle: "Precisa gerenciar colírios?", ctaBody: "EyeDay reúne agenda, registro, intervalo entre colírios e histórico de PIO.", appStore: "No iPhone, pela App Store", playStore: "Em Samsung, Google Pixel, Xiaomi e outros Android, pelo Google Play", core: "Pontos principais", tips: "Dicas práticas", eyeday: "Com EyeDay" }
  };
  const POSTS = [
    ["glaucoma-eye-drop-reminder","녹내장","녹내장 안약, 왜 매일 같은 시간에 넣어야 할까요?","녹내장 안약 알림이 필요한 이유와 놓쳤을 때의 기본 대처를 정리했습니다.","Glaucoma","Why should glaucoma drops be used at the same time every day?","Why reminders and logs matter for long-term glaucoma eye drops.","緑内障","緑内障の目薬はなぜ毎日同じ時間が大切？","緑内障点眼でリマインダーと記録が役立つ理由。"],
    ["cataract-surgery-eye-drops","백내장 수술 후","백내장 수술 후 안약 스케줄을 헷갈리지 않게 관리하는 법","수술 후 여러 안약을 받을 때 기록과 알림을 어떻게 나누면 좋은지 설명합니다.","After cataract surgery","How to manage eye drops after cataract surgery","How to separate schedules, logs, and intervals after surgery.","白内障手術後","白内障手術後の目薬スケジュール管理","術後の複数の目薬を混乱せず管理する方法。"],
    ["eye-drop-5-minute-interval","5분 간격","안약 여러 개 쓸 때 5분 간격이 필요한 이유","앞서 넣은 안약이 씻겨 내려가지 않도록 간격을 두는 기본 원칙입니다.","5-minute interval","Why multiple eye drops need spacing","A simple explanation of why back-to-back drops should be spaced.","5分間隔","複数の目薬に5分間隔が必要な理由","先に入れた目薬を流さないための基本。"],
    ["lasik-lasek-eye-drop-schedule","라식·라섹","라식·라섹 후 안약 알림이 중요한 이유","시력교정술 후 항생제, 소염제, 인공눈물 스케줄을 놓치지 않는 방법입니다.","LASIK/LASEK","Why reminders matter after LASIK or LASEK","Keeping post-op antibiotics, anti-inflammatory drops, and artificial tears on track.","LASIK・LASEK","LASIK・LASEK後に点眼リマインダーが重要な理由","術後の点眼スケジュールを忘れないために。"],
    ["dry-eye-artificial-tears-reminder","안구건조증","인공눈물도 알림이 필요할까요?","증상이 심해진 뒤에만 넣는 습관을 줄이고 규칙적으로 관리하는 법입니다.","Dry eye","Do artificial tears need reminders?","How reminders can help dry-eye routines before symptoms worsen.","ドライアイ","人工涙液にもリマインダーは必要？","症状が強くなる前に使う習慣づくり。"],
    ["multiple-eye-drops-schedule","복수 안약","안약이 2개, 3개일 때 스케줄을 짜는 방법","아침·점심·저녁 처방과 직접 지정 스케줄을 현실적으로 정리합니다.","Multiple drops","How to schedule two or three eye drops","A practical way to separate names, eyes, frequency, and intervals.","複数の目薬","目薬が2つ、3つある時のスケジュール","薬名、左右、回数、間隔を分けて整理。"],
    ["parents-eye-drop-care","가족 관리","부모님 안약을 가족이 함께 챙길 때 확인할 것","점안 여부, 좌우 눈, 병원 방문 전 기록을 가족이 확인하기 쉽게 만드는 법입니다.","Family care","Helping parents manage eye drops","What families should check: completion, left/right eye, and clinic notes.","家族で管理","家族が親の目薬を手伝う時の確認点","完了記録、左右、受診前のメモを確認。"],
    ["pred-forte-after-cataract-surgery","스테로이드 안약","백내장 수술 후 스테로이드 안약을 사용할 때 주의할 점","임의 중단 없이 처방 기간과 횟수를 지키는 것이 왜 중요한지 설명합니다.","Steroid drops","Steroid eye drops after cataract surgery","Why frequency and duration should not be changed without clinic guidance.","ステロイド点眼","白内障手術後のステロイド点眼で注意すること","回数や期間を自己判断で変えないために。"],
    ["timolol-latanoprost-reminder","녹내장 약 이름","티몰롤·라타노프로스트 계열 안약을 잊지 않으려면","약 이름이 달라도 같은 시간대에 꾸준히 기록하는 습관이 중요합니다.","Glaucoma drug names","Remembering timolol and latanoprost drops","How logs help when product names or routines change.","緑内障の薬名","チモロール・ラタノプロスト系を忘れないために","薬名が変わっても記録を続ける考え方。"],
    ["eye-drop-reminder-app-checklist","앱 선택","안약 알림 앱을 고를 때 봐야 할 기능","단순 알람보다 안약 전용 앱에서 확인해야 할 기능을 체크리스트로 정리했습니다.","App checklist","What to look for in an eye drop reminder app","A checklist for schedules, logs, intervals, and IOP records.","アプリ選び","目薬リマインダーアプリを選ぶ時の機能","スケジュール、記録、間隔、眼圧の確認。"],
    ["global-eye-drop-reminder-apps","앱 비교","전세계 안약 알림 앱과 복약 알림 앱 비교","안약 전용 앱과 일반 복약 알림 앱을 짧게 비교하고, EyeDay가 맞는 상황을 정리했습니다.","App comparison","Eye drop reminder apps used around the world","A short comparison of eye-drop apps and general medication reminder apps.","アプリ比較","世界の目薬リマインダー・服薬アプリ比較","目薬専用アプリと一般服薬アプリを短く比較。"]
  ];
  const EXTRA = {
    fr: ["Soins oculaires", "Article sur la gestion des collyres", "Un résumé pratique pour mieux organiser les rappels, les intervalles et le journal des collyres."],
    es: ["Cuidado ocular", "Artículo sobre gestión de colirios", "Resumen práctico para organizar recordatorios, intervalos y registros de colirios."],
    ru: ["Уход за глазами", "Статья о каплях", "Практическое резюме о напоминаниях, интервалах и записях по глазным каплям."],
    de: ["Augenpflege", "Artikel zur Augentropfen-Verwaltung", "Praktische Zusammenfassung zu Erinnerungen, Abständen und Protokollen."],
    it: ["Cura degli occhi", "Articolo sulla gestione dei colliri", "Sintesi pratica per organizzare promemoria, intervalli e registri."],
    pt: ["Cuidados oculares", "Artigo sobre colírios", "Resumo prático para organizar lembretes, intervalos e registros."]
  };
  function lang() {
    const q = new URLSearchParams(location.search).get("lang");
    const saved = localStorage.getItem("eyeday_blog_lang");
    const nav = (navigator.language || "ko").slice(0,2).toLowerCase();
    return [q, saved, nav, "ko"].find(x => x && LANGS.some(l => l[0] === x)) || "ko";
  }
  function initAnalytics(l) {
    if (!window.gtag) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function(){ dataLayer.push(arguments); };
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(s);
      gtag("js", new Date());
    }
    const slug = location.pathname.split("/").filter(Boolean).at(-1) || "blog";
    const isIndex = /\/blog\/?$/.test(location.pathname);
    gtag("config", GA_ID, {
      page_title: document.title,
      page_path: location.pathname + location.search,
      page_location: location.href
    });
    gtag("event", "blog_page_view", {
      page_type: isIndex ? "blog_index" : "blog_article",
      article_slug: isIndex ? "index" : slug,
      language: l
    });
  }
  function wireAnalytics(l) {
    document.querySelectorAll(".post-card").forEach(a => {
      a.addEventListener("click", () => {
        gtag("event", "blog_post_click", {
          article_slug: a.getAttribute("href").replace(/\//g, ""),
          language: l
        });
      });
    });
    document.querySelectorAll(".cta-links a").forEach(a => {
      a.addEventListener("click", () => {
        gtag("event", "blog_download_click", {
          store: a.href.includes("apps.apple.com") ? "app_store" : "google_play",
          article_slug: location.pathname.split("/").filter(Boolean).at(-1) || "index",
          language: l
        });
      });
    });
    document.querySelectorAll(".blog-top a").forEach(a => {
      a.addEventListener("click", () => {
        gtag("event", "blog_nav_click", {
          label: a.textContent.trim() || "eyeday",
          language: l
        });
      });
    });
  }
  function postFor(slug, l) {
    const row = POSTS.find(p => p[0] === slug);
    if (!row) return null;
    if (l === "ko") return { slug: row[0], category: row[1], title: row[2], excerpt: row[3] };
    if (l === "en") return { slug: row[0], category: row[4], title: row[5], excerpt: row[6] };
    if (l === "ja") return { slug: row[0], category: row[7], title: row[8], excerpt: row[9] };
    const e = EXTRA[l];
    return { slug: row[0], category: e[0], title: e[1], excerpt: e[2] };
  }
  function ensureShell(l) {
    const c = COMMON[l] || COMMON.ko;
    const base = location.pathname.startsWith("/eyeday/") ? "/eyeday" : "";
    const homeHref = base + "/";
    document.documentElement.lang = l;
    let nav = document.querySelector(".blog-top");
    if (nav && !document.getElementById("blogLang")) {
      const isIndex = /\/blog\/?$/.test(location.pathname);
      nav.innerHTML = `<a class="brand" href="${homeHref}">eyeday</a><div class="top-links"><a href="${homeHref}">${c.home}</a><a href="${isIndex ? "./" : "../"}">${c.blog}</a><select id="blogLang" aria-label="Language">${LANGS.map(([k,n]) => `<option value="${k}">${n}</option>`).join("")}</select></div>`;
      const sel = document.getElementById("blogLang");
      sel.value = l;
      sel.addEventListener("change", e => {
        gtag("event", "blog_language_change", { from_language: l, to_language: e.target.value });
        localStorage.setItem("eyeday_blog_lang", e.target.value);
        location.search = `?lang=${e.target.value}`;
      });
    }
    const back = document.querySelector(".back-blog");
    if (back) back.textContent = c.back;
    if (!document.querySelector(".blog-footer")) {
      document.body.insertAdjacentHTML("beforeend", `<footer class="blog-footer"><div><a href="${base}/privacy/">${c.privacy}</a><a href="${base}/terms/">${c.terms}</a><a href="${base}/contact/">${c.contact}</a></div><div class="copyright">© 2026 posiki</div></footer>`);
    }
  }
  function renderIndex(l) {
    const c = COMMON[l] || COMMON.ko;
    const hero = document.querySelector(".hero-copy");
    if (hero) {
      hero.querySelector(".eyebrow").textContent = c.eyebrow;
      hero.querySelector("h1").innerHTML = l === "ko" ? "안약을 꾸준히 넣기 위한<br>현실적인 관리법" : c.blog;
      hero.querySelector(".lead").textContent = c.lead;
      const note = hero.querySelector(".note");
      if (note) note.textContent = c.disclaimer;
    }
    document.querySelectorAll(".post-card").forEach(a => {
      const slug = a.getAttribute("href").replace(/\//g,"");
      const p = postFor(slug,l);
      if (p) { a.querySelector(".post-meta").textContent = p.category; a.querySelector("h2").textContent = p.title; a.querySelector("p").textContent = p.excerpt; }
    });
  }
  function renderArticle(l) {
    if (l === "ko") return;
    const slug = location.pathname.split("/").filter(Boolean).at(-1);
    const p = postFor(slug,l), c = COMMON[l] || COMMON.ko;
    if (!p) return;
    const article = document.querySelector("article");
    article.innerHTML = `<span class="eyebrow">${p.category}</span><h1>${p.title}</h1><div class="article-date">${c.date}</div><p class="summary">${p.excerpt}</p><div class="note">${c.disclaimer}</div><h2>${c.core}</h2><p>${p.excerpt}</p><p>${c.lead}</p><h2>${c.tips}</h2><ul><li>${c.disclaimer.replace(/^\*/,"")}</li><li>${c.ctaBody}</li><li>${l === "ja" ? "複数の目薬では、左右・回数・間隔を分けて記録すると確認しやすくなります。" : "For multiple drops, separating eye side, frequency, interval, and completion status makes review easier."}</li></ul><h2>${c.eyeday}</h2><p>${c.ctaBody}</p><div class="cta"><h2>${c.ctaTitle}</h2><p>${c.ctaBody}</p><div class="cta-links"><a href="https://apps.apple.com/kr/app/eyeday-%EC%95%88%EC%95%BD-%EC%95%8C%EB%9E%8C-%EC%A0%90%EC%95%88-%EA%B8%B0%EB%A1%9D/id6759497954">${c.appStore}</a><a class="secondary" href="https://play.google.com/store/apps/details?id=com.eyedrop.reminder&hl=${l === "pt" ? "pt-BR" : l}">${c.playStore}</a></div></div>`;
    document.title = `${p.title} - EyeDay`;
  }
  const l = lang();
  ensureShell(l);
  if (/\/blog\/?$/.test(location.pathname)) renderIndex(l);
  else renderArticle(l);
  initAnalytics(l);
  wireAnalytics(l);
})();
