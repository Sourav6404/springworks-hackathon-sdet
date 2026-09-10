/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('UI Regression Tests (Tests 6-9)', () => {
  let html;
  let mockCatalog;

  beforeEach(() => {
    html = fs.readFileSync(path.join(__dirname, '../public/index.html'), 'utf8');
    document.documentElement.innerHTML = html;

    mockCatalog = [
      { id: 'IDENTITY', name: 'Identity Check', price: 299 },
      { id: 'EDUCATION', name: 'Education Check', price: 499 }
    ];

    global.fetch = jest.fn((url, options) => {
      if (url.includes('/api/checks-catalog')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockCatalog)
        });
      }
      if (url.includes('/api/quote')) {
        const body = options && options.body ? JSON.parse(options.body) : {};
        // If checkIds sent by frontend contains "check-IDENTITY" instead of "IDENTITY" (bug in app.js)
        if (!body.checkIds || body.checkIds.length === 0 || body.checkIds.includes('check-IDENTITY')) {
          return Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve({ subtotal: 0, discount: 0, gst: 0, total: 0 })
          });
        }
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ subtotal: 299, discount: 0, gst: 53.82, total: 352.82 })
        });
      }
      return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({}) });
    });

    jest.resetModules();
    require('../public/app');
  });

  // 6. Quote summary renders Subtotal, Discount, GST & Total
  test('6. Quote summary should render non-zero calculated Subtotal, Discount, GST & Total', async () => {
    await new Promise((r) => setTimeout(r, 50));

    const checkbox = document.getElementById('check-IDENTITY');
    expect(checkbox).not.toBeNull();
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change', { bubbles: true }));

    const btn = document.getElementById('quote-btn');
    btn.click();
    await new Promise((r) => setTimeout(r, 50));

    const subtotalText = document.getElementById('result-subtotal').textContent;
    expect(subtotalText).not.toBe('-');
    expect(subtotalText).not.toBe('0');
    expect(subtotalText).not.toBe('₹0.00');
  });

  // 7. Currency formatting (₹ with 2 decimals)
  test('7. Quote summary values should be formatted with ₹ symbol and 2 decimal places', async () => {
    await new Promise((r) => setTimeout(r, 50));

    const checkbox = document.getElementById('check-IDENTITY');
    if (checkbox) {
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change', { bubbles: true }));
    }

    const btn = document.getElementById('quote-btn');
    btn.click();
    await new Promise((r) => setTimeout(r, 50));

    const subtotalText = document.getElementById('result-subtotal').textContent;
    expect(subtotalText).toMatch(/^₹\d+\.\d{2}$/);
  });

  // 8. Success message appears only after complete render
  test('8. Success message should not appear on error or incomplete quote render', async () => {
    global.fetch = jest.fn((url) => {
      if (url.includes('/api/quote')) {
        return Promise.resolve({
          ok: false,
          status: 500,
          json: () => Promise.resolve({ error: 'Server error' })
        });
      }
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockCatalog)
      });
    });

    await new Promise((r) => setTimeout(r, 50));
    const btn = document.getElementById('quote-btn');
    btn.click();
    await new Promise((r) => setTimeout(r, 50));

    const messageText = document.getElementById('message').textContent;
    expect(messageText).not.toBe('Quote generated successfully!');
  });

  // 9. Checkbox deselection updates live subtotal
  test('9. Unchecking a check item should subtract its price from live subtotal', async () => {
    await new Promise((r) => setTimeout(r, 50));

    const checkbox = document.getElementById('check-IDENTITY');
    expect(checkbox).not.toBeNull();

    // Check item
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change', { bubbles: true }));
    expect(document.getElementById('live-subtotal').textContent).toContain('299');

    // Uncheck item
    checkbox.checked = false;
    checkbox.dispatchEvent(new Event('change', { bubbles: true }));
    expect(document.getElementById('live-subtotal').textContent).toBe('₹0.00');
  });

});
