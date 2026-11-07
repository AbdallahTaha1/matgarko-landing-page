import { FaqList } from "@/components/FaqList";
import { StoreShowcase } from "@/components/StoreShowcase";
import {
  ABROAD_PER_ORDER_USD,
  ABROAD_PRO_MONTHLY_USD,
  type Country,
  countryPath,
  localMoney,
  usd,
} from "@/data/countries";
import { WHATSAPP_URL } from "@/lib/seo";
import {
  ArrowRight,
  Ban,
  BarChart3,
  CheckCircle2,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  Truck,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import RegisterPage from "../RegisterPage";
import { ABROAD_PRO_BREAKEVEN, countryFaqs, countryFeatures, perOrderText, proText } from "./countryContent";

const featureIcons = [Wallet, ShieldCheck, Truck, BarChart3, MessageCircle, Smartphone];

function CountryCta({ country }: { country: Country }) {
  return (
    <section className="relative overflow-hidden bg-gray-950 text-white" aria-labelledby="country-cta-title">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-emerald-400 to-transparent" aria-hidden="true" />
      <div className="container-x relative py-14 text-center sm:py-20">
        <h2 id="country-cta-title" className="text-2xl font-extrabold leading-snug font-heading sm:text-4xl">
          افتح متجرك {country.inName} اليوم
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-gray-300 sm:text-lg">
          بدون اشتراك شهري. تدفع {perOrderText(country)} على الطلب، والطلبات الوهمية لا تُحتسب.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={countryPath(country, "/register")} className="btn btn-accent">
            أنشئ متجرك مجاناً
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-dark">
            اسألنا على واتساب
          </a>
        </div>
      </div>
    </section>
  );
}

function PlanCards({ country }: { country: Country }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <article className="card border-2 border-emerald-600 p-5 sm:p-6">
        <p className="section-kicker">الأنسب للبداية</p>
        <h3 className="mt-3 text-xl font-extrabold text-gray-950 font-heading">البداية</h3>
        <p className="mt-1 text-sm text-gray-600">بدون اشتراك شهري</p>
        <p className="mt-4 text-3xl font-extrabold text-gray-950 num" dir="ltr">{usd(ABROAD_PER_ORDER_USD)}</p>
        <p className="mt-1 text-sm font-semibold text-emerald-800">على الطلب · حوالي {localMoney(country, ABROAD_PER_ORDER_USD)}</p>
        <p className="mt-3 text-sm leading-6 text-gray-600">الطلبات الوهمية والطلبات التي تسجلها بنفسك لا تُحتسب.</p>
        <a href={countryPath(country, "/register")} className="btn btn-primary mt-5 w-full">ابدأ مجاناً</a>
      </article>
      <article className="card p-5 sm:p-6">
        <p className="section-kicker">للمتاجر الكبيرة</p>
        <h3 className="mt-3 text-xl font-extrabold text-gray-950 font-heading">احترافي</h3>
        <p className="mt-1 text-sm text-gray-600">بدون رسوم على الطلب</p>
        <p className="mt-4 text-3xl font-extrabold text-gray-950 num" dir="ltr">{usd(ABROAD_PRO_MONTHLY_USD)}</p>
        <p className="mt-1 text-sm font-semibold text-emerald-800">شهرياً · حوالي {localMoney(country, ABROAD_PRO_MONTHLY_USD)}</p>
        <p className="mt-3 text-sm leading-6 text-gray-600">أوفر من البداية إذا تجاوزت طلباتك {ABROAD_PRO_BREAKEVEN.toLocaleString("en-US")} طلب شهرياً.</p>
        <a href={countryPath(country, "/register")} className="btn btn-secondary mt-5 w-full">ابدأ احترافي</a>
      </article>
    </div>
  );
}

export function CountryHomePage({ country }: { country: Country }) {
  const features = countryFeatures(country);
  return (
    <div dir="rtl">
      <section className="hero-band relative overflow-hidden" aria-labelledby="country-hero-title">
        <div className="noise-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(70%_60%_at_50%_0%,#000_20%,transparent_100%)]" aria-hidden="true" />
        <div className="container-x relative pb-12 pt-8 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <span className="section-kicker">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              متجركو {country.inName}
            </span>
            <h1 id="country-hero-title" className="mt-5 text-[2rem] font-extrabold leading-[1.4] text-gray-950 font-heading sm:text-4xl sm:leading-[1.35] lg:text-[2.75rem] lg:leading-[1.3]">
              متجر إلكتروني {country.inName} بالدفع عند الاستلام
              <span className="text-conversion-gradient block pb-2">{usd(ABROAD_PER_ORDER_USD)} على الطلب، والوهمي مجاناً</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              أنشئ متجرك في دقائق، واستقبل طلبات الدفع عند الاستلام من {country.cities.slice(0, 3).join(" و")} وكل مدن {country.name}، والأسعار ب{country.currencyName}. بدون اشتراك شهري: تدفع {perOrderText(country)} على كل طلب، والطلب الوهمي الذي يكشفه الدرع لا يُحتسب.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={countryPath(country, "/register")} className="btn btn-primary">
                أنشئ متجرك مجاناً
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </a>
              <Link to={countryPath(country, "/pricing")} className="btn btn-secondary">الأسعار بالتفصيل</Link>
            </div>
            <ul className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-gray-600 sm:text-sm">
              {["بدون اشتراك شهري", "الطلبات الوهمية لا تُحتسب", `الأسعار ب${country.currencyName}`, "دعم بالعربي على واتساب"].map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="country-features-title">
        <div className="container-x">
          <div className="max-w-2xl">
            <h2 id="country-features-title" className="section-title">كل ما يحتاجه متجر الدفع عند الاستلام</h2>
            <p className="section-lead mt-3">أدوات مصممة للتاجر الذي يبيع بالإعلانات ويوصّل ويحصّل عند الباب.</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = featureIcons[index % featureIcons.length];
              return (
                <article key={feature.title} className="premium-card p-5">
                  <span className="icon-tile h-11 w-11"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  <h3 className="mt-4 text-lg font-extrabold text-gray-950 font-heading">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">{feature.text}</p>
                </article>
              );
            })}
          </div>
          <p className="mt-6 text-sm">
            <Link to={countryPath(country, "/cod")} className="font-bold text-emerald-800 underline underline-offset-4">
              كيف يحمي متجركو طلبات الدفع عند الاستلام {country.inName}
            </Link>
          </p>
        </div>
      </section>

      <StoreShowcase language="ar" />

      <section className="section bg-gray-50" aria-labelledby="country-pricing-title">
        <div className="container-x">
          <div className="max-w-2xl">
            <h2 id="country-pricing-title" className="section-title">سعر ثابت وواضح</h2>
            <p className="section-lead mt-3">الفاتورة شهرية بالدولار، وتظهر بجانبها القيمة ب{country.currencyName}.</p>
          </div>
          <div className="mt-8"><PlanCards country={country} /></div>
        </div>
      </section>

      <section className="section" aria-labelledby="country-faq-title">
        <div className="container-x max-w-3xl">
          <h2 id="country-faq-title" className="section-title">أسئلة التجار {country.inName}</h2>
          <FaqList className="mt-6" items={countryFaqs(country)} />
        </div>
      </section>

      <CountryCta country={country} />
    </div>
  );
}

export function CountryPricingPage({ country }: { country: Country }) {
  const rows = [100, 300, 700, 1000, 2000];
  return (
    <div dir="rtl">
      <section className="page-hero text-center">
        <div className="container-x">
          <span className="section-kicker">الأسعار {country.inName}</span>
          <h1 className="page-title mt-4">{usd(ABROAD_PER_ORDER_USD)} على الطلب، والطلبات الوهمية مجاناً</h1>
          <p className="page-lead mt-4">
            بدون اشتراك شهري ولا نسبة من مبيعاتك. {perOrderText(country)} على كل طلب مهما كانت قيمته، أو باقة احترافي {proText(country)} بدون رسوم على الطلب.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <PlanCards country={country} />

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <article className="card p-5 sm:p-6">
              <h2 className="text-lg font-extrabold text-gray-950 font-heading">ما الذي يُحتسب؟</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-gray-700">
                <li className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />كل طلب يدخل متجرك في الشهر، أياً كانت قيمته وحتى لو أُلغي أو رُفض استلامه.</li>
                <li className="flex gap-2"><Ban className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />لا يُحتسب الطلب الوهمي: طلب علّم عليه الدرع لحظة إنشائه (رقم مكرر أو طلبات كثيرة من نفس الرقم) ثم ألغيته.</li>
                <li className="flex gap-2"><Ban className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />لا تُحتسب الطلبات التي تسجلها بنفسك من واتساب أو الهاتف.</li>
                <li className="flex gap-2"><Wallet className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />تصلك فاتورة شهرية بالدولار، وطريقة الدفع مكتوبة فيها.</li>
              </ul>
            </article>
            <article className="card overflow-hidden">
              <h2 className="p-5 text-lg font-extrabold text-gray-950 font-heading sm:p-6 sm:pb-3">التكلفة الشهرية حسب عدد الطلبات</h2>
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-start font-semibold">طلبات/شهر</th>
                    <th scope="col" className="px-4 py-3 text-start font-semibold">البداية</th>
                    <th scope="col" className="px-4 py-3 text-start font-semibold">احترافي</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((orders) => {
                    const starter = orders * ABROAD_PER_ORDER_USD;
                    const cheaper = starter <= ABROAD_PRO_MONTHLY_USD ? "starter" : "pro";
                    return (
                      <tr key={orders} className="border-t border-gray-100">
                        <th scope="row" className="px-4 py-3 text-start font-bold text-gray-950 num">{orders.toLocaleString("en-US")}</th>
                        <td className={`px-4 py-3 num ${cheaper === "starter" ? "font-bold text-emerald-800" : "text-gray-600"}`}>{usd(starter)} <span className="text-xs text-gray-500">({localMoney(country, starter)})</span></td>
                        <td className={`px-4 py-3 num ${cheaper === "pro" ? "font-bold text-emerald-800" : "text-gray-600"}`}>{usd(ABROAD_PRO_MONTHLY_USD)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </article>
          </div>
          <p className="mt-4 text-xs leading-6 text-gray-500">القيم ب{country.currencyName} تقريبية بسعر صرف ثابت؛ الفاتورة نفسها بالدولار.</p>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container-x max-w-3xl">
          <h2 className="section-title">أسئلة عن الأسعار</h2>
          <FaqList className="mt-6" items={countryFaqs(country).slice(1, 3)} />
        </div>
      </section>

      <CountryCta country={country} />
    </div>
  );
}

export function CountryCodPage({ country }: { country: Country }) {
  const checks = [
    { title: "رقم مكرر", text: "للرقم نفسه طلب آخر مفتوح خلال آخر 24 ساعة." },
    { title: "طلبات كثيرة", text: "3 طلبات من نفس الرقم خلال يوم، أو 6 من نفس الاتصال خلال ساعة." },
    { title: "رفض سابقاً", text: "رفض صاحب الرقم استلام طلب من قبل، فيظهر التنبيه على طلباته التالية." },
    { title: "رقم محظور", text: "الأرقام التي تحظرها لا تستطيع الطلب من متجرك أصلاً." },
  ];
  return (
    <div dir="rtl">
      <section className="page-hero text-center">
        <div className="container-x">
          <span className="section-kicker">الدفع عند الاستلام {country.inName}</span>
          <h1 className="page-title mt-4">احمِ متجرك من الطلبات الوهمية {country.inName}</h1>
          <p className="page-lead mt-4">
            الطلب الوهمي يكلّفك شحناً ووقتاً ومخزوناً. متجركو يفحص كل طلب لحظة إنشائه ويعرض لك تنبيهاً قبل أن تؤكده، والطلب الوهمي الذي تلغيه لا ندفّعك عليه شيئاً.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <h2 className="section-title">ما الذي يفحصه درع الطلبات الوهمية؟</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {checks.map((check) => (
              <article key={check.title} className="card p-5">
                <span className="icon-tile h-10 w-10"><ShieldCheck className="h-5 w-5" aria-hidden="true" /></span>
                <h3 className="mt-3 text-lg font-extrabold text-gray-950 font-heading">{check.title}</h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">{check.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <article className="card p-5 sm:p-6">
              <h2 className="text-lg font-extrabold text-gray-950 font-heading">«رفض الاستلام» ونسبة التسليم الحقيقية</h2>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                إذا رفض العميل الطلب عند الباب، سجّل «رفض الاستلام» فترجع المنتجات للمخزون ويُعلَّم الرقم على طلباته القادمة. وفي الإحصائيات تظهر نسبة التسليم الفعلية: الطلبات المسلّمة من بين الطلبات التي وصلت للباب.
              </p>
            </article>
            <article className="card p-5 sm:p-6">
              <h2 className="text-lg font-extrabold text-gray-950 font-heading">الطلب الوهمي مجاناً</h2>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                باقة البداية {perOrderText(country)} على الطلب. الطلب الذي علّم عليه الدرع بأنه مكرر أو من رقم طلب كثيراً، ثم ألغيته، لا يدخل الفاتورة. التنبيه يضعه النظام لحظة الطلب، فلا يتغير بعد ذلك.
              </p>
            </article>
          </div>
        </div>
      </section>

      <CountryCta country={country} />
    </div>
  );
}

export function CountryRegisterPage({ country }: { country: Country }) {
  return <RegisterPage country={country.code} />;
}
