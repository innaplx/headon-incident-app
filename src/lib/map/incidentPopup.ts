import type { Incident } from '../../types/incident';
import { formatEnumLabel } from '../../utils/formatters';

export function buildIncidentPopupContent(incident: Incident): string {
  const type = formatEnumLabel(incident.type);
  const status = formatEnumLabel(incident.status);

  return `
    <div class="p-1 text-slate-800">
      <h3 class="font-bold text-xs mb-1">${escapeHtml(incident.title)}</h3>
      <p class="text-[11px] text-slate-600"><strong>Type:</strong> ${escapeHtml(type)}</p>
      <p class="text-[11px] text-slate-600"><strong>Status:</strong> ${escapeHtml(status)}</p>
    </div>
  `;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
