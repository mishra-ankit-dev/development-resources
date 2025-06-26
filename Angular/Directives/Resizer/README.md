# Angular ResizerDirective

A simple, reusable Angular directive for mouse-based horizontal resizing of elements.  
Powered by RxJS and Angular’s standalone APIs.

---

## ✨ Features

- Effortless drag-to-resize support for any container or sidebar
- Automatic cleanup — no memory leaks
- Fast and smooth, runs outside Angular’s zone
- Works with pure Angular signals

---

## 🚀 Usage

1. **Import and apply** `[resizer]` to any block element:
   - Example:  
     `<div resizer style="width: 300px;">Resizable content</div>`
2. **Add the directive** to your `imports` array (if using Standalone Components).

3. **Reference Implementation:**  
   See `resizer.directive.ts` in your codebase for the full, documented class.

---

## 🎨 UX Enhancement: Add a Resize Handle

For clearer usability, add a visible drag handle to your element (right edge recommended):

```html
<div resizer style="width: 300px; position: relative;">
  <div>Resizable content here</div>
  <div
    style="
      position: absolute; top: 0; right: 0; width: 6px; height: 100%;
      cursor: ew-resize; background: #eee;">
  </div>
</div>

	•	The directive remains on the outer <div>.
	•	The handle is just for better visual feedback.
```

---

## 🖌️ Recommended CSS

Apply these styles globally for a better look and smoother interaction:

```css
[resizer] {
  cursor: ew-resize;
  user-select: none;
  transition: box-shadow 0.1s;
}
[resizer]:active {
  box-shadow: 0 0 0 2px #d0d0d0;
}
```

---

## 💡 Tips
- Easily adapt for vertical resizing if needed (by changing to height logic).
-	For accessibility, add aria-label="resize" or similar.
-	Works out-of-the-box in Angular 16+ with Standalone Components.
