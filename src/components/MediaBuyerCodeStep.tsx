import { useState } from "react";
import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { normalizePhoneInput } from "@/lib/phone";
import { mbInputClass, mbLabelClass } from "@/lib/mediaBuyerUi";

/** The six-digit code that came on WhatsApp, with a way to ask for another. Shared by signup and password reset. */
export function MediaBuyerCodeStep({ phone, busy, cooldown, children, submitLabel = "تأكيد", onSubmit, onResend, onBack }: {
  phone: string; busy: boolean; cooldown: number; children?: ReactNode; submitLabel?: string;
  onSubmit: (code: string) => void; onResend: () => void; onBack: () => void;
}) {
  const [code, setCode] = useState("");
  return (
    <form noValidate onSubmit={(event) => { event.preventDefault(); if (code.length === 6 && !busy) onSubmit(code); }} className="space-y-5">
      <div>
        <h3 className="text-xl font-bold">أكّد رقمك</h3>
        <p className="mt-1.5 text-sm leading-6 text-gray-600">
          بعتنا كود من 6 أرقام على واتساب للرقم <bdi dir="ltr" className="font-bold">{phone}</bdi>.
        </p>
      </div>
      <label htmlFor="code" className={mbLabelClass}>الكود
        <input id="code" className={mbInputClass + " text-center tracking-[0.4em]"} value={code} required pattern="[0-9]{6}" maxLength={6}
          inputMode="numeric" autoComplete="one-time-code" dir="ltr" autoFocus
          onChange={(event) => setCode(normalizePhoneInput(event.target.value).replace(/[^0-9]/g, "").slice(0, 6))} />
      </label>
      {children}
      <button type="submit" disabled={busy || code.length !== 6} className="btn btn-primary w-full disabled:opacity-50">
        {busy ? <Loader2 className="h-5 w-5 animate-spin" aria-label="جاري التأكيد" /> : submitLabel}
      </button>
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <button type="button" disabled={busy || cooldown > 0} onClick={onResend} className="font-bold underline disabled:no-underline">
          {cooldown > 0 ? `ابعت كود جديد بعد ${cooldown} ثانية` : "ابعت كود جديد"}
        </button>
        <button type="button" disabled={busy} onClick={onBack} className="underline">تعديل الرقم</button>
      </div>
    </form>
  );
}
