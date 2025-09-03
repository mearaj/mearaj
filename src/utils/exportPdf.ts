import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/* -------- helpers: readiness -------- */

async function waitForFonts() {
  try {
    if (document.fonts?.ready) await document.fonts.ready;
  } catch {}
}

async function eagerLoadImages(root: HTMLElement) {
  const imgs = Array.from(root.querySelectorAll('img')) as HTMLImageElement[];

  await Promise.all(
    imgs.map(async (img) => {
      try {
        if (img.loading === 'lazy') img.loading = 'eager';
        const ds = (img as any).dataset?.src || (img as any).dataset?.lazySrc;
        if (ds && !img.src) img.src = ds;

        if (img.complete && img.naturalWidth > 0) return;

        if (typeof (img as any).decode === 'function') {
          await (img as any).decode().catch(() => {});
        } else {
          await new Promise<void>((resolve) => {
            const done = () => resolve();
            img.addEventListener('load', done, { once: true });
            img.addEventListener('error', done, { once: true });
          });
        }
      } catch {}
    })
  );
}

/** Light pre-scroll to trigger IO/lazy components, then return to top */
async function preScrollThrough(root: HTMLElement) {
  const scrollEl =
    root.scrollHeight > root.clientHeight && getComputedStyle(root).overflowY !== 'visible'
      ? root
      : document.scrollingElement || document.documentElement;

  const viewportH =
    scrollEl === root ? (root as HTMLElement).clientHeight : (window.innerHeight || document.documentElement.clientHeight);

  // Go top → ~2 viewports down → back to top (enough to trigger most observers)
  const jump = Math.max(400, Math.floor(viewportH * 1.8));
  const setY = (y: number) => {
    if (scrollEl === root) (scrollEl as HTMLElement).scrollTop = y;
    else window.scrollTo(0, y);
  };
  setY(0);
  await new Promise((r) => setTimeout(r, 60));
  setY(jump);
  await new Promise((r) => setTimeout(r, 60));
  setY(0);
  await new Promise((r) => setTimeout(r, 60));
}

/* -------- helpers: export-time overrides -------- */

function pushExportOverrides(target: HTMLElement) {
  const touched: Array<{ el: HTMLElement; prop: string; prev: string | null }> = [];

  const set = (el: HTMLElement, prop: string, val: string) => {
    const prev = el.style.getPropertyValue(prop) || null;
    el.style.setProperty(prop, val, 'important');
    touched.push({ el, prop, prev });
  };

  // Unlock overflow up the ancestor chain
  let cur: HTMLElement | null = target;
  while (cur) {
    set(cur, 'overflow', 'visible');
    cur = cur.parentElement;
  }

  // Neutralize sticky/fixed/transform elements that can repeat or clip
  document
    .querySelectorAll<HTMLElement>('.MuiAppBar-root,[data-sticky],[data-fixed],[data-parallax]')
    .forEach((el) => {
      set(el, 'position', 'static');
      set(el, 'transform', 'none');
    });

  return () => {
    for (const { el, prop, prev } of touched) {
      if (prev === null) el.style.removeProperty(prop);
      else el.style.setProperty(prop, prev);
    }
  };
}

/* -------- main: full-height slice capture (no scrolling during capture) -------- */
/**
 * Captures the **entire element height** in vertical slices and assembles a multi-page PDF.
 * - Does not rely on “visible viewport only” during capture.
 * - Ensures content below the fold (e.g., Links) is included.
 */
export async function exportElementToPdfPaged(
  element: HTMLElement,
  {
    filename = 'mearaj-portfolio.pdf',
    page = 'a4',
    marginMm = 6,
    scale = 2,
    background = '#ffffff',
    slicePx, // optional: override auto slice height in px
  }: {
    filename?: string;
    page?: 'a4' | 'letter';
    marginMm?: number;
    scale?: number;
    background?: string;
    slicePx?: number;
  } = {}
) {
  document.body.classList.add('pdf-exporting');
  const restore = pushExportOverrides(element);

  try {
    // 1) Make sure everything is actually rendered and images are loaded
    await waitForFonts();
    await eagerLoadImages(element);
    await preScrollThrough(element);

    // If you mark async sections with data-export-ready="true", wait briefly for them too
    const readyNode = element.querySelector('[data-export-ready="true"]');
    if (!readyNode) await new Promise((r) => setTimeout(r, 100));

    // 2) Measure the full render size of the element
    const totalWidthPx = element.scrollWidth;
    const totalHeightPx = element.scrollHeight;

    // 3) PDF geometry
    const pdf = new jsPDF('p', 'mm', page);
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const usableWidth = pageWidth - marginMm * 2;
    const usableHeight = pageHeight - marginMm * 2;

    // 4) Compute a slice height (px) that fits exactly one PDF page when scaled to usableWidth
    const autoSlicePx = Math.max(600, Math.floor((totalWidthPx * usableHeight) / usableWidth));
    const effectiveSlicePx = Math.min(slicePx ?? autoSlicePx, autoSlicePx);

    // 5) Walk down the element in fixed slices (no scrolling required for capture)
    let y = 0;
    let firstPage = true;

    while (y < totalHeightPx) {
      const h = Math.min(effectiveSlicePx, totalHeightPx - y);

      const canvas = await html2canvas(element, {
        backgroundColor: background,
        scale,
        useCORS: true,
        logging: false,
        windowWidth: totalWidthPx,
        windowHeight: totalHeightPx,
        x: 0,
        y,                 // <-- capture starts at this offset inside the element
        width: totalWidthPx,
        height: h,
        scrollX: 0,
        scrollY: 0
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWmm = usableWidth;
      const imgHmm = (canvas.height * imgWmm) / canvas.width;

      if (!firstPage) pdf.addPage();
      pdf.addImage(imgData, 'PNG', marginMm, marginMm, imgWmm, imgHmm, undefined, 'FAST');

      y += h;
      firstPage = false;
    }

    pdf.save(filename);
  } finally {
    restore();
    document.body.classList.remove('pdf-exporting');
  }
}

/* Optional: keep compatibility if something imports the "scrolling" name */
export { exportElementToPdfPaged as exportElementToPdfByScrolling };
