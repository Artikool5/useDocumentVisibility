# useDocumentVisibility hook

React hook for easy access to Page Visibility API.

> [!CAUTION]
> For learning purposes only!

 `useDocumentVisibility()` returns three values:
- `isVisible: boolean` - whether tab is visible in browser or not.
- `count: number` - how many times tab has been hidden.
- `onVisibilityChange: (listener: VisibilityListener) => () => void` - function to subscribe to the tab visibility changes.

## Usage examples

```tsx
function App() {
  const { isVisible, count, onVisibilityChange } = useDocumentVisibility();

  useEffect(() => {
    onVisibilityChange((isVisible) => {
      console.log("first handler", isVisible);
    });

    const unsubscribeSecondHandler = onVisibilityChange((isVisible) => {
      console.log("second handler", isVisible);
    });

    setTimeout(() => unsubscribeSecondHandler(), 5000);
  }, [onVisibilityChange]);

  return (
    <>
      <p>This tab is {isVisible ? "visible" : "not visible"}</p>
      <p>This tab was hidden {count} times</p>
    </>
  );
}
```
