# How to get web support for tokens

```javascript
new DynamicStyleSheet(({theme}) => ({
    mainStyle: {
        // `var(--colors__primary)` on web
        // `#0000FF` on native
        color: theme.colors.primary,
        // `var(--spacing_large)` on web
        // `2` on native
        paddingLeft: theme.spacing.large
    }
}))
```

- Idea 1:
