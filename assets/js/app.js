(function () {
  "use strict";

  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  // Sticky navbar background on scroll
  function onScroll() {
    if (window.scrollY > 20) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  // Active nav link via scroll spy
  var sections = document.querySelectorAll("section[id], header[id]");
  var linkMap = {};
  navLinks &&
    navLinks.querySelectorAll("a[href^='#']").forEach(function (a) {
      linkMap[a.getAttribute("href").slice(1)] = a;
    });
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.id;
            Object.keys(linkMap).forEach(function (k) {
              linkMap[k].classList.toggle("active", k === id);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (s) {
      spy.observe(s);
    });
  }

  // Project filters
  var filters = document.getElementById("filters");
  var items = document.querySelectorAll("#portfolioGrid .pf-item");
  if (filters) {
    filters.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      filters.querySelectorAll("button").forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      var filter = btn.getAttribute("data-filter");
      items.forEach(function (item) {
        var show = filter === "all" || item.getAttribute("data-category") === filter;
        item.style.display = show ? "" : "none";
      });
    });
  }

  // Animated stat counters
  var counters = document.querySelectorAll(".num[data-count]");
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var suffix = el.textContent.replace(/[0-9]/g, "");
    var start = 0;
    var dur = 1200;
    var t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var val = Math.floor(p * target);
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var cObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            cObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (c) {
      cObs.observe(c);
    });
  }

  // Current year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Internationalization (English / Arabic) ----------
  var ar = {
    "brand.role": "قائد تقني متكامل بالذكاء الاصطناعي",
    "nav.home": "الرئيسية",
    "nav.about": "نبذة",
    "nav.skills": "المهارات",
    "nav.experience": "الخبرات",
    "nav.projects": "المشاريع",
    "nav.certs": "الشهادات",
    "nav.cta": "تواصل معي",

    "hero.status": "متاح للأدوار ذات الأثر العالي",
    "hero.title": "مرحبًا، أنا <span class=\"grad\">عبدالباسط</span>",
    "hero.role": "قائد تقني متكامل بالذكاء الاصطناعي",
    "hero.lead": "أكثر من 10 سنوات في بناء تطبيقات Angular وReact المؤسسية وخدمات خلفية بلغتَي Java وPython عبر قطاعات البنوك والطيران والطاقة والتعليم. أقود حاليًا منصات الحفر اللحظية ومساعدًا مدعومًا بنماذج اللغة الكبيرة في أرامكو السعودية.",
    "hero.work": "استعرض أعمالي",
    "hero.contact": "تواصل معي",

    "stats.exp": "سنوات الخبرة",
    "stats.spa": "تطبيقات مؤسسية",
    "stats.led": "مطوّرون بقيادتي",
    "stats.domains": "قطاعات صناعية",

    "about.eyebrow": "نبذة عني",
    "about.title": "تحويل بيانات المجال المعقّدة إلى <span class=\"grad\">واجهات سريعة وموثوقة</span>",
    "about.p1": "أنا قائد تقني متكامل بالذكاء الاصطناعي أطوّر برمجيات إنتاجية من الطرف إلى الطرف — من واجهات Angular/React إلى خدمات Java وPython FastAPI الخلفية، منشورة على OpenShift.",
    "about.p2": "في أرامكو السعودية أقود فريقًا متعدد التخصصات لبناء منصتَي الحفر SAIRO وWell Connect: تصوّر بيانات آبار لحظي باستخدام Geotoolkit، وخدمات FastAPI، ومساعد مدعوم بنماذج اللغة الكبيرة يتيح لمهندسي الحفر الاستعلام عن بيانات الحفّارة والآبار باللغة الطبيعية. وقبل ذلك قدت إعادة كتابة نظام Ultra LMS في Blackboard مع توجيه فريق من أكثر من 7 مهندسين.",
    "about.p3": "أهتم بالأداء (التحميل الكسول، وتقسيم الشيفرة، والتخزين المؤقت)، والمعمارية النظيفة (الواجهات المصغّرة، ومبادئ SOLID)، وتجربة المطوّر — مكوّنات قابلة لإعادة الاستخدام ومراجعات دقيقة والتطوير الموجَّه بالاختبار.",
    "about.name": "الاسم",
    "about.roleLabel": "المسمّى",
    "about.location": "الموقع",
    "about.locationVal": "المملكة العربية السعودية / تشيناي، الهند",
    "about.email": "البريد",
    "about.phone": "الهاتف",

    "svc1.h": "الذكاء الاصطناعي ودمج نماذج اللغة",
    "svc1.p": "مساعدون محادثيون، وهندسة الأوامر، وربط واجهات نماذج اللغة الكبيرة ببيانات إنتاجية حقيقية.",
    "svc2.h": "معمارية الواجهات الأمامية",
    "svc2.p": "تطبيقات Angular وReact قابلة للتوسّع — واجهات مصغّرة، وإدارة حالة، وأنظمة مكوّنات قابلة لإعادة الاستخدام.",
    "svc3.h": "الخدمات الخلفية وDevOps",
    "svc3.p": "واجهات Java Spring Boot وPython FastAPI، محزّمة في حاويات ومنشورة عبر خطوط OpenShift CI/CD.",

    "skills.eyebrow": "المنظومة التقنية",
    "skills.title": "المهارات <span class=\"grad\">والتقنيات</span>",
    "skills.intro": "عقد من العمل العملي عبر المنظومة الكاملة — الواجهة الأمامية والخلفية والبيانات والتسليم.",
    "skills.g1": "الواجهة الأمامية",
    "skills.g2": "الخلفية والبيانات",
    "skills.g3": "الذكاء الاصطناعي والسحابة / DevOps",
    "skills.g4": "الاختبار والممارسات",

    "exp.eyebrow": "المسيرة المهنية",
    "exp.title": "الخبرة <span class=\"grad\">العملية</span>",
    "exp.intro": "قيادة وبناء تطبيقات مؤسسية عبر قطاعات الطاقة والبنوك والطيران والتعليم والخدمات اللوجستية.",
    "date.present": "حتى الآن",

    "aramco.role": "قائد تقني · الحفر (SAIRO وWell Connect)",
    "aramco.b1": "قيادة فريق متعدد التخصصات لتقديم حلول Angular 18 وFastAPI وOpenShift لمنصات الحفر اللحظية.",
    "aramco.b2": "بناء مساعد مدعوم بنماذج اللغة الكبيرة يتيح للمهندسين الاستعلام عن بيانات الحفّارة والآبار اللحظية باللغة الطبيعية.",
    "aramco.b3": "هندسة تصوّر بيانات الآبار اللحظي باستخدام Geotoolkit — مسارات ومنحنيات متعددة متزامنة يستخدمها أكثر من 30 مهندسًا.",
    "aramco.b4": "خفض أزمنة تحميل لوحات المعلومات باستخدام استدعاءات RxJS forkJoin المتوازية والتحميل الكسول وتحسين كشف التغيّر.",
    "bb.role": "قائد تقني · نظاما Learn وUltra LMS",
    "bb.b1": "قيادة وتوجيه أكثر من 7 مطوّرين، مع امتلاك معمارية الواجهة الأمامية ومراجعات الشيفرة وتخطيط السباقات لإعادة كتابة Ultra LMS.",
    "bb.b2": "تحديث المكوّنات باستخدام ReactJS وAngular 12؛ وتطبيق معمارية واجهات مصغّرة عبر عدة مستودعات.",
    "bb.b3": "خدمات خلفية بلغة Java وSpring Boot على MySQL/Oracle/PostgreSQL؛ ومحزّمة بـ Docker وKubernetes.",
    "bb.b4": "وضع معايير الشيفرة والاختبار باستخدام Jest وJasmine وأتمتة WebdriverIO.",
    "bh.role": "مطوّر أول · Real-Track",
    "bh.b1": "بناء تطبيق Angular 9 متجاوب على واجهات خدمات مصغّرة REST مع مستودع واجهات مصغّرة؛ وقيادة التخطيط وإدارة الجهد.",
    "bh.b2": "قيادة CI/CD باستخدام Jenkins وAWS، وتحسين الأداء عبر Angular AOT، وبناء مكوّنات Highcharts قابلة لإعادة الاستخدام.",
    "citi.role": "مطوّر Angular · بوابة الائتمان للأفراد (RPC)",
    "citi.b1": "تطوير تطبيق Angular 9 متجاوب مدعوم بواجهات خدمات مصغّرة REST مع مكوّنات وخدمات مخصّصة قابلة لإعادة الاستخدام.",
    "citi.b2": "تصميم شاشات وأيقونات وأصول SVG؛ والنشر عبر AWS ومعالجة مشكلات جودة الشيفرة في SONAR.",
    "ua.role": "مطوّر Angular · جدولة UCrew",
    "ua.b1": "بناء تطبيق Angular 6 متجاوب مدعوم بخدمات Spring Boot المصغّرة، باستخدام Cosmos DB لتخزين بيانات الواجهة الأمامية.",
    "ua.b2": "إنشاء مكوّنات مخصّصة قابلة لإعادة الاستخدام ومعالجة عيوب الواجهة خلال اختبارات SIT وUAT.",
    "crisil.role": "مطوّر Angular · نظام إنشاء القروض",
    "crisil.b1": "تطوير تطبيق Angular 4 من خدمات مصغّرة باستخدام Bootstrap وPrimeNG وفق المخططات، مع اختبارات وحدة Karma/Jasmine.",
    "scb.role": "مطوّر Angular · السجل الرئيسي للعملاء الأفراد",
    "scb.b1": "بناء تطبيق Angular 4 من خدمات مصغّرة باستخدام Bootstrap وPrimeNG؛ مع مكوّنات مخصّصة واختبارات Karma/Jasmine.",
    "apl.role": "مطوّر واجهات · Logistics Super Suite",
    "apl.b1": "بناء تطبيق Angular متجاوب مع توجيهات وخدمات مخصّصة باستخدام Bootstrap؛ ومعالجة عيوب SIT/UAT.",

    "projects.eyebrow": "أعمالي",
    "projects.title": "الشركات <span class=\"grad\">والعملاء</span>",
    "projects.intro": "عقد من تقديم التطبيقات المؤسسية لمنظمات عالمية عبر مختلف القطاعات.",
    "filter.all": "الكل",
    "filter.energy": "الطاقة",
    "filter.banking": "البنوك والتمويل",
    "filter.edtech": "التعليم التقني",
    "filter.airlines": "الطيران",
    "filter.logistics": "الخدمات اللوجستية",
    "filter.consulting": "الاستشارات وتقنية المعلومات",

    "achievements.eyebrow": "التقدير",
    "achievements.title": "الجوائز <span class=\"grad\">والإنجازات</span>",
    "award1": "شهادة تقدير عن \u201cالمسؤولية والنزاهة، والتركيز على العميل، والتعاون\u201d — Anthology.",
    "award2": "جائزة التميّز من Accenture.",
    "award3": "جائزة الأداء المتميّز — Accenture.",
    "award4": "شهادة تقدير من العميل — Standard Chartered Bank.",
    "award5": "جائزة \u201cأفضل فريق سكرَم\u201d — TCS.",
    "award6": "تطوير مساعد مدعوم بنماذج اللغة الكبيرة خفّض جهد البحث اليدوي عن البيانات لمهندسي الحفر في أرامكو.",

    "certs.eyebrow": "المؤهلات",
    "certs.title": "الشهادات",
    "cert.credly": "شارة معتمدة من Credly",
    "cert.completion": "شهادة إتمام",
    "cert.view": "عرض الشهادة",

    "contact.eyebrow": "تواصل",
    "contact.title": "لنصنع شيئًا <span class=\"grad\">رائعًا</span>",
    "contact.phone": "الهاتف",
    "contact.email": "البريد الإلكتروني",
    "contact.location": "الموقع",
    "contact.linkedin": "لينكدإن",
    "contact.h": "لديك دور أو مشروع في ذهنك؟",
    "contact.p": "أنا منفتح لفرص القيادة التقنية والتطوير المتكامل بالذكاء الاصطناعي. لنتحدث عن كيف يمكنني مساعدة فريقك على التسليم بسرعة أكبر.",
    "contact.emailBtn": "راسلني",
    "contact.connect": "تواصل",

    "footer.name": "عبدالباسط م. أ. · قائد تقني متكامل بالذكاء الاصطناعي"
  };

  var i18nEls = document.querySelectorAll("[data-i18n]");
  var en = {};
  i18nEls.forEach(function (el) {
    en[el.getAttribute("data-i18n")] = el.innerHTML;
  });

  var langToggle = document.getElementById("langToggle");

  function applyLang(lang) {
    var dict = lang === "ar" ? ar : en;
    i18nEls.forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = dict[key];
      if (val === undefined) val = en[key];
      if (val !== undefined) el.innerHTML = val;
    });
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    if (langToggle) langToggle.textContent = lang === "ar" ? "English" : "العربية";
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  var savedLang = "en";
  try { savedLang = localStorage.getItem("lang") || "en"; } catch (e) {}
  if (savedLang === "ar") applyLang("ar");
  else if (langToggle) langToggle.textContent = "العربية";

  if (langToggle) {
    langToggle.addEventListener("click", function () {
      applyLang(document.documentElement.lang === "ar" ? "en" : "ar");
    });
  }
})();
