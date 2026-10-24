// Nome da cor de papel nas classes do Tailwind: evita bg-bg-surface e text-text-primary.
export function utilityName(role) {
  const fixed = {
    'text-primary': 'fg', 'text-secondary': 'fg-muted', 'text-disabled': 'fg-disabled', 'text-on-dark': 'fg-inverse',
    'text-error': 'fg-error', 'text-heading-brand': 'fg-brand',
    'border-default': 'line', 'border-strong': 'line-strong', 'border-focus': 'line-focus',
  };
  if (fixed[role]) return fixed[role];
  if (role.startsWith('bg-')) return role.slice(3);
  return role;
}
