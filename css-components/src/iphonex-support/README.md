# Onsen UI CSS Components - Patch for iPhone X

## Notes

- `constant(safe-area-inset-*)` is broken on iPhone X UIWebView, and Chrome cannot recognize values like `calc(constant(safe-area-inset-*) + 44px)`. We should not use `constant(safe-area-inset-*)` until safe area is implemented in many devices.
