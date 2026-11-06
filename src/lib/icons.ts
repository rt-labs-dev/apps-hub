export const icon = (svg: string, className: string) =>
  svg
    .replace(/\s(width|height)="24"/g, "")
    .replace('class="lucide', `class="${className} lucide`)
    .replace("<svg", '<svg aria-hidden="true"');
