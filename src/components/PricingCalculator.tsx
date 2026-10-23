import { AVERAGE_ORDER_VALUE, formatEgp, getPlan, monthlyCost } from "@/data/pricing";
import type { AppLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Calculator } from "lucide-react";
import { useId, useState } from "react";

const copy = {
  ar: {
    title: "احسب تكلفتك بأرقامك",
    lead: "حرّك الأرقام على طلباتك المتوقعة وشوف الباقة الأوفر لمتجرك.",
    orders: "عدد الطلبات المكتملة في الشهر",
    orderValue: "متوسط قيمة الطلب",
    orderValueHint: "إجمالي المنتجات بعد الخصم، قبل الشحن",
    perMonth: "في الشهر",
    cheapest: "الأوفر لك",
    ofSales: (rate: string) => `${rate} من مبيعاتك`,
    startersWins: (amount: string) => `باقة البداية أوفر لك بـ ${amount} شهرياً.`,
    proWins: (amount: string) => `باقة احترافي توفر عليك ${amount} شهرياً.`,
    tie: "التكلفة متساوية في الباقتين.",
    noOrders: "بدون طلبات مكتملة مفيش عمولة على البداية.",
  },
  en: {
    title: "Work out your cost",
    lead: "Move the sliders to your expected orders and see which plan is cheaper for your store.",
    orders: "Completed orders per month",
    orderValue: "Average order value",
    orderValueHint: "Merchandise after discounts, before shipping",
    perMonth: "per month",
    cheapest: "Cheapest for you",
    ofSales: (rate: string) => `${rate} of your sales`,
    startersWins: (amount: string) => `Starter saves you ${amount} a month.`,
    proWins: (amount: string) => `Pro saves you ${amount} a month.`,
    tie: "Both plans cost the same.",
    noOrders: "With no completed orders, Starter charges no commission.",
  },
} as const;

const MAX_ORDERS = 1000;
const MIN_VALUE = 100;
const MAX_VALUE = 3000;

export function PricingCalculator({ language }: { language: AppLanguage }) {
  const t = copy[language];
  const ordersId = useId();
  const valueId = useId();
  const [orders, setOrders] = useState(100);
  const [orderValue, setOrderValue] = useState(AVERAGE_ORDER_VALUE);

  const results = [getPlan("free"), getPlan("pro")].map((plan) => ({
    plan,
    cost: monthlyCost(plan, orders, orderValue),
  }));
  const cheapest = Math.min(...results.map((result) => result.cost));
  const [starter, pro] = results;
  const sales = orders * orderValue;
  const gap = Math.abs(starter.cost - pro.cost);

  const verdict =
    orders === 0
      ? t.noOrders
      : starter.cost < pro.cost
        ? t.startersWins(formatEgp(gap, language))
        : pro.cost < starter.cost
          ? t.proWins(formatEgp(gap, language))
          : t.tie;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          <Calculator className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-lg font-extrabold text-gray-950 font-heading sm:text-xl">{t.title}</h3>
          <p className="mt-1 text-sm leading-6 text-gray-600">{t.lead}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10">
        <div className="space-y-6">
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor={ordersId} className="text-sm font-bold text-gray-900">
                {t.orders}
              </label>
              <output htmlFor={ordersId} className="num text-lg font-extrabold text-emerald-700">
                {orders}
              </output>
            </div>
            <input
              id={ordersId}
              type="range"
              min={0}
              max={MAX_ORDERS}
              step={10}
              value={orders}
              onChange={(event) => setOrders(Number(event.target.value))}
              className="mt-3 h-2 w-full cursor-pointer accent-emerald-600"
            />
            <div className="num mt-1 flex justify-between text-[11px] font-semibold text-gray-400">
              <span>0</span>
              <span>{MAX_ORDERS}</span>
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor={valueId} className="text-sm font-bold text-gray-900">
                {t.orderValue}
              </label>
              <output htmlFor={valueId} className="num text-lg font-extrabold text-emerald-700">
                {formatEgp(orderValue, language)}
              </output>
            </div>
            <input
              id={valueId}
              type="range"
              min={MIN_VALUE}
              max={MAX_VALUE}
              step={50}
              value={orderValue}
              onChange={(event) => setOrderValue(Number(event.target.value))}
              className="mt-3 h-2 w-full cursor-pointer accent-emerald-600"
            />
            <div className="num mt-1 flex justify-between text-[11px] font-semibold text-gray-400">
              <span>{formatEgp(MIN_VALUE, language)}</span>
              <span>{formatEgp(MAX_VALUE, language)}</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">{t.orderValueHint}</p>
          </div>
        </div>

        <div aria-live="polite" className="space-y-3">
          {results.map(({ plan, cost }) => {
            const isCheapest = cost === cheapest && starter.cost !== pro.cost;
            return (
              <div
                key={plan.id}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-xl border p-4",
                  isCheapest ? "border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600" : "border-gray-200 bg-gray-50",
                )}
              >
                <div>
                  <p className="text-sm font-extrabold text-gray-950">{plan.name[language]}</p>
                  {isCheapest ? <span className="mt-1 inline-block rounded-full bg-emerald-600 px-2 py-0.5 text-[11px] font-extrabold text-white">{t.cheapest}</span> : null}
                  {sales > 0 ? <p className="num mt-1 text-xs text-gray-500">{t.ofSales(`${((cost / sales) * 100).toFixed(1)}%`)}</p> : null}
                </div>
                <div className="text-end">
                  <p className="num text-2xl font-extrabold text-gray-950">{formatEgp(cost, language)}</p>
                  <p className="text-xs font-semibold text-gray-500">{t.perMonth}</p>
                </div>
              </div>
            );
          })}
          <p className="pt-1 text-sm font-bold text-emerald-800">{verdict}</p>
        </div>
      </div>
    </div>
  );
}
