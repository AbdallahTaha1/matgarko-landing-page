// Common slips in the domain of a mailbox people type on a phone. A code sent to one of these
// never arrives, so the form offers the likely address before it is submitted.
const domainFixes: Record<string, string> = {
  'gmai.com': 'gmail.com', 'gmal.com': 'gmail.com', 'gmial.com': 'gmail.com', 'gamil.com': 'gmail.com',
  'gnail.com': 'gmail.com', 'gmail.co': 'gmail.com', 'gmail.con': 'gmail.com', 'gmail.cm': 'gmail.com',
  'hotmial.com': 'hotmail.com', 'hotmail.co': 'hotmail.com', 'yaho.com': 'yahoo.com', 'yahoo.co': 'yahoo.com',
  'outlok.com': 'outlook.com',
};
export function suggestEmail(email: string) {
  const at = email.lastIndexOf('@');
  if (at < 1) return undefined;
  const fixed = domainFixes[email.slice(at + 1).trim().toLowerCase()];
  return fixed ? email.slice(0, at + 1) + fixed : undefined;
}
